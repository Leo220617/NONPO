namespace GestionGastos20.Models
{
    public class TokenRequestViewModel
{
    public string grant_type { get; set; } = "password";
    public string userName { get; set; }
    public string password { get; set; }
}
}
