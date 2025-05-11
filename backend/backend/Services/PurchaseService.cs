using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace backend.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly ApplicationDbContext _context;

        public PurchaseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Purchase> GetUserPurchasesAsync(string userId)
        {
            return _context.Purchases
                .Where(p => p.StudentId == userId)
                .Include(p => p.Course)
                .Include(p => p.Student)
                .OrderByDescending(p => p.PurchasedAt)
                .ToList();
        }

        public Purchase GetPurchaseByIdAsync(int id)
        {
            return _context.Purchases
                .Include(p => p.Course)
                .Include(p => p.Student)
                .FirstOrDefault(p => p.Id == id);
        }

        public bool CreatePurchaseAsync(Purchase purchase)
        {
            _context.Purchases.Add(purchase);
            return _context.SaveChanges() > 0;
        }

        public bool CheckCoursePurchasedAsync(string userId, int courseId)
        {
            return _context.Purchases
                .Any(p => p.StudentId == userId && p.CourseId == courseId);
        }

        public IEnumerable<Course> GetUserPurchasedCoursesAsync(string userId)
        {
            return _context.Purchases
                .Where(p => p.StudentId == userId)
                .Select(p => p.Course)
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Include(c => c.Sections)
                .ThenInclude(s => s.Lessons)
                .ToList();
        }
    }
}
