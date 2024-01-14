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
          <h1 className="text-3xl font-bold underline">
            Welcome to Reddot!
          </h1>
          <a href="/">Home</a>
          &nbsp;
          <a href="/posts/new">Create a post</a>
          <Outlet />
  
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  