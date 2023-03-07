using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionsOrg.Data;
using QuestionsOrg.Models;

namespace QuestionsOrg.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private QuestionContext db;

        public HomeController(QuestionContext db)
        {
            this.db = db;
        }

        [HttpGet, Authorize]
        public IEnumerable<Question> GetQuestions()
        {
            return db.Questions;
        }

        [HttpDelete("{id}"), Authorize]
        public void Delete(int id)
        {
            var toDelete = db.Questions.FirstOrDefault(x => x.Id == id);
            if (toDelete != null)
            {
                db.Questions.Remove(toDelete);
            }
            db.SaveChanges();
        }

        [HttpGet("author/{id}")]
        public IEnumerable<Question> GetByUserId(int id)
        {
            return db.Questions.Where(x => x.AuthorId == id);
        }

        [HttpPost]
        public bool Post([FromBody] Question question)
        {
            try
            {
                this.db.Questions.Add(question);
                this.db.SaveChanges();
                return true;
            } catch
            {
                return false;
            }
        }
    }
}
