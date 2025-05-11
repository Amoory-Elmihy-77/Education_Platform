using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;
using static System.Collections.Specialized.BitVector32;

namespace backend.Models
{
    public class Course
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public string ThumbnailUrl { get; set; }

        public bool IsFeatured { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int CategoryId { get; set; }
        public string InstructorId { get; set; }

        // Navigation properties
        public virtual Category Category { get; set; }
        public virtual ApplicationUser Instructor { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }
    }
}