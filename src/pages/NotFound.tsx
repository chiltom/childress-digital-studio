import { ReactElement } from "react";

const NotFound: React.FC = (): ReactElement => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
