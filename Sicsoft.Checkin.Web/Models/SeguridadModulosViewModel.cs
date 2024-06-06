using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class SeguridadModulosViewModel
{
    public int CodModulo { get; set; }

    [Required]
    [StringLength(150)]
    public string Descripcion { get; set; }
}
}
