"use client"

import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { useState, useCallback, useEffect, useRef } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCw,
  Loader2,
  FileText,
  AlertCircle,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PdfViewer({ src, title = "Document", className }) {
  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [fitToWidth, setFitToWidth] = useState(true)

  const containerRef = useRef(null)
  const contentRef = useRef(null)

  // Responsive state
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Measure container width
  useEffect(() => {
    const updateContainerWidth = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect()
        setContainerWidth(rect.width - 32) // Account for padding
      }
    }

    updateContainerWidth()
    window.addEventListener("resize", updateContainerWidth)

    // Use ResizeObserver for more accurate container size tracking
    const resizeObserver = new ResizeObserver(updateContainerWidth)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      window.removeEventListener("resize", updateContainerWidth)
      resizeObserver.disconnect()
    }
  }, [])

  // Calculate optimal scale based on container width
  const calculateOptimalScale = useCallback(() => {
    if (!containerWidth) return 1.0

    // Assume standard PDF page width is around 595 points
    const standardPageWidth = 595
    let optimalScale = (containerWidth * 0.9) / standardPageWidth

    // Apply device-specific adjustments
    if (isMobile) {
      optimalScale *= 0.85
    } else if (isTablet) {
      optimalScale *= 0.9
    }

    // Ensure scale is within reasonable bounds
    return Math.max(0.3, Math.min(optimalScale, 2.0))
  }, [containerWidth, isMobile, isTablet])

  // Auto-fit to width when container size changes
  useEffect(() => {
    if (fitToWidth && containerWidth > 0) {
      const optimalScale = calculateOptimalScale()
      setScale(optimalScale)
    }
  }, [containerWidth, fitToWidth, calculateOptimalScale])

  // Handle fullscreen mode
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isFullscreen])

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
    setIsLoading(false)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((error) => {
    setError(error.message)
    setIsLoading(false)
  }, [])

  const nextPage = useCallback(() => {
    if (numPages && pageNumber < numPages) {
      setPageNumber((prev) => prev + 1)
    }
  }, [numPages, pageNumber])

  const prevPage = useCallback(() => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1)
    }
  }, [pageNumber])

  const zoomIn = useCallback(() => {
    setFitToWidth(false)
    setScale((prev) => Math.min(prev + 0.2, 3.0))
  }, [])

  const zoomOut = useCallback(() => {
    setFitToWidth(false)
    setScale((prev) => Math.max(prev - 0.2, 0.3))
  }, [])

  const fitToWidthToggle = useCallback(() => {
    if (fitToWidth) {
      setFitToWidth(false)
    } else {
      setFitToWidth(true)
      const optimalScale = calculateOptimalScale()
      setScale(optimalScale)
    }
  }, [fitToWidth, calculateOptimalScale])

  const resetZoom = useCallback(() => {
    setFitToWidth(true)
    const optimalScale = calculateOptimalScale()
    setScale(optimalScale)
  }, [calculateOptimalScale])

  const rotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360)
  }, [])

  const rotateCounterClockwise = useCallback(() => {
    setRotation((prev) => (prev - 90 + 360) % 360)
  }, [])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && numPages && page <= numPages) {
        setPageNumber(page)
      }
    },
    [numPages],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextPage()
      } else if (e.key === "ArrowLeft") {
        prevPage()
      } else if (e.key === "+" || e.key === "=") {
        zoomIn()
      } else if (e.key === "-") {
        zoomOut()
      } else if (e.key === "0") {
        resetZoom()
      } else if (e.key === "f" || e.key === "F") {
        fitToWidthToggle()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextPage, prevPage, zoomIn, zoomOut, resetZoom, fitToWidthToggle])

  if (error) {
    return (
      <Card className={cn("w-full h-full", className)}>
        <CardContent className="flex flex-col items-center justify-center h-full p-8">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load PDF</h3>
          <p className="text-sm text-muted-foreground text-center">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      ref={containerRef}
      className={cn(
        "w-full h-full flex flex-col transition-all duration-300 bg-transparent border-0 relative",
        isFullscreen && "fixed inset-0 z-50 rounded-none bg-background",
        className,
      )}
    >
      {/* Minimal Toolbar - Only title and fullscreen */}
      <CardHeader className={cn("pb-2 bg-background/50 backdrop-blur-sm border-b", isMobile && "p-2")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{title}</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Zoom and Rotation Controls - Desktop only in header */}
            {!isMobile && (
              <>
                <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.3} className="h-8 w-8 p-0">
                  <ZoomOut className="h-4 w-4" />
                </Button>

                <Button
                  variant={fitToWidth ? "default" : "ghost"}
                  size="sm"
                  onClick={fitToWidthToggle}
                  className="h-8 px-3 text-sm"
                  title={fitToWidth ? "Fit to width (active)" : "Fit to width"}
                >
                  {fitToWidth ? "Fit" : Math.round(scale * 100) + "%"}
                </Button>

                <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 3.0} className="h-8 w-8 p-0">
                  <ZoomIn className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={rotateCounterClockwise}
                  className="h-8 w-8 p-0"
                  title="Rotate Left"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={rotate} className="h-8 w-8 p-0" title="Rotate Right">
                  <RotateCw className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-2" />
              </>
            )}

            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-8 w-8 p-0">
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* PDF Content */}
      <CardContent
        ref={contentRef}
        className={cn("flex-1 overflow-auto p-4 bg-transparent", isMobile && "p-2", isFullscreen && "bg-background")}
      >
        <div className="flex justify-center min-h-[50vh]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          )}

          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex justify-center"
          >
            <div
              className={cn(
                "shadow-lg rounded-lg overflow-hidden bg-background transition-all duration-300",
                rotation % 180 !== 0 && "mt-16",
              )}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="max-w-full"
                loading={
                  <div className="flex justify-center items-center h-96 w-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
              />
            </div>
          </Document>
        </div>
      </CardContent>

      {/* Floating Page Navigation - Bottom Center */}
      {!isLoading && numPages && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-background/95 backdrop-blur-sm border rounded-full shadow-lg px-4 py-2 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={pageNumber}
                onChange={(e) => goToPage(Number.parseInt(e.target.value) || 1)}
                className="w-12 h-7 text-center text-sm bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-primary rounded"
                min={1}
                max={numPages || 1}
                aria-label="Page number"
              />
              <span className="text-sm text-muted-foreground">of {numPages}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Controls - Bottom Right */}
      {isMobile && !isLoading && (
        <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-2">
          {/* Zoom Controls */}
          <div className="bg-background/95 backdrop-blur-sm border rounded-full shadow-lg p-1 flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 3.0}
              className="h-8 w-8 p-0 rounded-full"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant={fitToWidth ? "default" : "ghost"}
              size="sm"
              onClick={fitToWidthToggle}
              className="h-8 w-8 p-0 rounded-full text-xs"
              title={fitToWidth ? "Fit to width (active)" : "Fit to width"}
            >
              {fitToWidth ? "F" : Math.round((scale * 100) / 10)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.3}
              className="h-8 w-8 p-0 rounded-full"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Rotation Controls */}
          <div className="bg-background/95 backdrop-blur-sm border rounded-full shadow-lg p-1 flex flex-col gap-1">
            <Button variant="ghost" size="sm" onClick={rotateCounterClockwise} className="h-8 w-8 p-0 rounded-full">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={rotate} className="h-8 w-8 p-0 rounded-full">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
