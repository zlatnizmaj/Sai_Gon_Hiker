using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaiGonHiker.Business.Interfaces;
using SaiGonHiker.Contracts;
using SaiGonHiker.Contracts.Constants;
using SaiGonHiker.Contracts.Dtos.Users;

namespace SaiGonHiker.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase 
    {
        private readonly IUserService _userService;
        
        public UserController(IUserService userService) 
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserCreateDto userCreateDto)
        {
            if (userCreateDto == null)
            {
                throw new NotFoundException("userCreateDto is null");
            }
            return Ok(await _userService.CreateUsers(userCreateDto));
        }
    }
}