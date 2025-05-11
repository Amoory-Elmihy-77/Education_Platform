namespace backend.DTOs
{
    public class LessonDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public int SectionId { get; set; }
    }
}