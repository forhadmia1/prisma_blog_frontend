"use client";

import { Button } from "@/components/ui/button";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return (
    <div>
      <h1>{error.message}</h1>
      <Button onClick={reset}>reset</Button>
    </div>
  );
}
