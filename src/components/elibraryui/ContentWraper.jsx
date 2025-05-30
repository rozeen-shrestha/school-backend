import { Card, CardContent } from "@/components/ui/card"

export default function ContentWrapper({ children, breadcrumbs = [], childData }) {
  return (
    <>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-4 md:p-6">
          <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-24px)]">{children}</div>
        </CardContent>
      </Card>
    </>
  )
}
