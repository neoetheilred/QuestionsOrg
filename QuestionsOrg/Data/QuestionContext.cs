using Microsoft.EntityFrameworkCore;
using QuestionsOrg.Models;

namespace QuestionsOrg.Data
{
    public class QuestionContext : DbContext
    {
        public QuestionContext(DbContextOptions<QuestionContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }
    }
}
