import { json } from "@remix-run/node";
import {
    useLoaderData,
    useOutletContext,
  } from "@remix-run/react";
  import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'


export const loader = async ({ params }) => {
    const res = await fetch(`https://localhost:3000/posts/${params.postId}`);
    return json(await res.json());
}

export default function Post() {
    const post = useLoaderData();
    const { supabase } = useOutletContext();

    const vote = async (value) => {
        const { data: { session } } = await supabase.auth.getSession();
        const jwt = session?.access_token;
        await fetch(`https://localhost:3000/user-votes/${post.id}/vote/${value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt 
            }
        });
    };

    const upvote = async () => {
        await vote(1);
    };

    const downvote = async () => {
        await vote(-1);
    };

    const cancelVote = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const jwt = session?.access_token;
        await fetch(`https://localhost:3000/user-votes/${post.id}/vote`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt 
            }
        });
    }

    return (
        <>
            <h1 className="text-xl mb-4">{post.title} By {post.author}</h1>
            <p className="mb-4 whitespace-pre-line">{post.content}</p>
            <div className="flex flex-row">
                <ChevronUpIcon className="h-6 w-6 mr-2" onClick={upvote} />
                {post.score}
                <ChevronDownIcon className="h-6 w-6 ml-2" onClick={downvote} />
            </div>
        </>
    )
}