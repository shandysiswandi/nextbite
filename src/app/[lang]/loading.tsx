export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
