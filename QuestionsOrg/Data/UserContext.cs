using Microsoft.EntityFrameworkCore;
using QuestionsOrg.Models;

namespace QuestionsOrg.Data
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
    }
}
