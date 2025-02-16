﻿using Refit;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sicsoft.Checkin.Web.Servicios
{
     

    public interface ICrudApi<TEntity, TKey> where TEntity : class
    {
        //[Post("")]
        //Task<TEntity> Agregar<TCreate>([Body] TCreate payload) where TCreate : class;

        [Get("")]
        Task EnviarCorreo([Body] TEntity payload);


        [Post("")]
        Task<TEntity[]> AgregarBulk([Body] TEntity[] payload);

        [Post("")]
        Task<TEntity> Agregar([Body] TEntity payload);


        [Post("")]
        Task<TEntity> CambiarClave([Body] TEntity payload);

        [Get("")]
        Task<TEntity> Login(string email, string clave, string CedulaJuridica);


        [Get("")]
        Task<bool> VCierre(int idLogin, string Periodo, DateTime fechaCierre, string CodMoneda);
        [Get("/Compañias")]
        Task<TEntity[]> ObtenerCompañias(string email);

        [Get("/Listado")]
        Task<TEntity[]> ObtenerListaCompras<TQuery>(TQuery q);

        [Get("")]
        Task<TEntity[]> ObtenerLista<TQuery>(TQuery q);


        [Get("/Reenvio")]
        Task Reenvio(string code, string correos);

        [Get("")]
        Task<TEntity> ObtenerListaEspecial<TQuery>(TQuery q);

        [Get("")]
        Task<TEntity> ObtenerHeader<TQuery>(TQuery q);

        [Get("/Insertar")]
        Task<TEntity> InsertarAsiento(int idSolicitud);

        [Get("/RealizarLecturaEmail")]
        Task RealizarLecturaEmails();

        [Get("/LeerBandejaEntrada")]
        Task LecturaBandejaEntrada();




        [Get("/Consultar")]
        Task<TEntity> ObtenerPorId(int id);

        [Get("/Estado")]
        Task<TEntity> CambiaEstado(int id, string Estado, string comentario = "", int idLoginAceptacion = 0);

        [Post("/{id}")]
        Task GenerarMovimientos(int id);

        [Post("/Debitar")]
        Task Debitar(int id, string certificado, decimal monto);

        [Put("/Actualizar")]
        Task Editar([Body] TEntity payload);

        [Put("/ActualizarFacturaManual")]
        Task<TEntity> EditarFacturaManual([Body] TEntity payload);

        [Delete("/Eliminar")]
        Task EliminarInversion(string id);

        [Delete("/Eliminar")]
        Task Eliminar(int id);


        [Delete("/Eliminar")]
        Task EliminarUsuario(int id, string CedulaJuridica);

        [Delete("/Eliminar")]
        Task EliminarEjecutivo(int idEjecutivo);






    }
}
