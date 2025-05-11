using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAllCategoriesAsync()
        {
            return _context.Categories.ToList();
        }

        public Category GetCategoryByIdAsync(int id)
        {
            return _context.Categories.Find(id);
        }

        public bool CreateCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            return _context.SaveChanges() > 0;
        }

        public bool UpdateCategoryAsync(Category category)
        {
            _context.Categories.Update(category);
            return _context.SaveChanges() > 0;
        }

        public bool DeleteCategoryAsync(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            return _context.SaveChanges() > 0;
        }
    }
}
