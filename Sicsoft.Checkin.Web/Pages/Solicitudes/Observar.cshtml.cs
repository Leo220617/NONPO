using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GestionGastos20.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using NONPO.Models;
using Refit;
using Sicsoft.Checkin.Web.Servicios;

namespace NONPO.Pages.Solicitudes
{
    public class ObservarModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<SolicitudesViewModel, int> service;
        private readonly ICrudApi<UsuariosViewModel, int> usuarios;
        private readonly ICrudApi<GastosViewModel, int> gastos;
        private readonly ICrudApi<RangosViewModel, int> rangos;
        private readonly ICrudApi<RangosLoginViewModel, int> rangosLogin;
        private readonly ICrudApi<AprobacionesViewModel, int> aprobaciones;

        [BindProperty(SupportsGet = true)]
        public ParametrosFiltros filtro { get; set; }
        [BindProperty]
        public SolicitudesViewModel Objeto { get; set; }
        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }

        [BindProperty]
        public GastosViewModel[] Gastos { get; set; }


        [BindProperty]
        public RangosViewModel[] Rangos { get; set; }

        [BindProperty]
        public RangosLoginViewModel[] RangosLogin { get; set; }

        [BindProperty]
        public AprobacionesViewModel[] Aprobaciones { get; set; }
        public ObservarModel(ICrudApi<SolicitudesViewModel, int> service, ICrudApi<UsuariosViewModel, int> usuarios, ICrudApi<GastosViewModel, int> gastos, ICrudApi<RangosViewModel, int> rangos, ICrudApi<RangosLoginViewModel, int> rangosLogin, ICrudApi<AprobacionesViewModel, int> aprobaciones)
        {
            this.service = service;
            this.usuarios = usuarios;
            this.gastos = gastos;
            this.rangos = rangos;
            this.rangosLogin = rangosLogin;
            this.aprobaciones = aprobaciones;
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "4").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }

                Objeto = await service.ObtenerPorId(id);
                Usuarios = await usuarios.ObtenerLista("");
                Gastos = await gastos.ObtenerLista("");
                Rangos = await rangos.ObtenerLista("");
                filtro.Codigo1 = Objeto.idRango;
                RangosLogin = await rangosLogin.ObtenerLista(filtro);
                var filtroApro = new ParametrosFiltros();
                filtroApro.Codigo1 = Convert.ToInt32(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault().ToString());
                filtroApro.Codigo2 = id;
                Aprobaciones = await aprobaciones.ObtenerLista(filtroApro);

                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnPostAprobar(SolicitudesViewModel enviados)
        {
            try
            {
                enviados.idUsuarioAprobador = Convert.ToInt32(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault().ToString());
                enviados.Status = "A";
                await service.Editar(enviados);
                var obj = new
                {
                    success = true,
                    mensaje = ""
                };


                return new JsonResult(obj);
            }
            catch (ApiException ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Content.ToString()
                };
                return new JsonResult(obj);
            }
            catch(Exception ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Message
                };
                return new JsonResult(obj);
            }
        }
        public async Task<IActionResult> OnPostRechazar(SolicitudesViewModel enviados)
        {
            try
            {
                enviados.Status = "R";
                enviados.idUsuarioAprobador = Convert.ToInt32(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault().ToString());
               
                await service.Editar(enviados);
                var obj = new
                {
                    success = true,
                    mensaje = ""
                };


                return new JsonResult(obj);
            }
            catch (ApiException ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Content.ToString()
                };
                return new JsonResult(obj);
            }
            catch (Exception ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Message
                };
                return new JsonResult(obj);
            }
        }


    }
}

