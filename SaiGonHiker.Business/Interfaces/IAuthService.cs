using System.Threading.Tasks;
using SaiGonHiker.Contracts.Dtos.Auth;
// using SaiGonHiker.Contracts.Dtos.User;
using SaiGonHiker.DataAccessor.Entities;

namespace SaiGonHiker.Business.Interfaces
{
    public interface IAuthService
    {
       public AuthDto AuthLogin(AuthLoginRequest authLoginRequest);
    //    public void AuthChangePassword(AuthUpdateRequest authUpdateRequest, string userName);
    //    public UsersDto GetAccount(string userName);
    }
}