using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAllCategoriesAsync();
        Category GetCategoryByIdAsync(int id);
        bool CreateCategoryAsync(Category category);
        bool UpdateCategoryAsync(Category category);
        bool DeleteCategoryAsync(int id);
    }
}
