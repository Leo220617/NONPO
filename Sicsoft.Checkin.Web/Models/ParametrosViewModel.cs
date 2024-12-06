using System;

namespace NONPO.Models
{
    public class ParametrosViewModel
    {
        public int id { get; set; }

        public string RecepcionEmail { get; set; }


        public string RecepcionPassword { get; set; }

        public string RecepcionHostName { get; set; }

        public bool? RecepcionUseSSL { get; set; }

        public int RecepcionPort { get; set; }

        public DateTime? RecepcionUltimaLecturaImap { get; set; }
        public string UrlSitioPublicado { get; set; }
        public int EnvioPort { get; set; }
        public string UrlImagenesApp { get; set; }
        public string UrlLogo { get; set; }
        public string CI1 { get; set; }
        public string CI2 { get; set; }
        public string CI4 { get; set; }
        public string CI8 { get; set; }
        public string CI13 { get; set; }
        public string IMPEX { get; set; }

        public int DiasVencimiento { get; set; }

        public string SQLTipoCambio { get; set; }
        public string SQLProveedores { get; set; }
        public string CorreoProveedores { get; set; }
    }
}
