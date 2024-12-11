"use client";
import { useRouter } from "next/navigation";
import { CirclePlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { fetchRC, fetchRCByNumber } from "@/functions/functions";
import { AppContext } from "@/context/context";

interface RC {
  rcnum: number;
  descricao: string;
  fornecedor: string;
  status: string;
  cnpj: string;
  data_requisicao: string;
  solicitante: string;
}

export default function RC() {
  const router = useRouter();
  const [rcs, setRcs] = useState<RC[]>();
  const { resultRC, setResultRC } = useContext(AppContext);
  useEffect(() => {
    fetchRC(setRcs);
  }, []);

  return (
    <div className="mt-8 w-full mr-8 ">
      <div className="flex flex-col items-start gap-6 w-full ">
        <div>
          <h2 className="font-medium">Requisições de compra</h2>
        </div>
        <button
          onClick={() => router.push("/requisicao-de-compra/nova-rc")}
          className="flex gap-2 bg-greenLight p-2 text-white font-medium hover:bg-green transition-all duration-200"
        >
          Nova RC
          <CirclePlus />
        </button>
        <table className="min-w-full border-collapse ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left ">RC</th>
              <th className="border p-2 text-left ">Descrição</th>
              <th className="border p-2 text-left ">Empresa</th>
              <th className="border p-2 text-left ">Status</th>
            </tr>
          </thead>
          <tbody>
            {rcs &&
              rcs.map((rc: any, index: any) => (
                <tr key={index}>
                  <td
                    className="border p-2 text-left max-w-[1rem] cursor-pointer bg-gray-50"
                    onClick={async () => {
                      const result = await fetchRCByNumber(rc.rcnum);
                      setResultRC(result);
                      router.push("/requisicao-de-compra/nova-rc");
                    }}
                  >
                    {rc.rcnum}
                  </td>
                  <td className="border p-2 text-left max-w-[1rem]">
                    {rc.descricao}
                  </td>
                  <td className="border p-2 text-left max-w-[1rem]">
                    {rc.fornecedor}
                  </td>
                  <td className="border p-2 text-left max-w-[1rem]">
                    {rc.status}
                  </td>
                </tr>
              ))}
            {/* <td className="border p-2 text-left max-w-[1rem]">554</td>
              <td className="border p-2 text-left max-w-[5rem] ">
                AQUISIÇÃO DE CARRINHO PARA TRANSPORTE DE MATERIAIS
              </td>
              <td className="border p-2 text-left max-w-[1rem]">
                Depósito Iskinão
              </td>
              <td className="border p-2 text-left ">INSERIDO</td> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
