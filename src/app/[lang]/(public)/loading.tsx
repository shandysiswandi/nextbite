export default function Loading() {
  return (
    <div className="space-y-12 pt-10 pb-12">
      <section className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-md bg-muted/60" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted/40" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted/40" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-32 animate-pulse rounded-xl bg-muted/50" />
        <div className="h-32 animate-pulse rounded-xl bg-muted/50" />
        <div className="h-32 animate-pulse rounded-xl bg-muted/50" />
      </section>

      <section className="space-y-3">
        <div className="h-6 w-40 animate-pulse rounded-md bg-muted/50" />
        <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
      </section>
    </div>
  );
}
