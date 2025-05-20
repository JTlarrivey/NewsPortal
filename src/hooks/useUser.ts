import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // ajustá el path si está en otro lado

// Import or define the User type from supabase if not already imported
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
      } else {
        setUser(data?.user || null);
      }
    };

    getUser();
  }, []);

  return { user };
}
