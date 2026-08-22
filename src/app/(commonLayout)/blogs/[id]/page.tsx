import { BlogService } from "@/services/blog.service";
import Image from "next/image";
import { BlogPost } from "@/components/modules/blog/blog-card";
import { CalendarIcon, EyeIcon } from "lucide-react";

export default async function BlogPages({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await BlogService.getSingleBlogPost(id);

  const post: BlogPost = res?.data;

  if (!post) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-3xl font-bold">Blog post not found</h1>
      </div>
    );
  }

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="space-y-6 mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h1>

        <div className="flex items-center justify-center md:justify-start gap-6 text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={post.createdAt} suppressHydrationWarning>
              {date}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4" />
            <span>{post.views} views</span>
          </div>
          {post.isFeatured && (
            <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80">
              Featured
            </span>
          )}
        </div>
      </header>

      {post.thumbnail && (
        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden bg-muted shadow-lg">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-300">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-transparent bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  const res = await BlogService.getBlogPosts({ limit: undefined });
  const posts = res?.data?.data;
  return posts.map((post: BlogPost) => ({
    id: post.id,
  }));
}
