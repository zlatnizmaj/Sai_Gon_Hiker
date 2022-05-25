using Microsoft.Extensions.DependencyInjection;
using SaiGonHiker.Business.Interfaces;
using System.Reflection;

namespace SaiGonHiker.Business
{
    public static class ServiceRegister
    {
        public static void AddBusinessLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        }
    }
}