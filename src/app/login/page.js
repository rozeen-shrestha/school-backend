"use client";

import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const passwordRef = useRef(null);
  const pathname = usePathname(); // Get the current path

  // Determine if this is an admin or user login
  const isAdminLogin = pathname === "/login/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      // Fetch the session to check the role of the user
      const session = await fetch("/api/auth/session").then((res) => res.json());

      if (session?.user?.role === "admin") {
        router.push("/admin"); // Redirect to admin page
      } else if (session?.user?.role === "user") {
        router.push("/elibrary/dashboard"); // Redirect to user page
      } else {
        router.push("/"); // Fallback redirect
      }
    }
  };

  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleLoginRedirect = (role) => {
    if (role === "admin") {
      router.push("/login/admin");
    } else if (role === "user") {
      router.push("/login/user");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-6 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Choose Login Type</h1>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleLoginRedirect("admin")}
            className="w-32 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Admin Login
          </button>
          <button
            onClick={() => handleLoginRedirect("user")}
            className="w-32 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            User Login
          </button>
        </div>
      </div>
    </div>
  );
}
