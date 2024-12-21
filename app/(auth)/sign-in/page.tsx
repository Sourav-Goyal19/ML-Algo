import { Button } from "@/components/ui/button";
import AuthForm from "./components/auth-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#111827] to-[#0b0f19] min-h-screen flex flex-col w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-white">
        Sign Into Your Account
      </h1>
      <AuthForm />
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="bg-white/5 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-300 hover:opacity-80 transition-all duration-300 py-5 px-8 rounded-md shadow-lg"
        >
          <Link href="/" className="w-full flex">
            <ArrowLeft size={20} />
            <span className="ml-2">Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
