"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"

const PrincipalMessage = () => {
  const { language } = useContext(LanguageContext)

  const translations = {
    en: {
      badge: "Principal's Message",
      heading: "Learning Today, Leading Tomorrow.",
      paragraphs: [
        "Welcome to Shree Saraswati Secondary School! Our school is a place where learning is fun, and every child is encouraged to do their best. We believe education is not just about books and exams but also about building good character and discovering new talents.",
        "Our teachers are dedicated to helping each student grow in their own unique way. They work hard to make lessons interesting and ensure every child feels supported and valued.",
        "Along with studies, we focus on activities like sports, arts, and community service to help students become well-rounded individuals. These activities teach teamwork, responsibility, and creativity, which are just as important as academics.",
        "We know that parents and families play a big role in a child's success. That's why we value working together with you to create the best opportunities for our students. Your support and encouragement mean so much to us.",
        "As we move forward, let's continue to inspire our students to dream big and work hard. Together, we can help them grow into confident, kind, and responsible people who can make the world a better place.",
      ],
      principalName: "John Doe",
      principalTitle: "Chairman / Principal",
      altText: "Principal Image",
    },
    np: {
      badge: "प्रधानाध्यापको सन्देश",
      heading: "आज सिक्दै, भोलि नेतृत्व गर्दै",
      paragraphs: [
        "श्री सरस्वती माध्यमिक विद्यालयमा स्वागत छ! हाम्रो विद्यालय त्यस्तो स्थान हो, जहाँ सिकाइ रमाइलो छ, र प्रत्येक विद्यार्थीलाई आफ्नो उत्कृष्टता प्रदर्शन गर्न प्रेरित गरिन्छ। हामी विश्वास गर्छौं कि शिक्षा केवल किताब र परीक्षा सम्म सीमित छैन; यो राम्रो चरित्र निर्माण र नयाँ प्रतिभा पत्ता लगाउने यात्रा पनि हो।",
        "हाम्रा शिक्षकहरू प्रत्येक विद्यार्थीलाई आफ्नो अनौठो तरिकाले बढ्न मद्दत गर्न समर्पित छन्। उनीहरूले पाठहरू चाखलाग्दो बनाउने र प्रत्येक विद्यार्थीलाई सहयोग र सम्मानित महसुस गराउने प्रयास गर्छन्।",
        "पढाइसँगै, खेलकुद, कला, र सामुदायिक सेवाजस्ता गतिविधिहरूमा पनि हामी ध्यान दिन्छौं। यी गतिविधिहरूले टोलीमा काम गर्ने, जिम्मेवारी बहन गर्ने, र रचनात्मक बन्ने गुण सिकाउँछन्, जुन अध्ययन जत्तिकै महत्वपूर्ण छन्।",
        "हामीलाई थाहा छ, विद्यार्थीहरूको सफलतामा अभिभावक र परिवारको ठूलो भूमिका हुन्छ। त्यसैले, हामी तपाईंसँग सहकार्य गर्न र हाम्रा विद्यार्थीहरूका लागि सबैभन्दा राम्रो अवसरहरू सिर्जना गर्न चाहन्छौं। तपाईको सहयोग र हौसला हामीलाई धेरै महत्त्वपूर्ण छ।",
        "आउनुहोस्, हामी हाम्रा विद्यार्थीहरूलाई ठूलो सपना देख्न, मेहनत गर्न, र राम्रो मान्छे बन्न प्रेरित गर्न सँगै काम गरौँ। मिलेर, हामी उनीहरूलाई संसारलाई अझ राम्रो ठाउँ बनाउन तयार गर्न सक्छौं।",
      ],
      principalName: "जोन डो",
      principalTitle: "अध्यक्ष / प्रिन्सिपल",
      altText: "प्रिन्सिपलको छवि",
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
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

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2">
              {translations[language].badge}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              {translations[language].heading}
            </h1>
          </motion.div>

          {/* Principal Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-blue-600" />
                  </div>
                </motion.div>

                {/* Principal Avatar */}
                <motion.div variants={itemVariants} className="flex justify-center mb-6">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" alt={translations[language].altText} />
                      <AvatarFallback className="text-2xl font-semibold bg-blue-100 text-blue-800">
                        {translations[language].principalName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </motion.div>

                {/* Message Content */}
                <motion.div variants={containerVariants} className="space-y-6 text-center">
                  {translations[language].paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      variants={paragraphVariants}
                      className="text-slate-600 leading-relaxed text-lg"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>

                <Separator className="my-8" />

                {/* Principal Info */}
                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-slate-800">{translations[language].principalName}</h3>
                  <p className="text-slate-500 font-medium">{translations[language].principalTitle}</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center space-x-2 mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  },
                }}
                className="w-2 h-2 bg-blue-300 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PrincipalMessage
