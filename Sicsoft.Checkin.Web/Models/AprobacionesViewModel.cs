using System;

namespace NONPO.Models
{
    public class AprobacionesViewModel
    {
        public int id { get; set; }
        public int idLogin { get; set; }
        public int idSolicitud { get; set; }
        public DateTime FechaAprobacion { get; set; }
    }
}
