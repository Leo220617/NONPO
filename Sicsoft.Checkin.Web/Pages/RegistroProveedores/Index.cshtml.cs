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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NONPO.Pages.RegistroProveedores
{
    public class IndexModel : PageModel
    {
    private readonly ICrudApi<RegistroProveedoresViewModel, int> service;
    private readonly ICrudApi<ParametrosViewModel, int> param;

        [BindProperty]
        public RegistroProveedoresViewModel[] Objeto { get; set; }


        [BindProperty]
        public ParametrosViewModel[] Parametro { get; set; }

        public IndexModel(ICrudApi<RegistroProveedoresViewModel, int> service, ICrudApi<ParametrosViewModel, int> param)
        {
            this.service = service;
            this.param  = param;
        }
        public async Task<IActionResult> OnGetAsync()
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "36").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }

                Objeto = await service.ObtenerLista("");
                Parametro = await param.ObtenerLista("");


                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnGetReenviar(string code, string correos)
        {
            try
            {

                await service.Reenvio(code, correos);
                return new JsonResult(true);
            }
            catch (Exception ex)
            {
                return new JsonResult(false);
            }
        }
    }
}
