import { cn } from "@/lib/utils";
import Navbar from "./components/navbar";
import { Urbanist } from "next/font/google";

const font = Urbanist({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "py-4 bg-[#0b0f19] min-h-screen w-full pt-28 px-4 lg:px-6 text-gray-200",
        font.className
      )}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
