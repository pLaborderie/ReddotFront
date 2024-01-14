import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";
  
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
          <h1>Welcome to Reddot!</h1>
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
  