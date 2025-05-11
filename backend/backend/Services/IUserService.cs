using backend.Models;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IUserService
    {
        Task<ApplicationUser> GetUserById(string id);
        Task<ApplicationUser> GetUserByEmail(string email);
        Task<bool> UpdateUserProfile(ApplicationUser user);
        Task<bool> ChangePassword(string userId, string currentPassword, string newPassword);
        Task<bool> IsEmailUnique(string email);
        Task<bool> IsUsernameUnique(string username);
    }
}
