"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Users, Newspaper, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksRes, teachersRes, newsRes] = await Promise.all([
          fetch('/api/elibrary/list'),
          fetch('/api/teachers'),
          fetch('/api/news')
        ]);

        const [booksData, teachersData, newsData] = await Promise.all([
          booksRes.json(),
          teachersRes.json(),
          newsRes.json()
        ]);

        setBooks(booksData);
        setTeachers(teachersData);
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="h-full w-full p-8 space-y-8 bg-card">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your school administration dashboard.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Books</p>
                  <h3 className="text-2xl font-bold">{loading ? "..." : books.length}</h3>
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teachers</p>
                  <h3 className="text-2xl font-bold">{loading ? "..." : teachers.length}</h3>
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">News Articles</p>
                  <h3 className="text-2xl font-bold">{loading ? "..." : news.length}</h3>
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Recently Added Books */}
        <Card className="col-span-1 bg-background">
          <CardHeader>
            <CardTitle>Recent Books</CardTitle>
            <CardDescription>Latest additions to the library</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {loading ? (
                <LoadingSkeleton />
              ) : books.length > 0 ? (
                books.slice(0, 5).map((book, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No books available</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Teachers */}
        <Card className="col-span-1 bg-background">
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>Top performing faculty members</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {loading ? (
                <LoadingSkeleton />
              ) : teachers.length > 0 ? (
                teachers.slice(0, 3).map((teacher, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teacher?.photoUrl} alt={teacher?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {teacher?.firstName ? teacher.firstName.charAt(0) : 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teacher?.firstName} {teacher?.lastName || 'Unknown Teacher'}</p>
                      <p className="text-sm text-muted-foreground">{teacher?.subject || 'No subject assigned'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No teachers available</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="col-span-1 bg-background">
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
            <CardDescription>Stay updated with school events</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {loading ? (
                <LoadingSkeleton />
              ) : news.length > 0 ? (
                news.slice(0, 3).map((item, index) => (
                  <div key={index} className="mb-4 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <p className="font-medium">{item?.title || 'Untitled'}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Last edited: {item?.lastEdited || 'No date'}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No news available</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
