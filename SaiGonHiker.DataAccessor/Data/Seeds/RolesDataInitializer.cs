using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaiGonHiker.DataAccessor.Entities;

namespace SaiGonHiker.DataAccessor.Data.Seeds
{
    public static class RolesDataInitializer
    {
        public static void SeedRolesData(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int>{
                    Id = 1,
                    Name = "Admin",
                    NormalizedName = Roles.Admin.ToString()
                },
                new IdentityRole<int>{
                    Id = 2,
                    Name = "User",
                    NormalizedName = Roles.User.ToString()
                }
            );
        }
    }
}