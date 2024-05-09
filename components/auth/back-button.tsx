import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button size="sm" className="w-full" asChild variant="link">
      <Link href={href} className="w-full">
        {label}
      </Link>
    </Button>
  );
};
