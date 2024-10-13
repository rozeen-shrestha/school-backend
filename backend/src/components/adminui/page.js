'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Image, Home, LineChart, CalendarCheck2, Users, FileCheck, Menu, ChevronDown, ChevronUp, PanelLeftClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import sidebarConfig from './sidebar.config.json';
import { motion, AnimatePresence } from 'framer-motion';

const iconComponents = {
  Home,
  LineChart,
  CalendarCheck2,
  Users,
  FileCheck,
  Menu,
  ChevronDown,
  ChevronUp,
  Image
};

const ADMINUI = ({ children }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    if (!pathname) return false;
    const trimmedPath = pathname.replace(/\/$/, '');
    const trimmedLinkPath = path.replace(/\/$/, '');
    return trimmedPath === trimmedLinkPath || trimmedPath.startsWith(trimmedLinkPath + '/');
  };

  useEffect(() => {
    sidebarConfig.forEach((item) => {
      if (item.dropdown) {
        item.dropdown.forEach((dropdownItem) => {
          if (isActive(dropdownItem.href)) {
            setOpenDropdown(item.href);
          }
        });
      }
    });
  }, [pathname]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = (href) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`grid min-h-screen w-full ${isCollapsed ? 'md:grid-cols-[80px_1fr]' : 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'}`}>
      {/* Sidebar */}
      <div className={`hidden border-r bg-muted/40 md:block ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex h-full max-h-screen flex-col gap-2 relative">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white text-lg">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={isCollapsed ? 'SB' : 'School Backend'}
              >
                {isCollapsed ? 'SB' : 'School Backend'}
              </motion.span>
            </Link>
            <button onClick={toggleSidebar} className="ml-auto bg-muted p-2 rounded-full">
              {isCollapsed ? <PanelRightOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarConfig.map((item) => {
                const IconComponent = iconComponents[item.icon];
                const isDropdownOpen = openDropdown === item.href;
                if (item.dropdown && !isCollapsed) {
                  return (
                    <div key={item.href} className="mb-4">
                      <button
                        className={`flex items-center justify-between w-full gap-4 rounded-xl px-3 py-3 transition-all ${
                          isDropdownOpen || isActive(item.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                        }`}
                        onClick={() => toggleDropdown(item.href)}
                      >
                        <div className="flex items-center gap-4">
                          <IconComponent className="h-5 w-5" />
                          {!isCollapsed && item.label}
                        </div>
                        <div className="ml-auto">
                          {isDropdownOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-6 mt-2"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                className={`flex items-center gap-4 w-full rounded-xl px-3 py-3 transition-all mb-2 ${
                                  isActive(dropdownItem.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                                }`}
                                onClick={handleLinkClick}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 w-full rounded-xl px-3 py-3 transition-all mb-4 ${
                      isActive(item.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                    }`}
                    onClick={handleLinkClick}
                  >
                    <IconComponent className="h-5 w-5" />
                    {!isCollapsed && item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6 bg-transparent">

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white" onClick={handleLinkClick}>
                  <CalendarCheck2 className="h-6 w-6" />
                  <span>SMS V-0.1</span>
                </Link>
                {sidebarConfig.map((item) => {
                  const IconComponent = iconComponents[item.icon];
                  const isDropdownOpen = openDropdown === item.href;
                  if (item.dropdown) {
                    return (
                      <div key={item.href} className="mb-4">
                        <button
                          className={`flex items-center justify-between gap-4 w-full rounded-xl px-3 py-3 transition-all ${
                            isDropdownOpen || isActive(item.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                          }`}
                          onClick={() => toggleDropdown(item.href)}
                        >
                          <div className="flex items-center gap-4 flex-grow">
                            <IconComponent className="h-5 w-5" />
                            {item.label}
                          </div>
                          <div className="ml-auto">
                            {isDropdownOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-6 mt-2"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className={`flex items-center gap-4 w-full rounded-xl px-3 py-3 transition-all mb-2 ${
                                    isActive(dropdownItem.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                                  }`}
                                  onClick={handleLinkClick}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 w-full rounded-xl px-3 py-3 transition-all mb-4 ${
                        isActive(item.href) ? 'bg-muted text-foreground' : 'text-white hover:bg-muted/10'
                      }`}
                      onClick={handleLinkClick}
                    >
                      <IconComponent className="h-5 w-5" />
                      {!isCollapsed && item.label}
                    </Link>
                  );
                })}
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
