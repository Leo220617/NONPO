using GestionGastos20.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Refit;
using Sicsoft.Checkin.Web.Servicios;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GestionGastos20.Pages.Account
{
   
        public class CambioContrasenaModel : PageModel
        {
            private readonly ICrudApi<LoginUsuario, int> checkInService;

            [BindProperty]
            public LoginUsuario Input { get; set; }

            public CambioContrasenaModel(ICrudApi<LoginUsuario, int> checkInService)
            {
                this.checkInService = checkInService;
            }
            public void OnGet()
            {
            }

            public async Task<IActionResult> OnPostAsync()
            {
                try
                {
                    var ced = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.NameIdentifier).Select(s1 => s1.Value).FirstOrDefault();
                    Input.Email = User.Identity.Name;
                    Input.CedulaJuridica = ced;
                    Input.id = int.Parse(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault());
                    Input.idRol = 0;
                    Input.Nombre = "";
                    if (string.IsNullOrEmpty(Input.Clave))
                    {
                        throw new Exception("La clave debe contener elementos");
                    }
                    await checkInService.Editar(Input);
                    await HttpContext.SignOutAsync();
                    return Redirect("./Index");

                    //return Redirect("../Index");
                }
            catch (ApiException ex)
            {

                ModelState.AddModelError(string.Empty, ex.Content.ToString());
                //return Redirect("/Error");
                return Page();
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