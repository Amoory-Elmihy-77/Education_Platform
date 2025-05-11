using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetFeaturedCoursesAsync()
        {
            return await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.IsFeatured)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByCategoryAsync(int categoryId)
        {
            return await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByInstructorAsync(string instructorId)
        {
            return await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.InstructorId == instructorId)
                .ToListAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            return await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Include(c => c.Sections)
                .ThenInclude(s => s.Lessons)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> CreateCourseAsync(Course course)
        {
            _context.Courses.Add(course);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateCourseAsync(Course course)
        {
            _context.Courses.Update(course);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteCourseAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddCourseToFavoritesAsync(string userId, int courseId)
        {
            var favorite = new Favorite
            {
                StudentId = userId,
                CourseId = courseId
            };

            _context.Favorites.Add(favorite);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveCourseFromFavoritesAsync(string userId, int courseId)
        {
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.StudentId == userId && f.CourseId == courseId);

            if (favorite == null) return false;

            _context.Favorites.Remove(favorite);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Course>> GetFavoriteCoursesAsync(string userId)
        {
            return await _context.Favorites
                .Where(f => f.StudentId == userId)
                .Select(f => f.Course)
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .ToListAsync();
        }
    }
}
