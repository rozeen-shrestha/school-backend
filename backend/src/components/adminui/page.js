'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CircleUser, Home, LineChart, CalendarCheck2, Users, FileCheck, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ADMINUI = ({ children }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (!pathname) return false;
    const trimmedPath = pathname.replace(/\/$/, '');
    const trimmedLinkPath = path.replace(/\/$/, '');
    return trimmedPath === trimmedLinkPath || trimmedPath.startsWith(trimmedLinkPath + '/');
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span>School Backend</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                  isActive('/admin/dashboard') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleLinkClick}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/news"
                className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                  isActive('/admin/news') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleLinkClick}
              >
                <FileCheck className="h-4 w-4" />
                news
              </Link>
              <Link
                href="/admin/attendance"
                className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                  isActive('/admin/attendance') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleLinkClick}
              >
                <CalendarCheck2 className="h-4 w-4" />
                Attendance
              </Link>
              <Link
                href="/admin/students"
                className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                  isActive('/admin/students') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleLinkClick}
              >
                <Users className="h-4 w-4" />
                Students
              </Link>
              <Link
                href="/admin/analytics"
                className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                  isActive('/admin/analytics') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={handleLinkClick}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={handleLinkClick}>
                  <CalendarCheck2 className="h-6 w-6" />
                  <span>SMS V-0.1</span>
                </Link>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive('/admin/dashboard') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={handleLinkClick}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/news"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive('/admin/news') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={handleLinkClick}
                >
                  <FileCheck className="h-4 w-4" />
                  news
                </Link>
                <Link
                  href="/admin/attendance"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive('/admin/attendance') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={handleLinkClick}
                >
                  <CalendarCheck2 className="h-4 w-4" />
                  Attendance
                </Link>
                <Link
                  href="/admin/students"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive('/admin/students') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={handleLinkClick}
                >
                  <Users className="h-4 w-4" />
                  Students
                </Link>
                <Link
                  href="/admin/analytics"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                    isActive('/admin/analytics') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={handleLinkClick}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
            <Button variant="secondary" size="icon" className="rounded-full w-20">
                Logout
                </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ADMINUI;
