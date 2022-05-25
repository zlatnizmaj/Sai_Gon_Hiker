using SaiGonHiker.DataAccessor.Entities;

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

        }
    }
}
