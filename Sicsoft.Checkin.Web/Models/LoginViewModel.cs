using System.ComponentModel.DataAnnotations;
namespace GestionGastos20.Models
{
    public class LoginViewModel
{
    [Required]
    [Display(Name = "User name")]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

    public string CedulaJuridica { get; set; }
}
}
