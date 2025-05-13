using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/sections/{sectionId}/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LessonsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/sections/{sectionId}/lessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LessonDto>>> GetLessons(int sectionId)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
            {
                return NotFound();
            }

            var lessons = await _context.Lessons
                .Where(l => l.SectionId == sectionId)
                .OrderBy(l => l.Order)
                .ToListAsync();

            return _mapper.Map<List<LessonDto>>(lessons);
        }

        // GET: api/sections/{sectionId}/lessons/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonDto>> GetLesson(int sectionId, int id)
        {
            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.SectionId == sectionId && l.Id == id);

            if (lesson == null)
            {
                return NotFound();
            }

            return _mapper.Map<LessonDto>(lesson);
        }

        // POST: api/sections/{sectionId}/lessons
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Instructor")]
        public async Task<ActionResult<LessonDto>> CreateLesson(int sectionId, LessonCreateDto lessonDto)
        {
            var section = await _context.Sections
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (section.Course.InstructorId != userId)
            {
                return Forbid();
            }

            // Get the highest order number
            var maxOrder = await _context.Lessons
                .Where(l => l.SectionId == sectionId)
                .Select(l => (int?)l.Order)
                .MaxAsync() ?? 0;

            var lesson = _mapper.Map<Lesson>(lessonDto);
            lesson.SectionId = sectionId;

            // If order is not specified, append to the end
            if (lesson.Order == 0)
            {
                lesson.Order = maxOrder + 1;
            }

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetLesson),
                new { sectionId = sectionId, id = lesson.Id },
                _mapper.Map<LessonDto>(lesson));
        }

        // PUT: api/sections/{sectionId}/lessons/{id}
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Instructor")]
        public async Task<IActionResult> UpdateLesson(int sectionId, int id, LessonCreateDto lessonDto)
        {
            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.SectionId == sectionId && l.Id == id);

            if (lesson == null)
            {
                return NotFound();
            }

            // Verify ownership
            var section = await _context.Sections
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (section.Course.InstructorId != userId)
            {
                return Forbid();
            }

            _mapper.Map(lessonDto, lesson);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonExists(id))
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

        // DELETE: api/sections/{sectionId}/lessons/{id}
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Instructor")]
        public async Task<IActionResult> DeleteLesson(int sectionId, int id)
        {
            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.SectionId == sectionId && l.Id == id);

            if (lesson == null)
            {
                return NotFound();
            }

            // Verify ownership
            var section = await _context.Sections
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (section.Course.InstructorId != userId)
            {
                return Forbid();
            }

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LessonExists(int id)
        {
            return _context.Lessons.Any(e => e.Id == id);
        }
    }
}