using System.Collections.Generic;

namespace backend.DTOs
{
    public class SectionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public int CourseId { get; set; }
        public List<LessonDto> Lessons { get; set; }
    }
}