using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaiGonHiker.DataAccessor.Entities;

namespace SaiGonHiker.DataAccessor.Data.Seeds
{
    public static class UserRolesDataInitializer
    {
        public static void SeedUserRolesData(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(
               new IdentityUserRole<int>{
                   UserId = 1,
                   RoleId = 1
               },
               new IdentityUserRole<int>{
                   UserId = 2,
                   RoleId = 2
               },
               new IdentityUserRole<int>{
                   UserId = 3,
                   RoleId = 2
               },
               new IdentityUserRole<int>{
                   UserId = 4,
                   RoleId = 2
               },
               new IdentityUserRole<int>{
                   UserId = 5,
                   RoleId = 2
               },
               new IdentityUserRole<int>{
                   UserId = 6,
                   RoleId = 2
               }
            );
        }
    }
}