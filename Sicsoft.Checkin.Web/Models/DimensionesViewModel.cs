using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class DimensionesViewModel
{
    public int id { get; set; }
    [StringLength(50)]
    public string codigoSAP { get; set; }
    [StringLength(100)]
    public string Nombre { get; set; }
}
}
