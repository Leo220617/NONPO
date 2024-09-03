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
    public class EditarModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<RangosViewModel, int> service;
        private readonly ICrudApi<GastosViewModel, int> gastos;


        [BindProperty]
        public RangosViewModel Objeto { get; set; }

        [BindProperty]
        public GastosViewModel[] Gastos { get; set; }


        public EditarModel(ICrudApi<RangosViewModel, int> service, ICrudApi<GastosViewModel, int> gastos)
        {
            this.service = service;
            this.gastos = gastos;

        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "9").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }
            
             
                Gastos = await gastos.ObtenerLista("");
                Objeto = await service.ObtenerPorId(id);

                return Page();
            }
            catch (ApiException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                return Page();
            }
        }
        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                Objeto.idUsuarioCreador = int.Parse(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault());
                await service.Editar(Objeto);
                return RedirectToPage("./Index");
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
    }
}
