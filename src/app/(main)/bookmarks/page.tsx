import Header from "./bookmarkComponent/Header";
import GetBookmarks from "./bookmarkComponent/GetBookmarks";
import PageHead from "@/components/page-components/Pagehead";

const page = () => {
  return (
    <>
      <PageHead title="Bookmarks | Devhub" />
      <Header />
      <GetBookmarks />
    </>
  );
};

export default page;
