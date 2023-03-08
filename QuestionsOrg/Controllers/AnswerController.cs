using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionsOrg.Data;
using QuestionsOrg.Models;

namespace QuestionsOrg.Controllers
{
    [ApiController]
    [Route("api/answers")]
    public class AnswerController : Controller
    {
        private AnswerContext db;

        public AnswerController(AnswerContext db)
        {
            this.db = db;
        }

        [HttpGet("all"), Authorize]
        public IEnumerable<Answer> Get()
        {
            return db.Answers;
        }

        [HttpGet("user/{id}")]
        public IEnumerable<Answer> GetByUserId(int id)
        {
            return db.Answers.Where(x => x.AuthorId == id);
        }

        [HttpGet("question/{id}")]
        public IEnumerable<Answer> GetByAuthorId(int id)
        {
            return db.Answers.Where(x => x.QuestionId == id);
        }

        [HttpPost]
        public void PostAnswer([FromBody] Answer answer)
        {
            db.Answers.Add(answer);
            db.SaveChanges();
        }
    }
}
