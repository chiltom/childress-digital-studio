# Project Setup

## Application Creation

<p>First, create the React app with Vite.</p>

```bash
npm create vite@latest
```

<p>
Here, I used Vite instead of Create React App (CRA) because Vite is built on top of ESBuild, which is much more efficient than Webpack which CRA is built on. Additionally, Vite has built in support for many different frameworks and JavaScript or TypeScript right from the start.
</p>

## Dependency Installation and Configuration

### TailwindCSS + ShadCN

<p>
The next step is installing and configuring TailwindCSS and ShadCN to bring some pre-built components and utility CSS classes to the application.
</p>

Run the following commands to install TailwindCSS and its dependencies, and afterwards generate the `tailwind.config.js` and `postcss.config.cjs` files:

```bash
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

The following headers need to be added to the main css file, `src/index.css` in our case:

```ts
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then, configure the tailwind template paths in `tailwind.config.js`:

```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

After this, the `tsconfig.json` and `tsconfig.app.json` files must be updated because the compiler needs to know where the aliases point to from ShadCN component source code:

```json
// tsconfig.json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

The `vite.config.ts` file also needs to be updated with the alias, but a package must be installed first so the app can resolve paths without error:

```bash
npm i -D @types/node
```

```ts
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Finally, the ShadCN setup command can be run:

```bash
npx shadcn@latest init
```

_Note: Now, you can start adding components to the project like the example below. These components will be added to the `components/ui` folder and can be referenced from anywhere else in the source code._

```bash
npx shadcn@latest add button
```

### React Router DOM

<p>
React Router DOM is a useful package that links components to different endpoints within the application, enabling the Single Page Application (SPA).
</p>

To install, run the following commands:

```bash
npm install react-router-dom
# If using TypeScript
npm install @types/react-router-dom
```

Next, create a `BrowserRouter` in a new `src/router.tsx` file like so:

```ts
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
```

Now, you must update `src/main.tsx` to use newly created `router` for navigation:

```ts
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
```

And finally, update `App.tsx` to use the BrowserRouter outlet:

```ts
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./App.css";

function App(): ReactElement {
  return (
    <>
      <Container className="app px-4" fluid>
        <Row>
          <Outlet />
        </Row>
      </Container>
    </>
  );
}

export default App;
```
