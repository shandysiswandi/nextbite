export default function Loading() {
  return (
    <div className="w-full max-w-xs animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-6 w-32 rounded-md bg-muted/60" />
        <div className="h-4 w-48 rounded-md bg-muted/40" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted/40" />
          <div className="h-10 w-full rounded-md bg-muted/60" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted/40" />
          <div className="h-10 w-full rounded-md bg-muted/60" />
        </div>

        <div className="h-10 w-full rounded-md bg-muted/70" />
      </div>
    </div>
  );
}
