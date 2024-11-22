using GestionGastos20.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using NONPO.Models;
using Refit;
using Sicsoft.Checkin.Web.Servicios;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Linq;
using Newtonsoft.Json;

namespace NONPO.Pages.RegistroProveedores
{
    public class NuevoModel : PageModel
    {
        private readonly ICrudApi<RegistroProveedoresViewModel, int> service;

        [BindProperty]
        public RegistroProveedoresViewModel Objeto { get; set; }
        public NuevoModel(ICrudApi<RegistroProveedoresViewModel, int> service)
        {
            this.service = service;

        }
        public async Task<IActionResult> OnGetAsync(string id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "12").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }

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
                await service.Agregar(Objeto);
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
