﻿using System;
using System.Globalization;
using System.Threading.Tasks;
using GestionGastos20.Models;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NONPO.Models;
using Refit;

using Sicsoft.Checkin.Web.Servicios;



namespace Sicsoft.Checkin.Web
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
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
           .AddCookie(options =>
           {
               options.LoginPath = "/Account/Login/";
               options.AccessDeniedPath = "/Account/AccessDenied";
               options.LogoutPath = "/Account/Logout";
               options.ExpireTimeSpan = TimeSpan.FromMinutes(120);
               
           });

            services.AddHttpContextAccessor();

            services.AddScoped<AuthenticatedHttpClientHandler>();

            services.AddApiServices(Configuration);

            services.AddControllersWithViews()
                .AddRazorRuntimeCompilation();

            services.AddRazorPages()
                .AddMvcOptions(options =>
                {

                    options.Filters.Add(new AuthorizeFilter());
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStatusCodePagesWithReExecute("/StatusCode", "?code={0}");

            app.UseHttpsRedirection();

            var supportedCultures = new[]
            {
                new CultureInfo("en-US"), //es-cr

            };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en-US"),

                // Formatting numbers, dates, etc.
                SupportedCultures = supportedCultures,
                // UI strings that we have localized.
                SupportedUICultures = supportedCultures
            });

            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
            });
        }
    }

    public static class CheckinServiceCollectionExtensions
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddRefitClient<ICrudApi<LoginDevolucion, int>>()
           .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Login/Conectar"));
            // Add additional IHttpClientBuilder chained methods as required here:
            //  .AddHttpMessageHandler<AuthenticatedHttpClientHandler>()
            // .SetHandlerLifetime(TimeSpan.FromMinutes(2));





            services.AddRefitClient<ICrudApi<LoginUsuario, int>>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Login"))
            .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<LoginUsuarioViewModel, int>>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Login"))
            .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<UsuariosViewModel, int>>()
           .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Login"))
           .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();
            services.AddRefitClient<ICrudApi<Compañias, int>>()
          .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Login"));
            services.AddRefitClient<ICrudApi<RolesViewModel, int>>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Roles"))
            .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<NormasRepartoViewModel, int>>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/NormasReparto"))
            .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<GastosViewModel, int>>()
          .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Gastos"))
          .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<CuentasContablesViewModel, int>>()
         .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/CuentasContables"))
         .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<InfoLiquid, int>>()
      .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Cierre/EnviarCorreo"))
      .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<SeguridadModulosViewModel, int>>()
      .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/SeguridadModulos"))
      .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<SeguridadRolesModulosViewModel, int>>()
      .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/SeguridadRolesModulos"))
      .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<DimensionesViewModel, int>>()
      .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Dimensiones"))
      .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<HeaderReportViewModel, int>>()
      .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Reportes"))
      .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<DevolucionSAP, int>>()
     .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Asientos"))
     .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<BitacoraErroresViewModel, int>>()
   .ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/BitacoraErrores"))
   .AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

  

            services.AddRefitClient<ICrudApi<BitacoraLoginViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/BitacoraLogin"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<RangosViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Rangos"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<RangosLoginViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/RangosLogin"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<SolicitudesViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Solicitudes"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<AprobacionesViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Aprobaciones"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<ProveedoresViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Proveedores"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<RegistroProveedoresViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/RegistroProveedores"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            services.AddRefitClient<ICrudApi<ParametrosViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Parametros"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();

            services.AddRefitClient<ICrudApi<ComprasViewModel, int>>()
.ConfigureHttpClient(c => c.BaseAddress = new Uri($"{Configuration["UrlWebApi"]}/api/Compras"))
.AddHttpMessageHandler<AuthenticatedHttpClientHandler>();


            return services;
        }
    }
}
