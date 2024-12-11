"use client";
import { ChevronUp, CirclePlus, FilePlus } from "lucide-react";
import { supabase } from "@/db/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { fetchRC, fetchRCLineByRCNum } from "@/functions/functions";
import { AppContext } from "@/context/context";

interface RCLine {
  line: number;
  item: number;
  centro_de_custo: number;
  total: number;
  custo_unitario: number;
  unidade_medida: string;
  quantidade: number;
  prazo_entrega_previsto: Date;
  descricao: string;
  rcnum: number;
}

export default function NewRC() {
  const [expandLine, setExpandLine] = useState(false);
  const [rcsLine, setRCSLine] = useState<RCLine[]>();

  const { resultRC } = useContext(AppContext);
  const rcData = resultRC.map((rc) => {
    return rc.rcnum;
  });

  useEffect(() => {
    const fetchRCLine = async () => {
      const res = await fetchRCLineByRCNum(rcData);
      setRCSLine(res);
    };
    fetchRCLine();
  }, []);

  return (
    <div className="mt-8 w-full mr-8">
      <div className="flex flex-col gap-6 items-start">
        <div className="flex gap-4 items-center ">
          <button className="flex gap-2 bg-greenLight p-2 text-white font-medium hover:bg-green transition-all duration-200">
            Nova RC
            <CirclePlus />
          </button>
          <h3>Alterar status</h3>
        </div>
        <div>
          {resultRC.map((res, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <div className="flex gap-2">
                <h3 className="font-medium">RC:</h3>
                <h3>{res.rcnum}</h3>
              </div>

              <div className="flex gap-2">
                <h3 className="font-medium">Fornecedor:</h3>
                <h3>{res.fornecedor}</h3>
              </div>
              <div className="flex gap-2">
                <h3 className="font-medium">CNPJ:</h3>
                <h3>{res.cnpj}</h3>
              </div>
              <div className="flex gap-2">
                <h3 className="font-medium">Data da requisição:</h3>
                <h3>{res.data_requisicao}</h3>
              </div>
              <div className="flex gap-2">
                <h3 className="font-medium">Status:</h3>
                <h3>{res.status}</h3>
              </div>
              <div className="flex gap-2">
                <h3 className="font-medium">Solicitante:</h3>
                <h3>{res.solicitante}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="flex gap-2 bg-[rgba(0,0,0,0.32)] p-2 text-white font-medium ">
          Criar OC
          <CirclePlus />
        </button>
        <div className="w-full flex flex-col gap-4">
          <h4 className="font-bold">Pedidos</h4>
          <table className="min-w-full border-collapse  ">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left border p-2">Linha</th>
                <th className="text-left border p-2">Item</th>
                <th className="text-left border p-2">Centro de Custo</th>
                <th className="text-left border p-2">Total</th>
                <th className="text-left border p-2">Custo unitário</th>
              </tr>
            </thead>
            <tbody>
              {rcsLine?.map((rcLine, index) => (
                <tr key={index}>
                  <td className="text-left border p-2">
                    {rcLine.line ? parseInt(rcLine.line, 10) : 0}
                  </td>
                  <td className="text-left border p-2">
                    {rcLine.item ? parseInt(rcLine.item, 10) : 0}
                  </td>
                  <td className="text-left border p-2">
                    {rcLine.centro_de_custo
                      ? parseInt(rcLine.centro_de_custo, 10)
                      : 0}
                  </td>
                  <td className="text-left border p-2">
                    {rcLine.total ? parseFloat(rcLine.total, 10) : 0}
                  </td>
                  <td className="text-left border p-2 flex justify-between">
                    {rcLine.custo_unitario
                      ? parseFloat(rcLine.custo_unitario, 10)
                      : 0}
                    <ChevronUp
                      className={`cursor-pointer transition-all duration-200 ${
                        expandLine ? "rotate-180" : ""
                      }`}
                      onClick={() => {
                        setExpandLine(!expandLine);
                        console.log(!expandLine);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div
              className={`transition-transform duration-500 transform origin-top ${
                expandLine ? "scale-y-100" : "scale-y-0"
              } flex p-4 flex-col gap-6 bg-gray-200 rounded`}
            >
              <h3 className="font-bold">Detalhes</h3>
              {rcsLine?.map((rcLine, index) => (
                <div key={index} className="flex gap-[40rem]">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <h4 className="font-medium">Linha:</h4>
                      <h4 className="font-normal">
                        {rcLine.line ? parseInt(rcLine.line, 10) : 0}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Item:</h4>
                      <h4 className="font-normal">
                        {rcLine.item ? parseInt(rcLine.item, 10) : 0}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Descrição:</h4>
                      <h4 className="font-normal">{rcLine.descricao}</h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Unidade de Medida:</h4>
                      <h4 className="font-normal">{rcLine.unidade_medida}</h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Custo Unitário:</h4>
                      <h4 className="font-normal">
                        {rcLine.custo_unitario
                          ? parseFloat(rcLine.custo_unitario, 10)
                          : 0}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Total:</h4>
                      <h4 className="font-normal">
                        {rcLine.total ? parseFloat(rcLine.total, 10) : 0}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Quantidade:</h4>
                      <h4 className="font-normal">
                        {rcLine.quantidade
                          ? parseInt(rcLine.quantidade, 10)
                          : 0}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <div className="flex gap-2">
                      <h4 className="font-medium">
                        Prazo de entrega previsto:
                      </h4>
                      <h4 className="font-normal">
                        {rcLine.prazo_entrega_previsto}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="font-medium">Centro de custo:</h4>
                      <h4 className="font-normal">
                        {rcLine.centro_de_custo
                          ? parseInt(rcLine.centro_de_custo, 10)
                          : 0}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex gap-2 bg-greenLight p-2 text-white font-medium hover:bg-green transition-all duration-200 ">
              Nova linha <FilePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
