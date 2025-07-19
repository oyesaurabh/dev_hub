"use client";
import { PageHead } from "@/components/page-components";
import GetPosts from "./component/GetPosts";
import HomeHeader from "./component/HomeHeader";

const page = () => {
  return (
    <>
      <PageHead title="Home | Devhub" description="homepage for devhub" />
      <div className=" flex flex-col w-full">
        <HomeHeader />
        <GetPosts />
      </div>
    </>
  );
};

export default page;
