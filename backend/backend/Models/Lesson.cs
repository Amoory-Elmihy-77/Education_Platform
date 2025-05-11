using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Lesson
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public int Order { get; set; }

        // Foreign key
        public int SectionId { get; set; }

        // Navigation property
        public virtual Section Section { get; set; }
    }
}