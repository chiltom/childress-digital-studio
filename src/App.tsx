import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = (): ReactElement => {
  return (
    <div className="bg-background">
      <Outlet />
    </div>
  );
};

export default App;
