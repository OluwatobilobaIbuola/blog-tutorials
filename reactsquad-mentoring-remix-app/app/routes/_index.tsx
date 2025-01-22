import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const usersApi = "https://jsonplaceholder.typicode.com/users";

export const loader = async ({}: LoaderFunctionArgs) => {
  const res = await fetch(usersApi);
  if (!res) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const unwrapRes = await res.json();
  return { response: unwrapRes };
};

export default function Index() {
  const { response } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
        </header>
        <div>
          {response?.map((user: any) => (
            <Link to={`user/${user?.id}`}>
              <p>{user.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
