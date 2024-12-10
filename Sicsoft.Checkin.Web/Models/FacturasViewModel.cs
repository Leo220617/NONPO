using System;

namespace NONPO.Models
{
    public class FacturasViewModel
    {
        public int id { get; set; }
        public int idSolicitud { get; set; }
        public string CedulaProveedor { get; set; }
        public string NomProveedor { get; set; }
        public string NumFactura { get; set; }
        public DateTime Fecha { get; set; }
        public string Comentarios { get; set; }
        public string PDF { get; set; }

        public decimal Monto { get; set; }

        public string CardCode { get; set; }

        public bool ProcesadoSAP { get; set; }
    }
}
