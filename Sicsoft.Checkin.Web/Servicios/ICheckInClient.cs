using GestionGastos20.Models;
using Refit;

using System.Threading.Tasks;

namespace Sicsoft.Checkin.Web.Servicios
{
    public interface ICheckInClient
    {
        [Post("/Token")]
        Task<TokenResponseViewModel> GetToken([Body(BodySerializationMethod.UrlEncoded)] TokenRequestViewModel q);
    }
}
