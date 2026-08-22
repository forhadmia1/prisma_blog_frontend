import { env } from "@/env";

type Query = {
  search?: string;
  isFeatuerd?: boolean;
  status?: string;
  page?: number;
  limit?: number;
};

type Options = {
  cache?: RequestCache;
  revalidate?: number;
};

export const BlogService = {
  getBlogPosts: async function (query: Query, options?: Options) {
    try {
      const url = new URL(`${env.API_URL}/post`);

      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url, config);
      return await res.json();
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },

  getSingleBlogPost: async function (id: string, options?: Options) {
    try {
      const url = new URL(`${env.API_URL}/post/${id}`);

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url, config);
      return await res.json();
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },
};
