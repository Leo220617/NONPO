using System;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using GestionGastos20.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Refit;

using Sicsoft.Checkin.Web.Servicios;


namespace GestionGastos20.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly ICrudApi<LoginDevolucion, int> checkInService;
        private readonly ICrudApi<Compañias, int> serviceCompañia;

        [BindProperty]
        public LoginViewModel Input { get; set; }

        [BindProperty]
        public Compañias[] Compañias { get; set; }
        public LoginModel(ICrudApi<LoginDevolucion, int> checkInService, ICrudApi<Compañias, int> serviceCompañia)
        {
            this.checkInService = checkInService;
            this.serviceCompañia = serviceCompañia;
        }
        public void OnGet()
        {

        }
        public async Task<IActionResult> OnGetBuscar(string email)
        {
            try
            {



                var objeto = await serviceCompañia.ObtenerCompañias(email);



                return new JsonResult(objeto);
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());


                return new JsonResult(error);
            }
            catch (Exception ex)
            {
                


                return new JsonResult(ex.Message);
            }
        }
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                await HttpContext.SignOutAsync();
                return Page();
            }
            ActionResult response = Page();
            try
            {
                var resultado = await checkInService.Login(Input.Email, Input.Password, Input.CedulaJuridica);
                string str = "";

                foreach (var item in resultado.Seguridad)
                {
                    str += item.CodModulo + "|";
                }


                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim(ClaimTypes.Name, resultado.Email));
                identity.AddClaim(new Claim(ClaimTypes.UserData, resultado.token));
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, resultado.CedulaJuridica));
                identity.AddClaim(new Claim(ClaimTypes.Actor, resultado.idLogin.ToString()));
                identity.AddClaim(new Claim(ClaimTypes.Role, resultado.idRol.ToString()));
                identity.AddClaim(new Claim("Roles", str));
                identity.AddClaim(new Claim("Logo", resultado.UrlLogo));
                identity.AddClaim(new Claim("CambiarClave", resultado.CambiarClave.ToString()));
                identity.AddClaim(new Claim("Pais", resultado.Pais.ToString()));
                var principal = new ClaimsPrincipal(identity);
                var authProperties = new AuthenticationProperties
                {
                    AllowRefresh = true,
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(120),
                    IsPersistent = true,
                    RedirectUri = "/Account/Logout"
                };
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties);

                if (resultado.CambiarClave)
                {
                    return RedirectToPage("/Account/CambioContrasena");
                }

                return RedirectToPage("/Index");

            }
            catch (ValidationApiException)
            {
                // handle validation here by using validationException.Content,
                // which is type of ProblemDetails according to RFC 7807

                // If the response contains additional properties on the problem details,
                // they will be added to the validationException.Content.Extensions collection.
            }
            catch (ApiException exception)
            {
                if (exception.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    Errores error = JsonConvert.DeserializeObject<Errores>(exception.Content.ToString());
                    ModelState.AddModelError("Email", error.Message);
                    return Page();
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Email", ex.Message);
                return Page();
            }

            return response;


        }
    }
}