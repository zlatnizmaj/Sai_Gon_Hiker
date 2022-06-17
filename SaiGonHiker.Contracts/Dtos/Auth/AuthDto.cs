namespace SaiGonHiker.Contracts.Dtos.Auth
{
    public class AuthDto
    {
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public string Token { get; set; }
        public bool IsSuccess { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsFirstLogin { get; set; }
        public string Address { get; set; }
    }
}