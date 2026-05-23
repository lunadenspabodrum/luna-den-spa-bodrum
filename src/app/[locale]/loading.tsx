export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
        <div className="space-y-6">
          <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-10 w-full max-w-xl animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full max-w-md animate-pulse rounded-md bg-muted" />
          <div className="h-28 w-full max-w-3xl animate-pulse rounded-2xl bg-muted" />
        </div>
      </section>
    </div>
  );
}
