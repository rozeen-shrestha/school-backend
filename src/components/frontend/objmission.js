"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const VISION = () => {
  const { language } = useContext(LanguageContext)

  const translations = {
    en: {
      heading: "School's Vision",
      paragraph1:
        "At our institution, we aim to empower students with quality technical education that prepares them for the demands of the modern world. We believe in providing more than just academic knowledge—we focus on building practical skills, critical thinking, and innovation. By combining hands-on learning with strong theoretical foundations, we create an environment where students grow into competent professionals ready to succeed in a fast-changing global landscape.",
      paragraph2:
        "Our vision extends beyond the classroom. We are committed to nurturing confident, ethical, and responsible individuals who are prepared to lead, contribute to society, and adapt to lifelong learning. Through a culture of excellence and continuous development, we strive to shape the next generation of skilled leaders in the technical field.",
      altText: "Students Image",
      badge: "Our Vision",
    },
    np: {
      heading: "विद्यालयको दृष्टिकोण",
      paragraph1:
        "हाम्रो उद्देश्य विद्यार्थीहरूलाई गुणस्तरीय प्राविधिक शिक्षा प्रदान गर्नु हो, जसले उनीहरूलाई आधुनिक संसारका आवश्यकता पूरा गर्न सक्षम बनाओस्। हामी केवल किताबी ज्ञानमा सीमित छैनौं, व्यवहारिक सीप, आलोचनात्मक सोच र नवप्रवर्तनमा पनि जोड दिन्छौं। व्यवहारिक सिकाइ र सैद्धान्तिक आधारको सन्तुलनमार्फत, विद्यार्थीहरूलाई तीव्र गतिमा परिवर्तन भइरहेका विश्वमा सफल बन्ने वातावरण दिन चाहन्छौं।",
      paragraph2:
        "हाम्रो दृष्टिकोण कक्षाकोठासम्म सीमित छैन। हामी आत्मविश्वासी, नैतिक र जिम्मेवार व्यक्तित्व विकासमा समर्पित छौं, जसले समाजमा योगदान गर्न र जीवनभर सिक्न सकून्। उत्कृष्टता र निरन्तर विकासको संस्कारलाई आत्मसात गर्दै, हामी प्राविधिक क्षेत्रमा दक्ष नेतृत्वको नयाँ पुस्ता तयार पार्न चाहन्छौं।",
      altText: "विद्यार्थीहरूको तस्बिर",
      badge: "हाम्रो दृष्टिकोण",
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                {translations[language].badge}
              </Badge>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              {translations[language].heading}
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">{translations[language].paragraph1}</p>
              <p className="text-lg text-slate-600 leading-relaxed">{translations[language].paragraph2}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
            </motion.div>
          </motion.div>

          {/* Images Section */}
          <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-96 hidden lg:block">
              {/* Large Circle */}
              <motion.div
                variants={imageVariants}
                animate={floatingAnimation}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="absolute top-0 left-0 w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white z-30 cursor-pointer"
              >
                <Card className="w-full h-full border-0">
                  <CardContent className="p-0 w-full h-full">
                    <img
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      src="/placeholder.svg?height=256&width=256"
                      alt={translations[language].altText}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Medium Circle */}
              <motion.div
                variants={imageVariants}
                animate={{
                  y: [10, -10, 10],
                  transition: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="absolute bottom-8 left-40 w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white z-20 cursor-pointer"
              >
                <Card className="w-full h-full border-0">
                  <CardContent className="p-0 w-full h-full">
                    <img
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      src="/placeholder.svg?height=192&width=192"
                      alt={translations[language].altText}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Small Circle */}
              <motion.div
                variants={imageVariants}
                animate={{
                  y: [-5, 15, -5],
                  transition: {
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                  },
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white z-10 cursor-pointer"
              >
                <Card className="w-full h-full border-0">
                  <CardContent className="p-0 w-full h-full">
                    <img
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      src="/placeholder.svg?height=160&width=160"
                      alt={translations[language].altText}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"
              />
              <motion.div
                animate={{
                  rotate: -360,
                  transition: {
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                className="absolute bottom-20 -left-6 w-6 h-6 bg-pink-200 rounded-full opacity-60"
              />
            </div>

            {/* Mobile View - Single Image */}
            <motion.div
              variants={imageVariants}
              className="lg:hidden w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white"
            >
              <Card className="w-full h-full border-0">
                <CardContent className="p-0 w-full h-full">
                  <img
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=320&width=320"
                    alt={translations[language].altText}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default VISION
