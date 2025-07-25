import React from "react";
import { FaGithub } from "react-icons/fa";

const GithubStar = () => {
  return (
    <div className="rounded-xl p-6 w-full max-w-md border border-zinc-700 transition-all duration-300">
      <h2 className="text-xl font-semibold text-center mb-3">
        Star us on GitHub
      </h2>
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/oyesaurabh/dev_hub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2.5 px-3 select-none bg-zinc-100 hover:bg-zinc-300 w-full rounded-xl text-black justify-center transition-colors duration-200"
        >
          <FaGithub className="text-lg" />
          <span>Star on GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default GithubStar;
