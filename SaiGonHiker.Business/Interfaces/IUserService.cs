using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using SaiGonHiker.Contracts;
using SaiGonHiker.Contracts.Dtos.Users;

namespace SaiGonHiker.Business.Interfaces
{
    public interface IUserService
    {
        public Task<UserDto> CreateUsers(UserCreateDto userCreateDto);
    }
}