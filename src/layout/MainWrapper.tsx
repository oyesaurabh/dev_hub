import MobileMenu from "@/layout/sidebar/MobileMenu";
import MobileNavbar from "@/layout/sidebar/MobileNavbar";
import LeftSidebar from "@/layout/sidebar/LeftSidebar";
import RightSidebar from "@/layout/sidebar/RightSidebar";
import PostButton from "@/components/page-components/PostButton";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex justify-center lg:w-[1200px] w-full mx-auto h-screen gap-4 overflow-visible">
        <div className="lg:w-[17%] md:w-[25%] w-full h-full hidden md:block md:pl-4">
          <LeftSidebar />
        </div>
        <div className="relative lg:w-[53%] md:w-full w-full md:border-x md:border-zinc-700 overflow-y-auto overflow-x-visible scrollbar-hide">
          <PostButton />
          {children}
        </div>
        <div className="lg:w-[30%] pr-4 w-full h-full overflow-y-auto overflow-x-visible scrollbar-hide md:hidden hidden lg:hidden xl:block">
          <RightSidebar />
        </div>
      </main>
      <MobileNavbar />
      <MobileMenu />
    </>
  );
};

export default MainWrapper;
