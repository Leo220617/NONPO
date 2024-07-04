using System;

namespace NONPO.Models
{
    public class SolicitudesViewModel
    {
        public int id { get; set; }
        public int idUsuarioCreador { get; set; }
        public int idTipoGasto { get; set; }

        public int idRango { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime FechaAceptacion { get; set; }
        public decimal Monto { get; set; }
        public string Status { get; set; }
        public string Moneda { get; set; }
        public int BaseEntry { get; set; }
        public string Comentarios { get; set; }

        public int idUsuarioAprobador { get; set; }
        public FacturasViewModel[] Facturas { get; set; }
    }
}
    