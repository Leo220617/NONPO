using System;
using System.Collections.Generic;

namespace GestionGastos20.Models
{
    public class LoginDevolucion
{
    public int idLogin { get; set; }
    public string NombreUsuario { get; set; }
    public string CedulaJuridica { get; set; }
    public string Email { get; set; }
    public int idRol { get; set; }
    public DateTime FechaVencimiento { get; set; }
    public string token { get; set; }
    public string UrlLogo { get; set; }
    public bool CambiarClave { get; set; }
    public string Pais { get; set; }
    public List<SeguridadRolesModulos> Seguridad { get; set; }
}
}
