import { Loader2Icon, LoaderIcon } from "lucide-react";

import { cn } from "@/libraries/utils/tailwind";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      role="status"
      {...props}
    />
  );
}

function Spinner2({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      role="status"
      {...props}
    />
  );
}

export { Spinner, Spinner2 };
