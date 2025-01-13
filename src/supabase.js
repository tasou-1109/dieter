import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// デバッグ用のコンソールログを詳細に
// console.log("Supabase URL:", supabaseUrl);
// console.log(
//   "Supabase Anon Key:",
//   supabaseAnonKey
//     ? `exists (first 5 chars: ${supabaseAnonKey.substring(0, 5)}...)`
//     : "missing"
// );
// console.log("Environment:", process.env.NODE_ENV);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // セッションの永続化
    detectSessionInUrl: true, // URLからのセッション検出
  },
});
