namespace SaiGonHiker.Contracts.Dtos.Users
{
    public class UserRoleNameDto
    {
        public SaiGonHiker.DataAccessor.Entities.Users UserTable { get; set; }
        public string RoleName { get; set; }
    }
}