using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class GastosViewModel
{
    [Key]
    public int idTipoGasto { get; set; }

    public int idCuentaContable { get; set; }

    [StringLength(50)]
    public string Nombre { get; set; }

    public string PalabrasClave { get; set; }
}
}
