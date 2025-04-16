import { useEffect, useState } from "react";
import { supabase } from "../auth/client";
import ManageStudents from "../Dashboard/ManageStudents";

const ManageStudentsWrapper = ({ token }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user?.id) {
        console.error("Failed to fetch user from token:", error);
        return;
      }

      setUserId(data.user.id);
    };

    getUserId();
  }, [token]);

  if (!userId) {
    return <p>Loading...</p>; // Or a spinner
  }

  return <ManageStudents userId={userId} />;
};

export default ManageStudentsWrapper;
