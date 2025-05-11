using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace backend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public UserRole Role { get; set; }

        // Navigation properties
        public virtual ICollection<Course> CreatedCourses { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }
    }

    public enum UserRole
    {
        Student,
        Instructor
    }
}