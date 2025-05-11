using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/courses/{courseId}/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SectionsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/courses/{courseId}/sections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SectionDto>>> GetSections(int courseId)
        {
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound();
            }

            var sections = await _context.Sections
                .Include(s => s.Lessons)
                .Where(s => s.CourseId == courseId)
                .OrderBy(s => s.Order)
                .ToListAsync();

            return _mapper.Map<List<SectionDto>>(sections);
        }

        // GET: api/courses/{courseId}/sections/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SectionDto>> GetSection(int courseId, int id)
        {
            var section = await _context.Sections
                .Include(s => s.Lessons)
                .FirstOrDefaultAsync(s => s.CourseId == courseId && s.Id == id);

            if (section == null)
            {
                return NotFound();
            }

            return _mapper.Map<SectionDto>(section);
        }

        // POST: api/courses/{courseId}/sections
        [HttpPost]
        [Authorize(Roles = "Instructor")]
        public async Task<ActionResult<SectionDto>> CreateSection(int courseId, SectionCreateDto sectionDto)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (course.InstructorId != userId)
            {
                return Forbid();
            }

            // Get the highest order number
            var maxOrder = await _context.Sections
                .Where(s => s.CourseId == courseId)
                .Select(s => (int?)s.Order)
                .MaxAsync() ?? 0;

            var section = _mapper.Map<Section>(sectionDto);
            section.CourseId = courseId;

            // If order is not specified, append to the end
            if (section.Order == 0)
            {
                section.Order = maxOrder + 1;
            }

            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSection),
                new { courseId = courseId, id = section.Id },
                _mapper.Map<SectionDto>(section));
        }

        // PUT: api/courses/{courseId}/sections/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> UpdateSection(int courseId, int id, SectionCreateDto sectionDto)
        {
            var section = await _context.Sections
                .FirstOrDefaultAsync(s => s.CourseId == courseId && s.Id == id);

            if (section == null)
            {
                return NotFound();
            }

            var course = await _context.Courses.FindAsync(courseId);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (course.InstructorId != userId)
            {
                return Forbid();
            }

            _mapper.Map(sectionDto, section);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
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

        // DELETE: api/courses/{courseId}/sections/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> DeleteSection(int courseId, int id)
        {
            var section = await _context.Sections
                .FirstOrDefaultAsync(s => s.CourseId == courseId && s.Id == id);

            if (section == null)
            {
                return NotFound();
            }

            var course = await _context.Courses.FindAsync(courseId);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (course.InstructorId != userId)
            {
                return Forbid();
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SectionExists(int id)
        {
            return _context.Sections.Any(e => e.Id == id);
        }
    }
}