"use client";
import React, { useState, useTransition } from "react";
import { AuthWrapper } from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { resetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { login } from "@/actions/login";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  //useTransition Hook Manages the loading/success transition state (isPending) to visually indicate form submission progress (e.g., showing a loading spinner).
  const [isPending, startTransition] = useTransition();

  // setup react hook form with zod
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  // onsubmit function
  const onSubmit = (data: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <AuthWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/register"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      disabled={isPending}
                      placeholder="johndoe@mail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* form error */}
          <FormError message={error} />
          {/* form success */}
          <FormSuccess message={success} />
          {/* submit button */}
          <Button className="w-full" type="submit" disabled={isPending}>
            Send Reset Link
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
