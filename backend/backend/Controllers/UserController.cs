using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserController(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        // GET: api/user/profile
        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserProfileDto>(user);
        }

        // GET: api/user/instructors
        [HttpGet("instructors")]
        public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetInstructors()
        {
            var instructors = await _userManager.GetUsersInRoleAsync("Instructor");
            return _mapper.Map<List<UserProfileDto>>(instructors);
        }

        // GET: api/user/instructor/{id}
        [HttpGet("instructor/{id}")]
        public async Task<ActionResult<UserProfileDto>> GetInstructor(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null || user.Role != UserRole.Instructor)
            {
                return NotFound();
            }

            return _mapper.Map<UserProfileDto>(user);
        }

        // GET: api/user/instructor/{id}/courses
        [HttpGet("instructor/{id}/courses")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetInstructorCourses(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null || user.Role != UserRole.Instructor)
            {
                return NotFound();
            }

            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.InstructorId == id)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(courses);
        }

        // PUT: api/user/profile
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UserProfileDto profileDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId != profileDto.Id)
            {
                return Forbid();
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            // Only update full name, email cannot be updated here
            user.FullName = profileDto.FullName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        // PUT: api/user/change-password
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ChangePasswordAsync(
                user,
                model.CurrentPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "Password changed successfully" });
        }

        // GET: api/user/enrolled-courses
        [HttpGet("enrolled-courses")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetEnrolledCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var purchasedCourses = await _context.Purchases
                .Include(p => p.Course)
                    .ThenInclude(c => c.Category)
                .Include(p => p.Course)
                    .ThenInclude(c => c.Instructor)
                .Where(p => p.StudentId == userId)
                .Select(p => p.Course)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(purchasedCourses);
        }

        // GET: api/user/my-courses
        [HttpGet("my-courses")]
        [Authorize(Roles = "Instructor")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetMyCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Instructor)
                .Where(c => c.InstructorId == userId)
                .ToListAsync();

            return _mapper.Map<List<CourseDto>>(courses);
        }
    }

    public class ChangePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }
}