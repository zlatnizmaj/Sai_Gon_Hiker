using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SaiGonHiker.DataAccessor.Entities
{
    public class Users : IdentityUser<int>
    {
        public bool IsDisabled { get; set; }

        public string UserCode { get; set; }

        public string FullName { get; set; }

        public string Gender { get; set; }

        public string Address { get; set; }
    }
}
