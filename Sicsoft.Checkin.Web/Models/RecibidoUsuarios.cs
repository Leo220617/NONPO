namespace NONPO.Models
{
    public class RecibidoUsuarios
    {
        public int idRango { get; set; }

        public ProdCadena[] ProdCadenaM { get; set; }
    }
    public class ProdCadena
    {
        public int id { get; set; }
        public string nombre { get; set; }
    }
}
