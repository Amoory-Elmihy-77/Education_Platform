using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile ()
        {
            // User mappings
            CreateMap<ApplicationUser, UserProfileDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));

            // Category mappings
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();

            // Course mappings
            CreateMap<Course, CourseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.FullName));
            CreateMap<CourseCreateDto, Course>();
            CreateMap<CourseUpdateDto, Course>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // Section mappings
            CreateMap<Section, SectionDto>();
            CreateMap<SectionCreateDto, Section>();

            // Lesson mappings
            CreateMap<Lesson, LessonDto>();
            CreateMap<LessonCreateDto, Lesson>();

            // Purchase mappings
            CreateMap<Purchase, PurchaseDto>()
                .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title));
            CreateMap<PurchaseCreateDto, Purchase>();

            // Favorite mappings
            CreateMap<Favorite, FavoriteDto>()
                .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title));
        }
    }
}
