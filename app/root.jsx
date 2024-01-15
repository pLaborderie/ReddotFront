import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  json,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect, useState } from 'react';
import { createBrowserClient, createServerClient } from '@supabase/auth-helpers-remix';

import Navbar from './components/Navbar';
import stylesheet from "./tailwind.css";

export const links = () => [
{ rel: 'stylesheet', href: stylesheet }
];

export const loader = async ({ request }) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  }

  const response = new Response();

  const supabase = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    request,
    response,
  });

  const { data: { session } } = await supabase.auth.getSession();

  return json({ env, session }, { headers: response.headers });
}

export default function App() {
  const { env, session } = useLoaderData();
  const { revalidate } = useRevalidator();

  const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY));

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidate(); // server and client are out of sync
      }
    });

    return () => { subscription.unsubscribe() };
  }, [serverAccessToken, supabase, revalidate]);

  return (
    <html className="min-h-full bg-white">
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-full">
        <Navbar session={session} supabase={supabase} />
        <div className="container mx-auto">
          <Outlet context={{ supabase }} />
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
