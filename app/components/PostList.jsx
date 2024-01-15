import { Link } from '@remix-run/react';

export default function PostList({ posts }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link to={`/posts/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p>
                {post.author}
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p>
                <time dateTime={post.date}>{post.date}</time>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
