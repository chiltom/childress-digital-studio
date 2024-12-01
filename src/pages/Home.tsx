import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const Home: React.FC = (): ReactElement => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-4 bg-card text-card-foreground shadow rounded-xl border">
        <h1 className="text-2xl font-bold">
          Welcome to Custom Site Solutions!
        </h1>
        <p className="mt-2">
          Build fast, responsive, and modern websites with React and
          TailwindCSS.
        </p>
        <Button variant="default">Get Started</Button>
        <Button variant="default" onClick={toggleTheme}>
          {" "}
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </div>
    </div>
  );
};

export default Home;
