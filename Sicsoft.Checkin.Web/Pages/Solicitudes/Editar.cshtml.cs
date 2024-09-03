using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using NONPO.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Refit;
using Sicsoft.Checkin.Web.Servicios;
using GestionGastos20.Models;

namespace NONPO.Pages.Solicitudes
{
    public class EditarModel : PageModel
    {
        private readonly IConfiguration configuration;
        private readonly ICrudApi<SolicitudesViewModel, int> service;
        private readonly ICrudApi<UsuariosViewModel, int> usuarios;
        private readonly ICrudApi<GastosViewModel, int> gastos;

        [BindProperty]
        public SolicitudesViewModel Objeto { get; set; }
        [BindProperty]
        public UsuariosViewModel[] Usuarios { get; set; }

        [BindProperty]
        public GastosViewModel[] Gastos { get; set; }
        public EditarModel(ICrudApi<SolicitudesViewModel, int> service, ICrudApi<UsuariosViewModel, int> usuarios, ICrudApi<GastosViewModel, int> gastos)
        {
            this.service = service;
            this.usuarios = usuarios;
            this.gastos = gastos;
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {

                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "5").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }
                Objeto = await service.ObtenerPorId(id);
                Usuarios = await usuarios.ObtenerLista("");
                Gastos = await gastos.ObtenerLista("");

                return Page();
            }
            catch (ApiException ex)
            {
                Errores error = JsonConvert.DeserializeObject<Errores>(ex.Content.ToString());
                ModelState.AddModelError(string.Empty, error.Message);

                return Page();
            }
        }
        public async Task<IActionResult> OnPostAgregarSolicitud(SolicitudesViewModel recibidos)
        {
            try
            {
                recibidos.idUsuarioCreador = Convert.ToInt32(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault().ToString());
                recibidos.Status = "G";
                await service.Editar(recibidos);
                var obj = new
                {
                    success = true,
                    mensaje = ""
                };


                return new JsonResult(obj);
            }
            catch (ApiException ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Content.ToString()
                };
                return new JsonResult(obj);
            }
            catch (Exception ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Message
                };
                return new JsonResult(obj);
            }
        }

        public async Task<IActionResult> OnPostAgregarSolicitudP(SolicitudesViewModel recibidos)
        {
            try
            {
                recibidos.idUsuarioCreador = Convert.ToInt32(((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == ClaimTypes.Actor).Select(s1 => s1.Value).FirstOrDefault().ToString());
                recibidos.Status = "P";
                await service.Editar(recibidos);
                var obj = new
                {
                    success = true,
                    mensaje = ""
                };


                return new JsonResult(obj);
            }
            catch (ApiException ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Content.ToString()
                };
                return new JsonResult(obj);
            }
            catch (Exception ex)
            {
                var obj = new
                {
                    success = false,
                    mensaje = ex.Message
                };
                return new JsonResult(obj);
            }
        }
    }
}
