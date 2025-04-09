import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;   
const API = import.meta.env.VITE_SUPABASE_API_KEY;          

if (!URL || !API) {
  throw new Error("Supabase URL or API key is not defined in environment variables.");
}

export const supabase = createClient(URL, API)