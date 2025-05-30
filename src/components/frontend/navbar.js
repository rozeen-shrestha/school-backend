"use client"

import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { LanguageContext } from "@/components/LanguageContext"

// Scrolling News Ticker Component
const ScrollingNewsTicker = ({ news, language }) => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const tickerContainer = document.getElementById("news-ticker-container")
    const tickerContent = document.getElementById("news-ticker-content")

    if (!tickerContainer || !tickerContent) return

    const containerWidth = tickerContainer.offsetWidth
    const contentWidth = tickerContent.offsetWidth

    const animate = () => {
      setPosition((prev) => (prev <= -contentWidth ? containerWidth : prev - 1))
    }

    const intervalId = setInterval(animate, 20)
    return () => clearInterval(intervalId)
  }, [news])

  return (
    <div id="news-ticker-container" className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <div
        id="news-ticker-content"
        className="absolute whitespace-nowrap flex"
        style={{
          transform: `translateX(${position}px)`,
          transition: "transform linear",
        }}
      >
        {news.map((item, index) => (
          <span key={index} className="mr-10 text-yellow-200 text-sm">
            {item[language]}
          </span>
        ))}
      </div>
    </div>
  )
}

// Language Dropdown Component
const LanguageDropdown = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "np", name: "नेपाली" },
  ]

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage)
    }
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".language-dropdown")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative language-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
      >
        <Globe size={20} />
        <span className="text-sm">{language === "en" ? "EN" : "NP"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-blue-100 ${
                language === lang.code ? "bg-blue-50 font-semibold" : ""
              } text-black`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Navbar Component
const Navbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language } = useContext(LanguageContext)

  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsScrolled(scrollTop > 50)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu-container")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const content = {
    schoolName: {
      en: "Shree Saraswati Secondary School",
      np: "श्री सरस्वती माध्यमिक विद्यालय",
    },
    address: {
      en: "Dakaha-4, Sindhuli, Nepal",
      np: "डाकाहा-४, सिन्धुली, नेपाल",
    },
    notice: { en: "Important Notice", np: "महत्वपूर्ण सूचना" },
    news: [
      { en: "Annual Sports Day Announced", np: "वार्षिक खेल दिवस घोषित" },
      { en: "Science Exhibition Next Month", np: "अगले महीने विज्ञान प्रदर्शनी" },
      { en: "New Computer Lab Inauguration", np: "नई कंप्यूटर प्रयोगशाला का उद्घाटन" },
      { en: "Scholarship Applications Open", np: "छात्रवृत्ति आवेदन खुले" },
    ],
    nav: {
      home: { en: "Home", np: "मुख्य पृष्ठ", link: "/", id: "home" },
      faculty: {
        en: "Our Programs",
        np: "हाम्रो संकाय",
        link: "/programs",
        id: "program",
      },
      services: {
        en: "Our Services",
        np: "हाम्रो सेवाहरू",
        link: "/services",
        id: "service",
      },
      gallery: {
        en: "Gallery",
        np: "ग्यालेरी",
        link: "/gallery",
        id: "gallery",
      },
      teacher: {
        en: "Our Teachers",
        np: "हाम्रो शिक्षक",
        link: "/teachers",
        id: "teacher",
      },
      achievements: {
        en: "Our Achievements",
        np: "हाम्रो उपलब्धिहरू",
        link: "/achievements",
        id: "achievements",
      },
      news: { en: "News", np: "समाचार", link: "/news", id: "news" },
      contact: {
        en: "Contact",
        np: "सम्पर्क",
        link: "/contact",
        id: "contact",
      },
      elibrary: {
        en: "eLibrary",
        np: "ई-पुस्तकालय",
        link: "/elibrary",
        id: "elibrary",
      },
      login: {
        en: "login",
        np: "लगइन",
        link: "/login",
        id: "login",
      },
    },
  }

  const getText = (contentObj) => contentObj[language]
  const navItems = Object.values(content.nav)

  const handleNavClick = (link, id) => {
    if (id === "elibrary" || id === "login") {
      // Open eLibrary in a new tab
      window.open(link, "_blank", "noopener,noreferrer")
    } else {
      // Navigate normally for other links
      router.push(link)
    }
    closeMenu()
  }

  return (
    <div className="relative">
      <div className="w-full z-50 bg-blue-800 text-white fixed top-0 transition-all duration-300 border-0 shadow-none">
        {!isScrolled && (
          <div className="container mx-auto transition-all duration-300">
            <div className="px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="School Logo"
                  className="w-12 h-12 rounded-full shadow-lg object-cover"
                />
                <div className="flex items-center space-x-4">
                  <div className="md:block">
                    <h1 className="font-bold text-lg leading-tight md:text-lg text-sm">
                      {getText(content.schoolName)}
                    </h1>
                    <p className="text-sm text-gray-200 hidden md:block">{getText(content.address)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-xl pl-6 hidden md:block">{getText(content.notice)}</p>
                    <div className="mt-2 hidden md:block w-96 h-6 overflow-hidden">
                      <ScrollingNewsTicker news={content.news} language={language} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <LanguageDropdown />
              </div>

              <div className="mobile-menu-container">
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 hover:bg-blue-700 rounded-md transition-colors duration-200"
                  aria-label="Toggle mobile menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`container mx-auto transition-all duration-300 ${isScrolled ? "py-3" : "py-2 bg-blue-800"}`}>
          <div className="px-4 flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-8 w-full">
              {isScrolled && (
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="School Logo"
                  className="w-10 h-10 rounded-full shadow-lg object-cover"
                />
              )}

              <nav className="flex space-x-8 flex-grow">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.link, item.id)}
                    className="text-white hover:text-blue-200 transition-colors duration-200 font-medium whitespace-nowrap"
                  >
                    {getText(item)}
                  </button>
                ))}
              </nav>

              <div className="flex-shrink-0"></div>
            </div>

            {isScrolled && (
              <div className="md:hidden flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="School Logo"
                    className="w-10 h-10 rounded-full shadow-lg object-cover"
                  />
                  <h2 className="text-sm font-medium">{getText(content.schoolName)}</h2>
                </div>
                <div className="flex items-center space-x-3">
                  <LanguageDropdown />
                  <div className="mobile-menu-container">
                    <button
                      onClick={toggleMenu}
                      className="p-2 hover:bg-blue-700 rounded-md transition-colors duration-200"
                      aria-label="Toggle mobile menu"
                    >
                      {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isScrolled && (
              <div className="hidden md:flex items-center justify-end w-full space-x-4">
                <LanguageDropdown />
              </div>
            )}
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden mobile-menu-container ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <nav className="px-4 py-2 bg-blue-900 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.link, item.id)}
                className="block py-3 px-4 hover:bg-blue-800 rounded-md transition-colors duration-200 min-w-[200px] whitespace-nowrap text-left w-full"
              >
                {getText(item)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
