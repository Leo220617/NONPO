using System.Collections.Generic;

namespace NONPO.Models
{
    public class RangosViewModel
    {
        public int id { get; set; }
        public int idTipoGasto { get; set; }
        public int idUsuarioCreador { get; set; }
        public string Nombre { get; set; }
        public decimal MontoMinimo { get; set; }
        public decimal MontoMaximo { get; set; }
        public int CantidadAprobaciones { get; set; }
        public bool Activo { get; set; }

        public decimal Margen { get; set; }

        public List<LogsRangosViewModel> LogsRangos { get; set; }
    }
}
