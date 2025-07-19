import Header from "./notificationComponent/Header";
import GetNotification from "./notificationComponent/GetNotification";
import PageHead from "@/components/page-components/Pagehead";

const page = () => {
  return (
    <>
      <PageHead title="Notifications | Devhub" />
      <Header />
      <GetNotification />
    </>
  );
};

export default page;
