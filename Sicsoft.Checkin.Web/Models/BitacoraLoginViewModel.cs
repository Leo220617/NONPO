using System;

namespace GestionGastos20.Models
{
    public class BitacoraLoginViewModel
    {
        public int id { get; set; }
        public int idUsuario { get; set; }
        public string IP { get; set; }
        public DateTime Fecha { get; set; }
        public string Detalle { get; set; }
    }
}
