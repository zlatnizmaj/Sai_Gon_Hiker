using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SaiGonHiker.Business.Interfaces;
using SaiGonHiker.Contracts.Constants;
using SaiGonHiker.DataAccessor.Entities;

namespace SaiGonHiker.Business.Services
{
    public class TokenService : ITokenService
    {
        public string BuildToken(string key, string issuer, string audience, Users user, string roleName)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(UserClaims.Role, roleName),
                new Claim(UserClaims.UserCode, user.UserCode),
                new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(issuer, audience, claims,
                        expires: DateTime.Now.AddMinutes(JWTSettings.DurationInMinutes), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool IsValidateToken(string key, string issuser, string audience, string token)
        {
            var secret = Encoding.UTF8.GetBytes(key);
            var securityKey = new SymmetricSecurityKey(secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuser,
                    ValidAudience = issuser,
                    IssuerSigningKey = securityKey,
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}