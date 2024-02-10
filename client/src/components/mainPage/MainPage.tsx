import { Button } from "@mui/material";
import React from "react";
import { useUserStore } from "../../stores/user.store";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const { currentUser, userLogout } = useUserStore();

  const logout = () => userLogout();

  return (
    <div>
      Hello {currentUser?.firstName}
      <Button variant="text" onClick={logout}>
        Exit
      </Button>
    </div>
  );
};

export default MainPage;
