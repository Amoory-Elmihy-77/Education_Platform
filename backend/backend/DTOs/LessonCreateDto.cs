using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class LessonCreateDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public int Order { get; set; }
    }
}