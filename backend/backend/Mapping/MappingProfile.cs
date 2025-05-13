using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile ()
        {
            CreateMap<ApplicationUser, UserProfileDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));

            CreateMap<CategoryDto, Category>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.Name));
        }
    }
}
