using backend.Models;

namespace backend.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public string Token { get; set; }
    }
}