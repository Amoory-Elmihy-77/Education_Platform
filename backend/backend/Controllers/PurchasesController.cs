using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PurchasesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/purchases
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult<IEnumerable<PurchaseDto>>> GetUserPurchases()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var purchases = await _context.Purchases
                .Include(p => p.Course)
                .Where(p => p.StudentId == userId)
                .OrderByDescending(p => p.PurchasedAt)
                .ToListAsync();

            return _mapper.Map<List<PurchaseDto>>(purchases);
        }

        // GET: api/purchases/{id}
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult<PurchaseDto>> GetPurchase(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var purchase = await _context.Purchases
                .Include(p => p.Course)
                .FirstOrDefaultAsync(p => p.Id == id && p.StudentId == userId);

            if (purchase == null)
            {
                return NotFound();
            }

            return _mapper.Map<PurchaseDto>(purchase);
        }

        // POST: api/purchases
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult<PurchaseDto>> CreatePurchase(PurchaseCreateDto purchaseDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Check if course exists
            var course = await _context.Courses.FindAsync(purchaseDto.CourseId);
            if (course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            // Check if already purchased
            var alreadyPurchased = await _context.Purchases
                .AnyAsync(p => p.StudentId == userId && p.CourseId == purchaseDto.CourseId);

            if (alreadyPurchased)
            {
                return BadRequest(new { message = "You have already purchased this course" });
            }

            // Process payment (simplified, in a real app you would integrate with a payment gateway)
            var transactionId = Guid.NewGuid().ToString();

            var purchase = new Purchase
            {
                StudentId = userId,
                CourseId = purchaseDto.CourseId,
                Amount = course.Price,
                TransactionId = transactionId
            };

            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            // Include course info in response
            purchase.Course = course;

            return CreatedAtAction(nameof(GetPurchase), new { id = purchase.Id }, _mapper.Map<PurchaseDto>(purchase));
        }

        // GET: api/purchases/courses
        [HttpGet("courses")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetPurchasedCourses()
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

        // GET: api/purchases/check/{courseId}
        [HttpGet("check/{courseId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult<bool>> CheckPurchase(int courseId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var purchased = await _context.Purchases
                .AnyAsync(p => p.StudentId == userId && p.CourseId == courseId);

            return purchased;
        }
    }
}