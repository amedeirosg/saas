"use client";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { supabase } from "@/db/supabaseClient";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const session = useAuth();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Erro ao fazer login", error);
      setError(error.message);
    } else {
      console.log("Login feito com sucesso!", data);
    }
  };

  const handlePasswordReset = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Email de recuperação enviado! Verifique sua caixa de entrada"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] -mt-20">
      <div className="flex flex-col justify-center items-center gap-6">
        <Image src={logo} alt="logo"></Image>
        <h1 className="text-blueDark">ReqSmart</h1>
        <h2 className="text-blue">
          Simplificando a requisição, otimizando a aquisição.
        </h2>
        <h3 className="text-blueLight">Boas-vindas</h3>
        <div className="flex flex-col gap-4 w-[70%]">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 focus:outline-none focus:border-greenDark"
            placeholder="Insira seu e-mail"
            type="text"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 focus:outline-none focus:border-greenDark"
            placeholder="Insira sua senha"
            type="password"
          ></input>
        </div>
        <button
          onClick={handleLogin}
          className="p-2 bg-greenLight text-white font-medium w-[70%] hover:bg-greenDark transition-all duration-200"
        >
          Acessar
        </button>
        <h4
          onClick={handlePasswordReset}
          className="text-blueLight underline cursor-pointer"
        >
          Esqueceu sua senha?
        </h4>
      </div>
    </div>
  );
}
