"use client";
import { AuthWrapper } from "./auth-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { emailVerification } from "@/actions/verify-email";
import FormError from "./form-error";
import FormSuccess from "./form-success";

export const EmailVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) return;
    emailVerification(token as string)
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess(result.success);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [token]);

  return (
    <AuthWrapper
      headerLabel="Verify your email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {!success && error && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </AuthWrapper>
  );
};
