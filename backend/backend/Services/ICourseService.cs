using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<IEnumerable<Course>> GetFeaturedCoursesAsync();
        Task<IEnumerable<Course>> GetCoursesByCategoryAsync(int categoryId);
        Task<IEnumerable<Course>> GetCoursesByInstructorAsync(string instructorId);
        Task<Course> GetCourseByIdAsync(int id);
        Task<bool> CreateCourseAsync(Course course);
        Task<bool> UpdateCourseAsync(Course course);
        Task<bool> DeleteCourseAsync(int id);
        Task<bool> AddCourseToFavoritesAsync(string userId, int courseId);
        Task<bool> RemoveCourseFromFavoritesAsync(string userId, int courseId);
        Task<IEnumerable<Course>> GetFavoriteCoursesAsync(string userId);
    }
}
