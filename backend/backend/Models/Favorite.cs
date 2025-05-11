using System;
using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        [Required]
        public string StudentId { get; set; }

        [Required]
        public int CourseId { get; set; }

        // Navigation properties
        public virtual ApplicationUser Student { get; set; }
        public virtual Course Course { get; set; }
    }
}