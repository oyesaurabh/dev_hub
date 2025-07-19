"use client";
import React from "react";
import CreatePost from "./postComponents/CreatePost";
import Header from "./postComponents/Header";
import PageHead from "@/components/page-components/Pagehead";
const page = () => {
  return (
    <>
      <PageHead
        title="Create Post / Cuez"
        description="Create a new post on Cuez"
      />
      <Header title="Create Post" />
      <CreatePost />
    </>
  );
};

export default page;
