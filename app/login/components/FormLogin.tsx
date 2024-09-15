'use client';
import React from "react";

export const FormLogin = () => {
  return (
    <form className="mt-10" method="POST">
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Ingrese su correo"
        autoComplete="email"
        required
        className="block w-full p-3 my-3 text-gray-800 border border-gray-100 focus:text-gray-500 focus:border-gray-200"
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Ingrese su clave"
        required
        className="block w-full p-3 my-3 text-gray-800 border border-gray-100 focus:text-gray-500 focus:border-gray-200"
      />

      <button
        type="submit"
        className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        Ingresar
      </button>
    </form>
  );
};
