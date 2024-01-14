import { json } from "@remix-run/node";
import {
    useLoaderData,
  } from "@remix-run/react";
  import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'


export const loader = async ({ params }) => {
    const res = await fetch(`https://localhost:3000/posts/${params.postId}`);
    return json(await res.json());
}

export default function Post() {
    const post = useLoaderData();
    return (
        <>
            <h1 className="text-xl mb-4">{post.title} By {post.author}</h1>
            <p className="mb-4 whitespace-pre-line">{post.content}</p>
            <div className="flex flex-row"><ChevronUpIcon className="h-6 w-6 mr-2" /> {post.score} <ChevronDownIcon className="h-6 w-6 ml-2" /></div>
        </>
    )
}