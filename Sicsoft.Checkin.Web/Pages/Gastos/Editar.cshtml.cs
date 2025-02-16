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
using Refit;
using Sicsoft.Checkin.Web.Servicios;

namespace GestionGastos20.Pages.Gastos
{
    public class EditarModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<GastosViewModel, int> service;
        private readonly ICrudApi<CuentasContablesViewModel, int> cuentas;
        [BindProperty]
        public GastosViewModel Objeto { get; set; }
        [BindProperty]
        public CuentasContablesViewModel[] Cuentas { get; set; }
        public EditarModel(ICrudApi<GastosViewModel, int> service, ICrudApi<CuentasContablesViewModel, int> cuentas)
        {
            this.service = service;
            this.cuentas = cuentas;
        }

        public async Task<IActionResult> OnGetAsync(string id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "17").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }
                var ids = Convert.ToInt32(id);
                Objeto = await service.ObtenerPorId(ids);
                Cuentas = await cuentas.ObtenerLista("");

                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnPostAsync()
        {
            try
            {

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

