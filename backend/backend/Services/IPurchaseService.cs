using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IPurchaseService
    {
        IEnumerable<Purchase> GetUserPurchasesAsync(string userId);
        Purchase GetPurchaseByIdAsync(int id);
        bool CreatePurchaseAsync(Purchase purchase);
        bool CheckCoursePurchasedAsync(string userId, int courseId);
        IEnumerable<Course> GetUserPurchasedCoursesAsync(string userId);
    }
}
