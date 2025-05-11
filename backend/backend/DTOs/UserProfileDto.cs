using backend.Models;

namespace backend.DTOs
{
    public class UserProfileDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }
}