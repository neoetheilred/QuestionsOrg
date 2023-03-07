using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QuestionsOrg.Data;
using QuestionsOrg.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuestionsOrg.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private UserContext db;
        public AccountController(UserContext db)
        {
            this.db = db;
        }

        [HttpPost("register")]
        public async Task<bool> NewUser([FromBody] User newUser)
        {
            try
            {
                if (db.Users.FirstOrDefault(u => u.Name == newUser.Name) != null)
                {
                    return false;
                }
                await db.Users.AddAsync(newUser);
                await db.SaveChangesAsync();
                await Authenticate(newUser.Name);
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPost("login")]
        public AuthToken Login([FromBody] User user)
        {
            if (user is null)
            {
                return new AuthToken { Success = false, Token = "shite is null" };
            }

            if (db.Users.FirstOrDefault(x => x.Name == user.Name && x.Password == user.Password) != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7039",
                    audience: "https://localhost:7039",
                    claims: new List<Claim>()
                    {
                        new Claim(ClaimTypes.Name, user.Name),
                        new Claim(ClaimTypes.Role, "User")
                    },
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new AuthToken { Success = true, Token = tokenString };
            }

            return new AuthToken { Success = false };
        }

        private async Task Authenticate(string username)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, username)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpGet("profile"), Authorize]
        public UserResponse GetUsername()
        {
            var username = User.Identity!.Name!;
            var user = db.Users.First(x => x.Name == username);
            return new UserResponse { Name = username, Id = user.Id };
        }

        [HttpGet("all")]
        public IEnumerable<User> GetUsers()
        {
            return db.Users;
        }

        [HttpGet("{id}")]
        public User? Get(int id)
        {
            return db.Users.FirstOrDefault(x => x.Id == id);
        }
    }
}
