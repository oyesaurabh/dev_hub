"use client";

const NoProfilePosts = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 text-zinc-400">
      <h3 className="text-xl font-medium mb-2 text-center">
        No Posts Available
      </h3>
      <p className="text-sm text-zinc-500 text-center">
        There&apos;s nothing to see here at the moment!
      </p>
    </div>
  );
};

export default NoProfilePosts;
