import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  author_id: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  isFeatured: boolean;
  status: string;
  tags?: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Try to create a snippet from content
  // Remove HTML tags for snippet if needed, or just slice
  const snippet = post.content
    ? post.content.replace(/<[^>]*>?/gm, "").slice(0, 120) + "..."
    : "";

  // Format date in a way that avoids hydration errors (or we can use suppressHydrationWarning)
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blogs/${post.id}`}>
      <Card className="group h-full overflow-hidden flex flex-col transition-all hover:shadow-lg dark:hover:shadow-primary/5 hover:-translate-y-1 duration-300">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
              <span className="text-sm font-medium">No Image</span>
            </div>
          )}
          {post.isFeatured && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                Featured
              </span>
            </div>
          )}
        </div>

        <CardHeader className="flex-none p-5 pb-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span suppressHydrationWarning>{date}</span>
            <span>•</span>
            <span>{post.views} views</span>
          </div>
          <h3 className="font-semibold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 p-5 pt-3">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {snippet}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {tag}
            </span>
          ))}
        </CardFooter>
        {/* read more button */}
      </Card>
    </Link>
  );
}
