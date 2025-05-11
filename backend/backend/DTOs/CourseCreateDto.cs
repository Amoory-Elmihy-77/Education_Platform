using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CourseCreateDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0, 9999.99)]
        public decimal Price { get; set; }

        public IFormFile Thumbnail { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public bool IsFeatured { get; set; }
    }
}