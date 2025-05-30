"use client"

import { useParams } from "next/navigation"
import PdfViewer from "@/components/pdf/viewer"

export default function ViewBookPage() {
  const { id } = useParams()
  const pdfUrl = `/api/libraryfiles/books/${id}.pdf`

  return (
    <div className="w-full h-full flex flex-col">
      {/* PDF Viewer Section - Full remaining height */}
      <div className="flex-1 min-h-0 w-full">
        <PdfViewer
          src={pdfUrl}
          title="E-Library Book"
          className="w-full h-full border-0 rounded-none bg-transparent"
        />
      </div>
    </div>
  )
}
