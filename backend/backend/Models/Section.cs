using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Models
{
    public class Section
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public int Order { get; set; }

        // Foreign key
        public int CourseId { get; set; }

        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}