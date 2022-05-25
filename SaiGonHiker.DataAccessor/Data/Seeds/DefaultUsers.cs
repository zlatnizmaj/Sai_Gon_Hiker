using System;
using System.Threading.Tasks;
using SaiGonHiker.Constants;
using Microsoft.AspNetCore.Identity;
using SaiGonHiker.DataAccessor.Entities;
using System.Linq;

namespace SaiGonHiker.DataAccessor.Data.Seeds
{
    public static class DefaultUsers
    {
        public static async Task SeedAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var adminHCM = new User
                {
                    UserName = "adminhcm"
                };

                await userManager.CreateAsync(adminHCM, "123456");
            }

        }
    }
}