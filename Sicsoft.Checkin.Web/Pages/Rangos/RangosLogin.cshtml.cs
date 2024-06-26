using GestionGastos20.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using NONPO.Models;
using Refit;
using Sicsoft.Checkin.Web.Servicios;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NONPO.Pages.Rangos
{
    public class RangosLoginModel : PageModel
    {
        private readonly ICrudApi<RangosViewModel, int> rangos;
        private readonly ICrudApi<UsuariosViewModel, int> usuarios;
        private readonly ICrudApi<RangosLoginViewModel, int> rangosLogin;
        private readonly ICrudApi<RolesViewModel, int> roles;


        [BindProperty]
        public RangosViewModel Rangos { get; set; }

        [BindProperty]
        public RangosLoginViewModel[] RangosLoginMios { get; set; }

        [BindProperty]
        public RangosLoginViewModel[] RangosLogin { get; set; }

        [BindProperty]
        public UsuariosViewModel[] UsuariosMiosS { get; set; }

        [BindProperty]
        public UsuariosViewModel[] UsuariosS { get; set; }

        [BindProperty(SupportsGet = true)]
        public ParametrosFiltros filtro { get; set; }

        public RangosLoginModel(ICrudApi<UsuariosViewModel, int> usuarios, ICrudApi<RangosViewModel, int> rangos, ICrudApi<RangosLoginViewModel, int> rangosLogin, ICrudApi<RolesViewModel, int> roles)
        {
            this.usuarios = usuarios;
            this.rangos = rangos;
            this.rangosLogin = rangosLogin;
            this.roles = roles;
        }
        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {
                var Roles1 = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles1.Where(a => a == "1").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }

                Rangos = await rangos.ObtenerPorId(id);


                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnGetRangos(int id)
        {
            try
            {
                var Roles = await roles.ObtenerLista("");

                var Rol = Roles.Where(a => a.NombreRol.ToLower().Contains("Admin".ToLower())).FirstOrDefault();
                filtro.Codigo2 = Convert.ToInt32(Rol.idRol);
                //filtro.novapos = true;
                var UsuariosGenerales = await usuarios.ObtenerLista(filtro); //Carga todos los usuarios cajeros que existan
                //UsuariosGenerales = UsuariosGenerales.Where(a => a.Activo == true).ToArray();

                filtro.Codigo1 = id;
                RangosLoginMios = await rangosLogin.ObtenerLista(filtro); //Llamada a la tabla de seguridadRolesModulos que contenga el idRol

                UsuariosMiosS = new UsuariosViewModel[RangosLoginMios.Length]; //hace un vector del tamaño de la cantidad de seguridadrolesmodulos que existen 

                for (int j = 0; j < UsuariosMiosS.Length; j++)
                {
                    UsuariosMiosS[j] = new UsuariosViewModel();
                }



                var i = 0;
                foreach (var item in RangosLoginMios.Where(a => a.idLogin != 0))
                {
                    var Usuario = UsuariosGenerales.Where(a => a.id == item.idLogin).FirstOrDefault(); //Busco el modulo en los mios
                    UsuariosMiosS[i].id = Usuario.id;
                    UsuariosMiosS[i].Nombre = Usuario.Nombre;

                    i++;

                }


                foreach (var item in UsuariosMiosS.Where(a => a.id != 0))
                {
                    UsuariosGenerales = UsuariosGenerales.Where(a => a.id != item.id).ToArray();
                }



                var resp = new
                {
                    UsuariosMiosS,
                    UsuariosGenerales
                };



                return new JsonResult(resp);
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return new JsonResult(error);
            }
        }

        public async Task<IActionResult> OnPostGenerar(string recibidos)
        {
            try
            {
                recibidos = recibidos.Replace("_", " ");
                RecibidoUsuarios recibido = JsonConvert.DeserializeObject<RecibidoUsuarios>(recibidos);
           
                RangosLoginViewModel[] rangosLoginX = new RangosLoginViewModel[recibido.ProdCadenaM.Length];


                short cantidad = 0;
                if (rangosLoginX.Length > 0)
                {

                    foreach (var item in recibido.ProdCadenaM)
                    {

                        rangosLoginX[cantidad] = new RangosLoginViewModel();
                        rangosLoginX[cantidad].idRango = recibido.idRango;
                        rangosLoginX[cantidad].idLogin = item.id;

                        cantidad++;
                    }
                }
                else
                {
                    rangosLoginX = new RangosLoginViewModel[1];
                    rangosLoginX[0] = new RangosLoginViewModel();
                    rangosLoginX[0].idRango = recibido.idRango;
                    rangosLoginX[0].idLogin = 0;
                }

                await rangosLogin.AgregarBulk(rangosLoginX);
                return new JsonResult(true);
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return new JsonResult(false);
            }
            catch (Exception ex)
            {

                ModelState.AddModelError(string.Empty, ex.Message);

                return new JsonResult(false);
            }
        }
    }
}
