using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class PurchaseCreateDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        [Required]
        public string PaymentToken { get; set; }
    }
}