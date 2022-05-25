using System.Threading.Tasks;
using SaiGonHiker.Constants;
using Microsoft.AspNetCore.Identity;

namespace SaiGonHiker.DataAccessor.Data.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(RoleManager<IdentityRole<int>> roleManager)
        {
            await roleManager.CreateAsync(new IdentityRole<int>(Roles.Staff.ToString()));
            await roleManager.CreateAsync(new IdentityRole<int>(Roles.Admin.ToString()));
        }
    }
}