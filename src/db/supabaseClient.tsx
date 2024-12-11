import { createClient, Session } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = "https://ewucuqtxxmmiixouyzbm.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3dWN1cXR4eG1taWl4b3V5emJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MzM1MTksImV4cCI6MjA0OTQwOTUxOX0._roBERsqpi4PIW4vMKORZlhPWCyPm7ZslJeS-hBjFB8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
