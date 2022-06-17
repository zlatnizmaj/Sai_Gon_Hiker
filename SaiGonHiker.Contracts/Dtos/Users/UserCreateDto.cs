using System;

namespace SaiGonHiker.Contracts.Dtos.Users 
{
    public class UserCreateDto
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int RoleId { get; set; }
        public string Address { get; set; }

    }
}