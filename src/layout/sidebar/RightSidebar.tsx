"use client";

import FeedbackForm from "@/components/FeedbackForm";
import SuggestedUsers from "@/components/page-components/SuggestedUsers";
import GithubStar from "@/components/page-components/GithubStar";

const RightSidebar = () => {
  return (
    <section className="flex flex-col gap-4 my-4 w-full">
      <SuggestedUsers />
      <FeedbackForm />
      <GithubStar />
    </section>
  );
};

export default RightSidebar;
