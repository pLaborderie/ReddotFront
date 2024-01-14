import { json } from "@remix-run/node";
import {
    useLoaderData,
  } from "@remix-run/react";

import PostList from '../components/PostList';

export const loader = async () => {
    const res = await fetch("https://localhost:3000/posts")
    return json(await res.json());
}

export default function Index() {
    const posts = useLoaderData();
    return <PostList posts={posts} />;
}