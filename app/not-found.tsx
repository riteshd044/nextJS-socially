import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-lg">
        
        {/* Big 404 */}
        <h1 className="text-7xl font-bold tracking-tight mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          ← Go back home
        </Link>

        {/* Extra subtle text */}
        <p className="mt-6 text-xs text-muted-foreground">
          Error code: 404 | Lost in space 🚀
        </p>
      </div>
    </div>
  );
}