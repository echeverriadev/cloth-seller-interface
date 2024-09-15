import {FormLogin} from "./components";

export const metadata = {
  title: "Cloth Seller - Login",
  description: "Login page for day to day use",
};

export default function LoginPage() {
  return (
    <div
      className="flex flex-col  w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
    >
      <h1 className="text-center uppercase">Iniciar Sesión</h1>
      <FormLogin />
    </div>
  );
}
