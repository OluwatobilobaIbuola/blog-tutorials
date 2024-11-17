"use client";
import React from "react";
import { UserAuthenticationPropsFromRedux } from "./user-authentication-container";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters long",
    })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

function UserAuthenticationComponent({
  isAuthenticating,
  login,
}: UserAuthenticationPropsFromRedux) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    login(values);
  };

  return (
    <div className="">
      <ToastContainer />
      <section className="bg-white bg-opacity-90 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg border  shadow dark:border mt-20 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        remember me
                      </label>
                    </div>

                    <Link
                      href="/password-reset"
                      className="text-sm font-medium pt-2 inline float-end text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className={`${isAuthenticating ? "bg-gray-500" : ""}`}
                    disabled={isAuthenticating}
                  >
                    {false ? "Loading..." : "Submit"}
                  </Button>
                  <div>
                    <p className="text-sm font-light text-black dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link
                        href="/signup/startup"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserAuthenticationComponent;
