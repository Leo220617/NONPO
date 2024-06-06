using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class CuentasContablesViewModel
{
    [Key]
    public int idCuentaContable { get; set; }


    [StringLength(50)]
    public string CodSAP { get; set; }

    [StringLength(50)]
    public string Nombre { get; set; }
}
}
