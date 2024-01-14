import {
    Form, redirect,
} from "@remix-run/react";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const newPost = {
        author: formData.get('author'),
        title: formData.get('title'),
        content: formData.get('content'),
        date: new Date().toISOString(),
    };
    console.log(newPost);
    const response = await fetch('https://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });
    const result = await response.json();
    throw redirect(`/posts/${result.id}`);
}

export default function NewPost() {
    return (
        <Form method="post" className="container mx-auto">
            <h2>Create post</h2>
            <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                Author
            </label>
            <div className="mt-2 mb-2">
                <input
                    type="text"
                    name="author"
                    id="author"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
            </label>
            <div className="mt-2 mb-2">
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mt-2 mb-2">
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                    Content
                </label>
                <textarea
                    rows={4}
                    name="content"
                    id="content"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
            </div>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Create
            </button>
        </Form>
    )
}