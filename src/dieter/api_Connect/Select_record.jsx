import { supabase } from "../../supabase";

export const Select_record = async (user_name) => {
  try {
    const { data, error } = await supabase
      .from("record")
      .select("*")
      .eq("user_name", user_name)
      .order("day", { ascending: false })
      .limit(14);

    return data;
  } catch (error) {
    alert(error.message);
  }
};
