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

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">
          {isAdminLogin ? "Admin Login" : "User Login"}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKeyDown}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
            ref={passwordRef}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
