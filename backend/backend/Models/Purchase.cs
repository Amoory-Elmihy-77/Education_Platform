using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Models
{
    public class Purchase
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public string TransactionId { get; set; }

        public DateTime PurchasedAt { get; set; } = DateTime.UtcNow;

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