import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";

  import Navbar from './components/Navbar';

  import stylesheet from "./tailwind.css";

  export const links = () => [
    { rel: 'stylesheet', href: stylesheet }
  ];
  
  export default function App() {
    return (
      <html>
        <head>
          <link
            rel="icon"
            href="data:image/x-icon;base64,AA"
          />
          <Meta />
          <Links />
        </head>
        <body>
          <Navbar />
          <div className="mx-10">
            <Outlet />
          </div>
  
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  