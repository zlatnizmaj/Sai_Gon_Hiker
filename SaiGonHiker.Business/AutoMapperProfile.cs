using SaiGonHiker.DataAccessor.Entities;
using SaiGonHiker.Contracts.Dtos.Users;

namespace SaiGonHiker.Business
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            FromDataAccessorLayer();
            FromPresentationLayer();
        }

        private void FromPresentationLayer()
        {
            
        }

        private void FromDataAccessorLayer()
        {
            CreateMap<UserDto, Users>().ReverseMap();
            CreateMap<UserCreateDto, Users>().ReverseMap();
            CreateMap<UserRoleNameDto, UserDto>()
            .ForMember(src => src.IsDisabled, act => act.MapFrom(dest => dest.UserTable.IsDisabled))
            .ForMember(src => src.UserCode, act => act.MapFrom(dest => dest.UserTable.UserCode))
            .ForMember(src => src.FullName, act => act.MapFrom(dest => dest.UserTable.FullName))
            .ForMember(src => src.Gender, act => act.MapFrom(dest => dest.UserTable.Gender))
            .ForMember(src => src.Address, act => act.MapFrom(dest => dest.UserTable.Address))
            .ForMember(src => src.UserName, act => act.MapFrom(dest => dest.UserTable.UserName))
            .ForMember(src => src.Email, act => act.MapFrom(dest => dest.UserTable.Email))
            .ReverseMap();
        }
    }
}
