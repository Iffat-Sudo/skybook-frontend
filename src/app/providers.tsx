"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { useState } from "react";
import { ApiError } from "@/lib/api/client";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              // 401, 404... are "client" errors: trying again won't help
              if (error instanceof ApiError && error.status < 500) return false;
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    // reducedMotion="user": if the user turned on "reduce motion" in their settings, animations are skipped
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}