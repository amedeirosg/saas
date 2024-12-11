import { supabase } from "@/db/supabaseClient";

export const fetchRC = async (setRcs) => {
  const { data, error } = await supabase.from("rc").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error.message);
    return [];
  }

  setRcs(data);
};

export const fetchRCByNumber = async (rcnum) => {
  const { data, error } = await supabase
    .from("rc")
    .select("*")
    .eq("rcnum", rcnum);

  if (error) {
    console.error("Erro ao buscar dados:", error.message);
    return null;
  }

  return data;
};

export const fetchRCLineByRCNum = async (rcnum) => {
  const { data, error } = await supabase
    .from("rcline")
    .select("*")
    .eq("rcnum", rcnum);

  if (error) {
    console.error("Erro ao buscar dados:", error.message);
    return null;
  }

  return data;
};
