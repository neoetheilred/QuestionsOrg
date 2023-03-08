using Microsoft.EntityFrameworkCore;
using QuestionsOrg.Models;

namespace QuestionsOrg.Data
{
    public class AnswerContext : DbContext
    {
        public AnswerContext(DbContextOptions<AnswerContext> options) : base(options) { }

        public DbSet<Answer> Answers { get; set; }
    }
}
