import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = "https://aelamqkxybedexzigjni.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbGFtcWt4eWJlZGV4emlnam5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNzY3MTQsImV4cCI6MjAzMjk1MjcxNH0.jcdc3GwjEobF3bcpsU6hGHcRPqoaKKz5-Mkfo8HA2Lc";

export const supabase = createClient(supabaseUrl, supabaseKey);
