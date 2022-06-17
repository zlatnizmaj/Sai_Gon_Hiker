using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaiGonHiker.DataAccessor.Entities;
using System;

namespace SaiGonHiker.DataAccessor.Data.Seeds
{
    public static class UserDataInitializer
    {
        public static void SeedUserData(this ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<Users>();
            modelBuilder.Entity<Users>().HasData(
                new Users { 
                    Id = 1,
                    UserCode = "U0001",
                    FullName = "Quan Tran",
                    Gender = "Male",
                    Address = "Binh Chanh District, HCM City",
                    UserName = "quant",
                    Email = "minhquan2122000@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "quan123"),
                    PhoneNumber = "0924721184"
                },
                new Users { 
                    Id = 2,
                    UserCode = "U0002",
                    FullName = "Khanh Tran",
                    Gender = "Female",
                    Address = "District 9, HCM City",
                    UserName = "khanht",
                    Email = "khanh2122000@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "khanh123"),
                    PhoneNumber = "0924721184"
                },
                new Users { 
                    Id = 3,
                    UserCode = "U0003",
                    FullName = "Hoang Nguyen",
                    Gender = "Male",
                    Address = "District 5, HCM City",
                    UserName = "hoangnguyen",
                    Email = "hoang123@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "hoang123"),
                    PhoneNumber = "0924721184"
                },
                new Users { 
                    Id = 4,
                    UserCode = "U0004",
                    FullName = "Được Nguyễn",
                    Gender = "Male",
                    Address = "District 7, HCM City",
                    UserName = "duocn",
                    Email = "duocn342@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "duoc123"),
                    PhoneNumber = "0924721184"
                },
                new Users { 
                    Id = 5,
                    UserCode = "U0005",
                    FullName = "Nhi Tran",
                    Gender = "Female",
                    Address = "District 11, HCM City",
                    UserName = "nhit345",
                    Email = "nhit3450@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "nhi123"),
                    PhoneNumber = "0924721184"
                },
                new Users { 
                    Id = 6,
                    UserCode = "U0006",
                    FullName = "Phương Trần",
                    Gender = "Female",
                    Address = "District 1, HCM City",
                    UserName = "phuongt234",
                    Email = "phuognt234@gmail.com",
                    PasswordHash = hasher.HashPassword(null, "phuong123"),
                    PhoneNumber = "0924721184"
                }
            );
        }
    }
}