using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SaiGonHiker.Business.Interfaces;
using SaiGonHiker.DataAccessor.Entities;
using SaiGonHiker.Contracts;
using System.Collections.Generic;
using SaiGonHiker.Contracts.Dtos.Users;
using AutoMapper;
using System.Threading;
using System.Collections.Immutable;
using System;

namespace SaiGonHiker.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<Users> _usersRepository;

        private readonly IBaseRepository<IdentityRole<int>> _rolesRepository;

        private readonly IBaseRepository<IdentityUserRole<int>> _userRolesRepository;

        private readonly IMapper _mapper;

        public UserService(
            IBaseRepository<Users> usersRepository,
            IBaseRepository<IdentityRole<int>> rolesRepository,
            IBaseRepository<IdentityUserRole<int>> userRolesRepository,
            IMapper mapper
        )
        {
            _usersRepository = usersRepository;
            _rolesRepository = rolesRepository;
            _userRolesRepository = userRolesRepository;
            _mapper = mapper;
        }

        public async Task<UserDto> CreateUsers(UserCreateDto userCreateDto)
        {
            var hasher = new PasswordHasher<Users>();
            var user = _mapper.Map<Users>(userCreateDto);
            user.PasswordHash = hasher.HashPassword(null, userCreateDto.Password);
            user.UserCode = GenerateUserCode();
            var _user = await _usersRepository.Add(user);
            if (_user != null)
            {
                await _userRolesRepository.Add(new IdentityUserRole<int>()
                {
                    UserId = _user.Id,
                    RoleId = userCreateDto.RoleId
                });
                var userRoleName = GetUserByUserName(user.UserName);
                var result = _mapper.Map<UserDto>(userRoleName);
                return result;
            }
            return null;
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

        private string GenerateUserCode()
        {
            const string prefixCode = "U";
            var lastUserCode = _usersRepository.Entities.Select(u => u.UserCode)
            .OrderByDescending(u => u).FirstOrDefault();

            if (lastUserCode != null)
            {
                var userCodeOrder = lastUserCode.Replace(prefixCode, "");
                return prefixCode + (int.Parse(userCodeOrder) + 1).ToString("0000");
            }

            return prefixCode + 1.ToString("0000");
        }
    }
}