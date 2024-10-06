// app/admin/page.js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    // Redirect to login page if not authenticated or not admin
    redirect("/");
  }

  return <div className="p-6">Welcome to the admin dashboard!</div>;
}
