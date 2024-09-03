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

namespace NONPO.Pages.Rangos
{
    public class ObservarModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<RangosViewModel, int> service;
        private readonly ICrudApi<GastosViewModel, int> gastos;
        private readonly ICrudApi<RangosLoginViewModel, int> rangosLogin;
        private readonly ICrudApi<UsuariosViewModel, int> usuarios;

        [BindProperty(SupportsGet = true)]
        public ParametrosFiltros filtro { get; set; }

        [BindProperty]
        public RangosViewModel Objeto { get; set; }

        [BindProperty]
        public GastosViewModel[] Gastos { get; set; }

        [BindProperty]
        public RangosLoginViewModel[] RangosLogin { get; set; }

        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }
        public ObservarModel(ICrudApi<RangosViewModel, int> service, ICrudApi<GastosViewModel, int> gastos, ICrudApi<RangosLoginViewModel, int> rangosLogin, ICrudApi<UsuariosViewModel, int> usuarios)
        {
            this.service = service;
            this.gastos = gastos;
            this.rangosLogin = rangosLogin;
            this.usuarios = usuarios;
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "34").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }


                Gastos = await gastos.ObtenerLista("");
                filtro.Codigo1 = id;
                RangosLogin = await rangosLogin.ObtenerLista(filtro);
                Usuarios = await usuarios.ObtenerLista("");
                Objeto = await service.ObtenerPorId(id);

                return Page();
            }
            catch (ApiException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                return Page();
            }
        }

    }
}
