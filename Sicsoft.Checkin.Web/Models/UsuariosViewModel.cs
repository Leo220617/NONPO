using System.ComponentModel.DataAnnotations;

namespace GestionGastos20.Models
{
    public class UsuariosViewModel
    {
        public int id { get; set; }

        public int? idRol { get; set; }

        public int idRango { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        public string CedulaJuridica { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }

        public bool? Activo { get; set; }

        [StringLength(500)]
        public string Clave { get; set; }
        public int idLoginAceptacion { get; set; }
        public string CardCode { get; set; }
    }
}
