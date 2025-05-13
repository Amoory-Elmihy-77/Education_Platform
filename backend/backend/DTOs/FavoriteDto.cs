using System;

namespace backend.DTOs
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public int CourseId { get; set; }
        public string CourseTitle { get; set; }
    }
}
