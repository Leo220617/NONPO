using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GestionGastos20.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using NONPO.Models;
using Refit;
using Sicsoft.Checkin.Web.Servicios;


namespace GestionGastos20.Pages.Usuarios
{
    public class NuevoModel : PageModel
    {
        private readonly ICrudApi<LoginUsuario, int> service;
        private readonly ICrudApi<UsuariosViewModel, int> users;
        private readonly ICrudApi<RolesViewModel, int> roles;
      

        [BindProperty]
        public LoginUsuario Input { get; set; }

        [BindProperty]
        public RolesViewModel[] Roles { get; set; }

        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }

     
        public NuevoModel(ICrudApi<LoginUsuario, int> service, ICrudApi<RolesViewModel, int> roles, ICrudApi<UsuariosViewModel, int> users)
        {
            this.service = service;
            this.roles = roles;
            this.users = users;
        }
        public async Task<IActionResult> OnGetAsync()
        {
            try
            {
                Roles = await roles.ObtenerLista("");
                Usuarios = await users.ObtenerLista("");
                //var Rol = Roles.Where(a => a.NombreRol.ToUpper().Contains("Aprobador".ToUpper())).FirstOrDefault();
                //var RolA = Roles.Where(a => a.NombreRol.ToUpper().Contains("Administrador".ToUpper())).FirstOrDefault();
                //var RolCA = Roles.Where(a => a.NombreRol.ToUpper().Contains("Contador Aprobador".ToUpper())).FirstOrDefault();
                //Usuarios = Usuarios.Where(a => a.idRol == Rol.idRol || a.idRol == RolA.idRol || a.idRol == RolCA.idRol).ToArray();
            }
            catch (Exception)
            {


            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                Input.CedulaJuridica = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.NameIdentifier).Select(s1 => s1.Value).FirstOrDefault();
                if (string.IsNullOrEmpty(Input.Clave))
                {
                    throw new Exception("La clave debe contener elementos");
                }

               
                await service.Agregar(Input);
                return RedirectToPage("./Index");

            }
            catch (Exception ex)
            {

                ModelState.AddModelError(string.Empty, ex.Message);
                //return Redirect("/Error");
                return Page();
            }
        }
    }
}
