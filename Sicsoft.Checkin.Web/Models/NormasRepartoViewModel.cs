using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class NormasRepartoViewModel
{
    public int id { get; set; }

    public int idLogin { get; set; }

    [StringLength(4)]
    public string CodSAP { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; }

    public int idDimension { get; set; }
}
}
