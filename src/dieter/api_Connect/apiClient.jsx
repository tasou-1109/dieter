import { supabase } from "../../supabase";

export const apiClient = {
  delete: async (table, condition) => {
    return await supabase.from(table).delete().match(condition);
  },
  insert: async (table, data) => {
    return await supabase.from(table).insert(data);
  },
  select: async (table, condition) => {
    return await supabase.from(table).select().match(condition);
  },
  update: async (table, updates, condition) => {
    return await supabase.from(table).update(updates).match(condition);
  },
  signUp: async (email, password, options) => {
    return await supabase.auth.signUp({
      email,
      password,
      options,
    });
  },
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getUser: async () => {
    return await supabase.auth.getUser();
  },
  getSession: async () => {
    return await supabase.auth.getSession();
  },
};
