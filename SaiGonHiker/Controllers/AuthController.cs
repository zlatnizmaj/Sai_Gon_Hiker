using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaiGonHiker.Business.Interfaces;
using SaiGonHiker.Contracts;
using SaiGonHiker.Contracts.Dtos.Auth;
using SaiGonHiker.Contracts.Dtos.Users;

namespace SaiGonHiker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Post: api/Auth
        [HttpPost]
        public ActionResult<AuthDto> PostLogin([FromBody] AuthLoginRequest authLoginRequest)
        {
            if (authLoginRequest == null)
            {
                throw new NotFoundException("AuthLoginRequest is null");
            }
            return Ok(_authService.AuthLogin(authLoginRequest));
        }

        // // Put: api/Auth
        // [Authorize]
        // [HttpPut]
        // public ActionResult PutChangePassWord([FromBody] AuthUpdateRequest authUpdateRequest)
        // {
        //     if (authUpdateRequest == null)
        //     {
        //         throw new NotFoundException("AuthUpdateRequest is null");
        //     }
        //     _authService.AuthChangePassword(authUpdateRequest, User.Identity.Name);
        //     return Ok();
        // }

        // // Put: api/Auth
        // [Authorize]
        // [HttpGet("me")]
        // public ActionResult<UsersDto> GetMe()
        // {
        //     return Ok(_authService.GetAccount(User.Identity.Name));
        // }
    }
}