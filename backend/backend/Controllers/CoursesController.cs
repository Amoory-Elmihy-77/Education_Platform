using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;

        public CoursesController(
            ApplicationDbContext context,
            IMapper mapper,
            UserManager<ApplicationUser> userManager,
            IWebHostEnvironment environment)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _environment = environment;
        }

        // GET: api/courses/featured
        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetFeaturedCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.IsFeatured)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(courses);
        }

        // GET: api/courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses([FromQuery] string search)
        {
            var query = _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c =>
                    c.Title.Contains(search) ||
                    c.Description.Contains(search));
            }

            var courses = await query.ToListAsync();
            return _mapper.Map<List<CourseDto>>(courses);
        }

        // GET: api/courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Lessons)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return NotFound();
            }

            return _mapper.Map<CourseDto>(course);
        }

        // POST: api/courses
        [HttpPost]
        [Authorize(Roles = "Instructor")]
        public async Task<ActionResult<CourseDto>> CreateCourse([FromForm] CourseCreateDto courseDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var course = _mapper.Map<Course>(courseDto);
            course.InstructorId = userId;

            // Handle thumbnail upload
            if (courseDto.Thumbnail != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(courseDto.Thumbnail.FileName);
                var filePath = Path.Combine(_environment.WebRootPath, "uploads", fileName);

                Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "uploads"));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await courseDto.Thumbnail.CopyToAsync(stream);
                }

                course.ThumbnailUrl = "/uploads/" + fileName;
            }

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, _mapper.Map<CourseDto>(course));
        }

        // PUT: api/courses/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> UpdateCourse(int id, [FromForm] CourseUpdateDto courseDto)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (course.InstructorId != userId)
            {
                return Forbid();
            }

            // Update course properties
            _mapper.Map(courseDto, course);

            // Handle thumbnail update
            if (courseDto.Thumbnail != null)
            {
                // Delete old thumbnail if exists
                if (!string.IsNullOrEmpty(course.ThumbnailUrl))
                {
                    var oldFilePath = Path.Combine(_environment.WebRootPath, course.ThumbnailUrl.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                // Save new thumbnail
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(courseDto.Thumbnail.FileName);
                var filePath = Path.Combine(_environment.WebRootPath, "uploads", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await courseDto.Thumbnail.CopyToAsync(stream);
                }

                course.ThumbnailUrl = "/uploads/" + fileName;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/courses/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (course.InstructorId != userId)
            {
                return Forbid();
            }

            // Delete thumbnail if exists
            if (!string.IsNullOrEmpty(course.ThumbnailUrl))
            {
                var filePath = Path.Combine(_environment.WebRootPath, course.ThumbnailUrl.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/courses/category/{categoryId}
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesByCategory(int categoryId)
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.CategoryId == categoryId)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(courses);
        }

        // GET: api/courses/instructor/{instructorId}
        [HttpGet("instructor/{instructorId}")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesByInstructor(string instructorId)
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.InstructorId == instructorId)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(courses);
        }

        // POST: api/courses/{courseId}/favorite
        [HttpPost("{courseId}/favorite")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> FavoriteCourse(int courseId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Check if the favorite already exists
            var existingFavorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.StudentId == userId && f.CourseId == courseId);

            if (existingFavorite != null)
            {
                return BadRequest(new { message = "Course is already in favorites" });
            }

            // Check if course exists
            var courseExists = await _context.Courses.AnyAsync(c => c.Id == courseId);
            if (!courseExists)
            {
                return NotFound(new { message = "Course not found" });
            }

            var favorite = new Favorite
            {
                StudentId = userId,
                CourseId = courseId
            };

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course added to favorites" });
        }

        // DELETE: api/courses/{courseId}/favorite
        [HttpDelete("{courseId}/favorite")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> RemoveFavoriteCourse(int courseId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.StudentId == userId && f.CourseId == courseId);

            if (favorite == null)
            {
                return NotFound(new { message = "Course not found in favorites" });
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course removed from favorites" });
        }

        // GET: api/courses/favorites
        [HttpGet("favorites")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetFavoriteCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var favoriteCourses = await _context.Favorites
                .Include(f => f.Course)
                    .ThenInclude(c => c.Category)
                .Include(f => f.Course)
                    .ThenInclude(c => c.Instructor)
                .Where(f => f.StudentId == userId)
                .Select(f => f.Course)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(favoriteCourses);
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }
    }
}