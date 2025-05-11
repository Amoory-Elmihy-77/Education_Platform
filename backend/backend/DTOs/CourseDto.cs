using System;
using System.Collections.Generic;

namespace backend.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailUrl { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public string InstructorId { get; set; }
        public string InstructorName { get; set; }
    }
}