import { ReactElement } from "react";

const Error: React.FC = (): ReactElement => {
  return (
    <div>
      <h1 className="text-red-500">Error</h1>
      <p className="text-red-500">An error has occurred somewhere</p>
    </div>
  );
};

export default Error;
