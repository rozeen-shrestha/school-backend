"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LanguageContext } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Hero = () => {
  const { language } = useContext(LanguageContext)
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = [
    {
      img: "/api/file/IMG/buildingphoto.png",
      title: {
        en: "Learning Today, Leading Tomorrow.",
        np: "आजको शिक्षा, भविष्यको नेतृत्व।",
      },
      description: {
        en: "We had such a great time in Education.",
        np: "हामीलाई शिक्षा क्षेत्रमा उत्कृष्ट समय बिताउनुभयो।",
      },
    },
  ]

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Full width image with proper Next.js Image component */}
          <div className="absolute inset-0">
            <Image src={slide.img || "/placeholder.svg"} alt="education" fill priority className="object-cover" />
          </div>

          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

          {/* Content container with better positioning */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 md:p-8 max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fadeInLeft">
                {slide.title[language]}
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-100">{slide.description[language]}</p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">{language === "en" ? "Apply Now" : "अहिले आवेदन गर्नुहोस्"}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Improved navigation buttons */}
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

      {/* Improved indicators */}
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
  )
}

export default Hero
