"use server";

import { BlogService } from "@/services/blog.service";

export const getBlogPosts = async (query: {
  isFeatuerd: boolean | undefined;
  search: string;
  page: number;
  limit: number;
  status: string | undefined;
}) => {
  return await BlogService.getBlogPosts(query);
};
