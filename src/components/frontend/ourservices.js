"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bus, BookOpen, FlaskRoundIcon as Flask, Home, Coffee, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

const OURSERVICES = () => {
  const { language } = useContext(LanguageContext)

  const services = [
    {
      title: { en: "Bus Service", np: "बस सेवा" },
      description: {
        en: "Safe and reliable transportation for students with experienced drivers and well-maintained vehicles.",
        np: "विद्यार्थीहरूको लागि सुरक्षित र भरपर्दो यातायात सेवा, अनुभवी चालकहरू र राम्रोसँग मर्मत गरिएका सवारी साधनहरू सहित।",
      },
      image: "/placeholder.svg?height=200&width=400",
      icon: <Bus className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
      hoverColor: "group-hover:bg-blue-200 group-hover:text-blue-800",
    },
    {
      title: { en: "Library", np: "पुस्तकालय" },
      description: {
        en: "A vast collection of books and resources for students with quiet study spaces and digital resources.",
        np: "विद्यार्थीहरूको लागि किताब र स्रोतहरूको ठूलो सङ्ग्रह, शान्त अध्ययन स्थान र डिजिटल स्रोतहरू सहित।",
      },
      image: "/placeholder.svg?height=200&width=400",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-sky-100 text-sky-700",
      hoverColor: "group-hover:bg-sky-200 group-hover:text-sky-800",
    },
    {
      title: { en: "Laboratories", np: "प्रयोगशाला" },
      description: {
        en: "Well-equipped labs for practical learning with modern equipment and expert guidance.",
        np: "व्यावहारिक सिकाइका लागि राम्रोसँग सुसज्जित प्रयोगशालाहरू, आधुनिक उपकरण र विशेषज्ञ मार्गदर्शन सहित।",
      },
      image: "/placeholder.svg?height=200&width=400",
      icon: <Flask className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
      hoverColor: "group-hover:bg-blue-200 group-hover:text-blue-800",
    },
    {
      title: { en: "Hostel", np: "होस्टल" },
      description: {
        en: "Comfortable and secure accommodation for students with 24/7 supervision and homely environment.",
        np: "विद्यार्थीहरूको लागि आरामदायक र सुरक्षित आवास, २४/७ निगरानी र घरेलु वातावरण सहित।",
      },
      image: "/placeholder.svg?height=200&width=400",
      icon: <Home className="h-6 w-6" />,
      color: "bg-sky-100 text-sky-700",
      hoverColor: "group-hover:bg-sky-200 group-hover:text-sky-800",
    },
    {
      title: { en: "Cafeteria", np: "क्याफेटेरिया" },
      description: {
        en: "Healthy and delicious meals for students and staff with nutritious options and clean environment.",
        np: "विद्यार्थीहरू र कर्मचारीहरूको लागि स्वस्थ र स्वादिलो खाना, पौष्टिक विकल्पहरू र सफा वातावरण सहित।",
      },
      image: "/placeholder.svg?height=200&width=400",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
      hoverColor: "group-hover:bg-blue-200 group-hover:text-blue-800",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-sky-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={headingVariants} className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-base font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {language === "en" ? "What We Offer" : "हामी के प्रदान गर्छौं"}
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
              {language === "en" ? "Our Services" : "हाम्रो सेवाहरू"}
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 text-lg">
              {language === "en"
                ? "We provide a range of services to ensure a comfortable and enriching experience for all our students."
                : "हामी हाम्रा सबै विद्यार्थीहरूको लागि आरामदायक र समृद्ध अनुभव सुनिश्चित गर्न विभिन्न सेवाहरू प्रदान गर्दछौं।"}
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -10 }} className="h-full">
                <Card className="h-full overflow-hidden border-0 shadow-lg group transition-all duration-300 hover:shadow-xl bg-white/90">
                  <div className="relative overflow-hidden h-48">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title[language]}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={index === 0}
                      />
                    </motion.div>
                    <div className="absolute top-4 left-4">
                      <div
                        className={`p-2 rounded-full ${service.color} ${service.hoverColor} transition-colors duration-300`}
                      >
                        {service.icon}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
                    >
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold">{service.title[language]}</h3>
                      </div>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-black font-bold group-hover:text-blue-700 transition-colors duration-300">
                      {service.title[language]}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-slate-600 text-base">
                      {service.description[language]}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full text-black group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border-blue-600"
                    >
                      <span>{language === "en" ? "Learn More" : "थप जानकारी"}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-20 right-10 hidden lg:block"
          >
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            >
              <Sparkles className="text-blue-300 h-12 w-12 opacity-50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default OURSERVICES
