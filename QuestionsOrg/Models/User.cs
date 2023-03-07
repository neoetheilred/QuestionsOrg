namespace QuestionsOrg.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class AuthToken
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
    }

    public class UserResponse
    {
        public string Name { get; set; }
        public int Id { get; set; }
    }
}
