"use client"

import { signIn } from "next-auth/react"
import { useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, Lock, User, Eye, EyeOff, AlertTriangle, Settings } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const passwordRef = useRef(null)
  const pathname = usePathname()

  // Determine if this is an admin or user login
  const isAdminLogin = pathname === "/login/admin"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      })

      if (res?.error) {
        setError("Access denied. Invalid administrator credentials.")
      } else {
        // Fetch the session to check the role of the user
        const session = await fetch("/api/auth/session").then((res) => res.json())

        if (session?.user?.role === "admin") {
          router.push("/admin") // Redirect to admin page
        } else if (session?.user?.role === "user") {
          router.push("/elibrary/dashboard") // Redirect to user page
        } else {
          router.push("/") // Fallback redirect
        }
      }
    } catch (error) {
      setError("System error. Please contact IT support if the issue persists.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      passwordRef.current?.focus()
    }
  }

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Security Warning */}
        <div className="mb-6 p-4 bg-red-950/50 border border-red-800/50 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 text-red-200">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Restricted Access Area</span>
          </div>
          <p className="text-xs text-red-300 mt-1">
            This portal is for authorized administrators only. All access attempts are logged.
          </p>
        </div>

        <Card className="shadow-2xl border-red-800/50 bg-slate-900/90 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                    ADMIN
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-white">Administrator Portal</CardTitle>
              <CardDescription className="text-red-200">Secure access to system administration</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="border-red-600 bg-red-950/50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-slate-200">
                  Administrator Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleUsernameKeyDown}
                    className="pl-10 h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-red-500 focus:ring-red-500/20"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Administrator Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handlePasswordKeyDown}
                    ref={passwordRef}
                    className="pl-10 pr-10 h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-red-500 focus:ring-red-500/20"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-700/50"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={isLoading || !username.trim() || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">Secure Login</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                Need user access?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-blue-400 hover:text-blue-300"
                  onClick={() => router.push("/login")}
                  disabled={isLoading}
                >
                  User Portal →
                </Button>
              </p>
            </div>

            {/* Security Features */}
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  <span>2FA Ready</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">Protected by enterprise-grade security • All sessions monitored</p>
        </div>
      </div>
    </div>
  )
}
