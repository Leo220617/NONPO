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

namespace NONPO.Pages.Reportes
{
    public class IndexModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<SolicitudesViewModel, int> service;
        private readonly ICrudApi<UsuariosViewModel, int> usuarios;
        private readonly ICrudApi<GastosViewModel, int> gastos;
        private readonly ICrudApi<RangosViewModel, int> rangos;

        [BindProperty(SupportsGet = true)]
        public ParametrosFiltros filtro { get; set; }

        [BindProperty]
        public SolicitudesViewModel[] Objeto { get; set; }

        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }


        [BindProperty]
        public RangosViewModel[] Rangos { get; set; }


        [BindProperty]
        public GastosViewModel[] Gastos { get; set; }

        public IndexModel(ICrudApi<SolicitudesViewModel, int> service, ICrudApi<GastosViewModel, int> gastos, ICrudApi<UsuariosViewModel, int> usuarios, ICrudApi<RangosViewModel, int> rangos)
        {
            this.service = service;
            this.gastos = gastos;
            this.usuarios = usuarios;
            this.rangos = rangos;
        }

        public async Task<IActionResult> OnGetAsync()
        {
            try
            {
                // filtro.Codigo1 = int.Parse(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault());

                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "35").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }
                Gastos = await gastos.ObtenerLista("");

                Rangos = await rangos.ObtenerLista("");
                Usuarios = await usuarios.ObtenerLista("");

                DateTime time = new DateTime();
                if (time == filtro.FechaInicio)
                {


                    filtro.FechaInicio = DateTime.Now;

                    //filtro.FechaInicio = new DateTime(filtro.FechaInicio.Year, filtro.FechaInicio.Month, 1);


                    DateTime primerDia = new DateTime(filtro.FechaInicio.Year, filtro.FechaInicio.Month, 1);
                    filtro.FechaInicio = primerDia.AddMonths(-2);

                    DateTime ultimoDia = primerDia.AddMonths(1).AddDays(-1);

                    filtro.FechaFinal = ultimoDia;

                    filtro.aprobado = true;

                }
          
                Objeto = await service.ObtenerLista(filtro);


                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnGetEliminar(string id)
        {
            try
            {
                var ids = Convert.ToInt32(id);
                await service.Eliminar(ids);

                return new JsonResult(true);
            }
            catch (ApiException ex)
            {
                return new JsonResult(false);
            }
        }
    }
}
