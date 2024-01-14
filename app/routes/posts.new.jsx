import {
    Form,
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
    console.log(result);
    return result;
}

export default function NewPost() {
    return (
        <Form method="post">
            <h2>Create post</h2>
            <p>
                <label>
                    Author:
                    <input name="author" type="text" />
                </label>
            </p>
            <p>
                <label>
                    Title:
                    <input name="title" type="text" />
                </label>
            </p>
            <p>
                <label>
                    Content:
                    <br />
                    <textarea name="content" />
                </label>
            </p>
            <button type="submit">Create</button>
        </Form>
    )
}