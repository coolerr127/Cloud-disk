import React from "react";
import { useUserStore } from "../../stores/user.store";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  const { currentUser } = useUserStore();

  return <div>Hello {currentUser?.firstName}</div>;
};

export default MainPage;
