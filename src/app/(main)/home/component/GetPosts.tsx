"use client";

import { useGetPosts } from "@/hooks";
import { PostStructure } from "@/components/page-components";
import { PostSkeleton } from "@/components/skeletons";
import { NoPost } from "@/components/not-available";
import { Post } from "@/types/Post";
import { Loader2 } from "lucide-react";

const GetPosts = () => {
  const { data, isLoading } = useGetPosts();

  if (isLoading)
    return (
      <section>
        {
          <div>
            <div className="flex flex-col">
              {Array.from({ length: 2 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
            <div className="flex flex-row items-center justify-center py-4">
              <Loader2 className="animate-spin text-gray-600" />
            </div>
          </div>
        }
      </section>
    );
  return (
    <>
      {data?.posts && data.posts.length > 0 ? (
        data.posts.map((post: Post) => (
          <PostStructure key={post._id} post={post} />
        ))
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default GetPosts;
