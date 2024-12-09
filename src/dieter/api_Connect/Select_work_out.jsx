import { supabase } from "../../supabase";

export const Select_work_out = async (user_name) => {
  try {
    const { data, error } = await supabase
      .from("workout_menu")
      .select("*")
      .eq("user_name", user_name);

    console.log(data);
    return data;
  } catch (error) {
    alert(error.message);
  }
};
