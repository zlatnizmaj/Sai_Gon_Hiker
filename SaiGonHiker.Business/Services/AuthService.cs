using System.Linq;
using Microsoft.AspNetCore.Identity;
using SaiGonHiker.Business.Interfaces;
using SaiGonHiker.Contracts.Constants;
using SaiGonHiker.Contracts.Dtos.Auth;
using SaiGonHiker.DataAccessor.Entities;
using SaiGonHiker.Contracts;
using SaiGonHiker.Contracts.Dtos.Users;
using AutoMapper;

namespace SaiGonHiker.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IBaseRepository<Users> _usersRepository;

        private readonly IBaseRepository<IdentityRole<int>> _rolesRepository;

        private readonly IBaseRepository<IdentityUserRole<int>> _userRolesRepository;
        private readonly IMapper _mapper;

        private readonly ITokenService _tokenService;

        public AuthService(
            IBaseRepository<Users> usersRepository,
            IBaseRepository<IdentityRole<int>> rolesRepository,
            IBaseRepository<IdentityUserRole<int>> userRolesRepository,
            ITokenService tokenService,
            IMapper mapper
        )
        {
            _usersRepository = usersRepository;
            _rolesRepository = rolesRepository;
            _userRolesRepository = userRolesRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public AuthDto AuthLogin(AuthLoginRequest authLoginRequest)
        {
            var user = GetUserByUserName(authLoginRequest.UserName);

            if (user == null || !CheckPassword(user.UserTable, authLoginRequest.Password))
            {
                return new AuthDto
                {
                    Token = "",
                    IsSuccess = false
                };
            }

            var token = _tokenService
                        .BuildToken(JWTSettings.Key, JWTSettings.Issuer, JWTSettings.Audience, user.UserTable, user.RoleName);

            return new AuthDto
            {
                UserName = user.UserTable.UserName,
                RoleName = user.RoleName,
                Token = token,
                IsSuccess = true,
                IsDisabled = user.UserTable.IsDisabled,
                Address = user.UserTable.Address
            };
        }

        // public void AuthChangePassword(AuthUpdateRequest authUpdateRequest, string userName)
        // {
        //     var hasher = new PasswordHasher<Users>();
        //     var user = _usersRepository.Entities.Where(u => u.UserName == userName).FirstOrDefault();

        //     if (user == null)
        //     {
        //         throw new NotFoundException("The User doesn't exist");
        //     }

        //     user.PasswordHash = hasher.HashPassword(null, authUpdateRequest.ChangePassword);
        //     user.IsFirstLogin = true;
        //     _usersRepository.Update(user);
        // }

        public bool CheckPassword(Users user, string passWord)
        {
            var hasher = new PasswordHasher<Users>();
            var checkPassword = hasher
                                .VerifyHashedPassword(user,
                                user.PasswordHash,
                                passWord);
            if (checkPassword == 0) return false;
            return true;
        }

        public UserRoleNameDto GetUserByUserName(string userName)
        {
            var user =
                (
                    from u in _usersRepository.Entities
                    join ur in _userRolesRepository.Entities
                    on u.Id equals ur.UserId
                    join r in _rolesRepository.Entities
                    on ur.RoleId equals r.Id
                    where (u.UserName == userName)
                    select new UserRoleNameDto
                    {
                        UserTable = u,
                        RoleName = r.Name
                    }).FirstOrDefault();
            return user;
        }

        // public UsersDto GetAccount(string userName)
        // {
        //     var userAndRoleName = GetUserByUserName(userName);
        //     var user = _mapper.Map<UsersDto>(userAndRoleName);
        //     return user;
        // }
    }
}