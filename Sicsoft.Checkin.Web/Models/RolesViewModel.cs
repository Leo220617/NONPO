using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class RolesViewModel
{
    public int idRol { get; set; }

    [StringLength(50)]
    public string NombreRol { get; set; }
}
}
