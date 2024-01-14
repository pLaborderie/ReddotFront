import { json } from "@remix-run/node";
import {
    useLoaderData,
  } from "@remix-run/react";

export const loader = async ({ params }) => {
    const res = await fetch(`https://localhost:3000/posts/${params.postId}`);
    return json(await res.json());
}

export default function Post() {
    const post = useLoaderData();
    return (
        <>
            <h1>{post.title} By {post.author}</h1>
            
            <p>{post.content}</p>
            <p>Score - {post.score}</p>
        </>
    )
}