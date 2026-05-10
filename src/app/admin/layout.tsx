import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignOutBtn from "./SignOutBtn";
import prisma from "@/lib/db";
import Link from "next/link";
import AdminNav from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== "titanverse27@gmail.com") {
    redirect("/");
  }

  const videoPendingCount = await prisma.testimonial.count({ where: { approved: false } });
  const webPendingCount = await prisma.webTestimonial.count({ where: { approved: false } });

  return (
    <div className="min-h-screen bg-[#111111] text-gray-100 font-inter">
      <nav className="border-b border-[#333] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/admin">
            <h1 className="text-lg md:text-xl font-outfit tracking-widest text-[#ffbb00] cursor-pointer hover:opacity-80 transition-opacity">ADMIN</h1>
          </Link>
          <AdminNav videoPendingCount={videoPendingCount} webPendingCount={webPendingCount} />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm opacity-60 hidden sm:inline">{user?.emailAddresses[0].emailAddress}</span>
          <SignOutBtn />
        </div>
      </nav>
      {children}
    </div>
  );
}
