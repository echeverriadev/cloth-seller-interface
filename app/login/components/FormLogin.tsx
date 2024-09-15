"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const FormLogin = () => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('https://cloth-seller.vercel.app/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setLoginError(true);
        reset();
        setTimeout(() => {
          setLoginError(false);
        }, 5000);
      }

      const result = await response.json();
      localStorage.setItem('token', JSON.stringify(result.accessToken));
      reset();
      router.push('/sales');
    } catch (error) {
      console.log('Error en la autenticación', error);
    }
    setLoading(false);
  };

  return (
    <form className="mt-10" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Ingrese su correo"
        autoComplete="email"
        className="block w-full p-3 my-3 text-gray-800 border border-gray-100 focus:text-gray-500 focus:border-gray-200"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Ingrese su clave"
        className="block w-full p-3 my-3 text-gray-800 border border-gray-100 focus:text-gray-500 focus:border-gray-200"
      />
      {(errors.email || errors.password) && (
        <span className="text-red-500 text-xs">Necesitas ingresar tus credenciales</span>
      )}
      {loginError && <span className="text-red-500 text-xs">Error en la autenticación, ingresa de nuevo tus credenciales</span>}

      <button
        type="submit"
        className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
      >
        {loading ? 'Cargando...' : 'Ingresar'}
      </button>
    </form>
  );
};
