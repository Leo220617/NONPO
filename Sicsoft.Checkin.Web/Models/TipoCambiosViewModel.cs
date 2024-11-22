using System;

namespace NONPO.Models
{
    public class TipoCambiosViewModel
    {
        public int id { get; set; }
        public decimal TipoCambio { get; set; }
        public DateTime Fecha { get; set; }
        public string Moneda { get; set; }
    }
}
