import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";

const usersApi = "https://jsonplaceholder.typicode.com/users";
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch(`${usersApi}/${params.userId}`);
  if (!res) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const unwrapRes = await res.json();
  return { response: unwrapRes };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = request.formData();
  const intent = (await formData).get("intent");
  switch (intent) {
    case "update": {
      await fetch(`${usersApi}/${params.userId}`, {
        method: "PATCH",
      });
      return redirect("/");
    }
    case "delete": {
      await fetch(`${usersApi}/${params.userId}`, {
        method: "DELETE",
      });
      return redirect("/");
    }
  }
};

export default function User() {
  const { response } = useLoaderData<typeof loader>();

  return (
    <>
      <Link to="/">Go back</Link>
      <div className="min-h-screen flex items-center justify-center flex-col">
        {response?.name}

        <Form method="post">
          <input type="hidden" name="intent" value="update" />
          <button type="submit">Update</button>
        </Form>
        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <button type="submit">Delete</button>
        </Form>
      </div>
    </>
  );
}
