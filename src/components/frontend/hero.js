"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LanguageContext } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Add zoom-in animation styles
const zoomInStyle = `
@keyframes zoomInHero {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}
.hero-zoom-in {
  animation: zoomInHero 4s linear forwards;
}
`

const Hero = () => {
  const { language } = useContext(LanguageContext)
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomKey, setZoomKey] = useState(0) // To re-trigger animation

  const slides = [
    {
      img: "/api/file/IMG/buildingphoto.png",
      title: {
        en: "Learning Today, Leading Tomorrow.",
        np: "आज सिकौं, भोलि नेतृत्व गरौं।",
      },
      description: {
        en: "We had such a great time in Education.",
        np: "हामीले शिक्षामा उत्कृष्ट समय बितायौं।",
      },
    },
    {
      img: "/api/file/IMG/buildingphoto.png",
      title: {
        en: "Empowering Students for Success.",
        np: "विद्यार्थीलाई सफलताका लागि सशक्त बनाउँदै।",
      },
      description: {
        en: "Join us for a brighter future.",
        np: "हाम्रो साथ उज्यालो भविष्यको लागि जोडिनुहोस्।",
      },
    },
    {
      img: "/api/file/IMG/buildingphoto.png",
      title: {
        en: "Knowledge is Power.",
        np: "ज्ञान नै शक्ति हो।",
      },
      description: {
        en: "Explore our vast resources.",
        np: "हाम्रो विशाल स्रोतहरू अन्वेषण गर्नुहोस्।",
      },
    },
  ]

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const next = (prevIndex + 1) % slides.length
      setZoomKey(next + Date.now()) // force re-render for animation
      return next
    })
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const prev = prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      setZoomKey(prev + Date.now())
      return prev
    })
  }

  useEffect(() => {
    setZoomKey(activeIndex + Date.now())
    const interval = setInterval(handleNext, 4000)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setZoomKey(activeIndex + Date.now())
  }, [activeIndex])

  return (
    <>
      <style>{zoomInStyle}</style>
      <div className="relative w-screen h-[100vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Full viewport image with zoom-in animation */}
            <div
              key={zoomKey + "-" + index}
              className={cn(
                "absolute inset-0 w-full h-full",
                index === activeIndex ? "hero-zoom-in" : "",
              )}
              style={{ willChange: "transform" }}
            >
              <Image
                src={slide.img || "/placeholder.svg"}
                alt="education"
                fill
                priority
                className="object-cover w-full h-full"
                sizes="100vw"
              />
            </div>
            {/* Modern gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>
        ))}

        {/* Navigation buttons */}
        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Hero
