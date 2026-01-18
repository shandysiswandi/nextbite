import { Card, CardAction, CardContent, CardHeader } from "@/ui/base/card";
import { Skeleton } from "@/ui/base/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="py-4">
          <CardHeader className="gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
            <CardAction>
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
            <CardAction>
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
            <CardAction>
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
            <CardAction>
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
          <CardAction>
            <Skeleton className="h-8 w-20" />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
