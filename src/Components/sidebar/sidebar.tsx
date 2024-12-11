"use client";
import { supabase } from "@/db/supabaseClient";
import {
  Clipboard,
  BookCheckIcon,
  BaggageClaimIcon,
  Building2,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      icon: <Clipboard />,
      label: "Requisição de compra",
      path: "/requisicao-de-compra",
    },
    {
      id: 2,
      icon: <BookCheckIcon />,
      label: "Ordens de Compra",
      path: "/ordens-de-compra",
    },
    {
      id: 3,
      icon: <BaggageClaimIcon />,
      label: "Inventário",
      path: "/inventario",
    },
    {
      id: 4,
      icon: <Building2 />,
      label: "Empresas",
      path: "/empresas",
    },
  ];

  const handleClick = (id: number, path: string) => {
    setSelectedIndex(id);
    router.push(path);
  };

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <div>
      <div className="w-[17rem] h-[100dvh] bg-blueDark flex flex-col justify-between">
        <div className="flex flex-col items-center gap-6">
          <h3 className="mt-4 text-white font-medium">Bem-vindo(a), André!</h3>
          <div className="flex flex-col  w-full ">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`flex gap-2 text-white cursor-pointer px-4 py-4 ${
                  selectedIndex === item.id ? "bg-blueLight" : ""
                }`}
                onClick={() => handleClick(item.id, item.path)}
              >
                {item.icon}
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
        <div
          className="text-white w-full flex mb-8 justify-center items-center gap-2 cursor-pointer bg-blueLight p-2 hover:bg-blue"
          onClick={handleLogOut}
        >
          <h4>Sair</h4>
          <LogOut />
        </div>
      </div>
    </div>
  );
}
