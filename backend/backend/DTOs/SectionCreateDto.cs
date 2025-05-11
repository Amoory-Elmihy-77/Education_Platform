using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class SectionCreateDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public int Order { get; set; }
    }
}