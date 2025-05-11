using System;

namespace backend.DTOs
{
    public class PurchaseDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime PurchasedAt { get; set; }
        public int CourseId { get; set; }
        public string CourseTitle { get; set; }
    }
}