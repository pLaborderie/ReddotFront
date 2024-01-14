import { json } from "@remix-run/node";
import {
    useLoaderData,
  } from "@remix-run/react";

export const loader = async () => {
    const res = await fetch("https://localhost:3000/posts")
    return json(await res.json());
}

export default function Index() {
    const posts = useLoaderData();
    return (
        <ul>
          {posts.map(post => (
            <li><a href={`/posts/${post.id}`}>{post.title} by {post.author} - {post.date}</a></li>
          ))}
        </ul>
    )
}