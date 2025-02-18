import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-dvh flex justify-center items-center" >
      <LoginForm />
    </main>
  );
}
