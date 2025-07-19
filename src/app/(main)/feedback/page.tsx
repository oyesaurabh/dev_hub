import React from "react";
import Header from "./feedbackComponent/Header";
import GetFeedbacks from "./feedbackComponent/GetFeedbacks";
import PageHead from "@/components/page-components/Pagehead";

const page = () => {
  return (
    <>
      <PageHead title="Feedback | Devhub" />
      <Header />
      <GetFeedbacks />
    </>
  );
};

export default page;
