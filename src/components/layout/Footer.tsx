import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter">MyBlog App</span>
        </div>

        <nav className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="text-sm text-zinc-500 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} MyBlog App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
