import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface AuthCardProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const AuthCard = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: AuthCardProps) => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
       <CardFooter>
         <BackButton href={backButtonHref} label={backButtonLabel}/>
        </CardFooter>
    </Card>
  );
};
