using SaiGonHiker.Extensions.ServiceCollection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SaiGonHiker.Middlewares;
using System.Text.Json;
using System.Text.Json.Serialization;
using SaiGonHiker.Business;
using SaiGonHiker.DataAccessor;
using FluentValidation.AspNetCore;
using System.Reflection;

namespace SaiGonHiker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthenticationRegister();
            services.AddHttpContextAccessor();
            services.AddDataAccessorLayer(Configuration);
            services.AddBusinessLayer();

            services.AddControllers()
                .AddFluentValidation(fv =>
                    {
                        fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
                        fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                    })
                .AddJsonOptions(ops =>
                    {
                        ops.JsonSerializerOptions.IgnoreNullValues = true;
                        ops.JsonSerializerOptions.WriteIndented = true;
                        ops.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                        ops.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                        ops.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Frontend/build";
            });

            services.AddSwagger();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigins",
                    builder =>
                    {
                        builder.WithOrigins(Configuration["AllowOrigins"])
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SaiGonHiker v1"));
            }
            else
            {
                app.UseMiddleware<ErrorHandler>();
            }

            app.UseHttpsRedirection();
            app.UseSpaStaticFiles();
            app.UseCors("AllowOrigins");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Frontend";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
