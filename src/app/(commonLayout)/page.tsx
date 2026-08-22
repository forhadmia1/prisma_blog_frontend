import { getBlogPosts } from "@/actions/blog.actions";
import { BlogCard, BlogPost } from "@/components/modules/blog/blog-card";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  const res = await getBlogPosts({
    isFeatuerd: undefined,
    search: "",
    page: 1,
    limit: 10,
    status: undefined,
  });

  console.log(res);

  // Extract posts from the response, assuming it might be nested in a 'data' property
  const posts: BlogPost[] = res?.data?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-zinc-950 py-24 px-6 md:px-12 border-b dark:border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome to Our <span className="text-primary">Blog</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
            Discover the latest stories, tutorials, and insights from our team.
            We cover web development, design, and everything in between.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <main
        id="latest-posts"
        className="flex-1 w-full max-w-7xl mx-auto py-16 px-6 md:px-12"
      >
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Latest Posts
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-zinc-500 dark:text-zinc-400">
              <p className="text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
