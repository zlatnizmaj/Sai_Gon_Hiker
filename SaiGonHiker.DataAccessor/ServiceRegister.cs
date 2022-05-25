﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaiGonHiker.DataAccessor.Data;

namespace SaiGonHiker.DataAccessor
{
    public static class ServiceRegister
    {
        public static void AddDataAccessorLayer(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(config.GetConnectionString("DbConnection"), b =>
                    b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                ));
        }
    }
}