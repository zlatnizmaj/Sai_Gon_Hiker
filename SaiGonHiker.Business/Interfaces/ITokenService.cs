using SaiGonHiker.DataAccessor.Entities;

namespace SaiGonHiker.Business.Interfaces
{
    public interface ITokenService
    {
        public string BuildToken(string key, string issuer, string audience, Users user, string roleName);
        public bool IsValidateToken(string key, string issuser, string audience, string token);
    }
}