import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-8 mx-auto max-w-7xl">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to E-Library</h1>
        <p className="text-xl text-muted-foreground">Discover, read, and explore our vast collection of books.</p>
      </section>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search for books..." className="pl-8" />
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Featured Books</CardTitle>
            <CardDescription>Check out our latest additions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>The Great Gatsby</li>
              <li>To Kill a Mockingbird</li>
              <li>1984</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/books">View All Books</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse books by genre</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fiction</li>
              <li>Non-Fiction</li>
              <li>Science & Technology</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Explore Categories</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Challenge</CardTitle>
            <CardDescription>Join our monthly reading challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Current book: "Dune" by Frank Herbert</p>
            <p>Participants: 128</p>
          </CardContent>
          <CardFooter>
            <Button>Join Challenge</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
