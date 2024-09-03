using System;

namespace NONPO.Models
{
    public class LogsViewModel
    {
        public int id { get; set; }
        public int idSolicitud { get; set; }
        public DateTime Fecha { get; set; }
        public string Detalle { get; set; }
    }
}
