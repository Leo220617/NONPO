using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using System.Security.Claims;
using System.Threading.Tasks;
using GestionGastos20.Models;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Refit;
using Sicsoft.Checkin.Web.Servicios;

namespace GestionGastos20.Pages.BitacoraLogin
{
    public class IndexModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<BitacoraLoginViewModel, int> service;
        private readonly ICrudApi<UsuariosViewModel, int> users;

        [BindProperty(SupportsGet = true)]
        public ParametrosFiltros filtro { get; set; }

        [BindProperty]
        public BitacoraLoginViewModel[] Objeto { get; set; }

        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }

        public IndexModel(ICrudApi<BitacoraLoginViewModel, int> service, ICrudApi<UsuariosViewModel, int> users)
        {
                this.service = service;
            this.users = users;
        }
        public async Task<IActionResult> OnGetAsync()
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "28").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }
                 

                DateTime time = new DateTime();

                if (time == filtro.FechaInicio)
                {
                    filtro.FechaFinal = DateTime.Now;
                    filtro.FechaInicio = filtro.FechaFinal.AddDays(-1);
                }

                Usuarios = await users.ObtenerLista("");

                Objeto = await service.ObtenerLista(filtro);


                return Page();
            }
            catch (ApiException ex)
            { 
                ModelState.AddModelError(string.Empty, ex.Content.ToString());

                return Page();
            }
        }
    }
}
