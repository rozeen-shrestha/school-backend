"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  FlaskRoundIcon as Flask,
  Bus,
  BookOpen,
  Home,
  Coffee,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Shield,
} from "lucide-react"

const ServicesPage = () => {
  const { language } = useContext(LanguageContext)

  const services = [
    {
      title: {
        en: "Laboratories",
        np: "प्रयोगशाला",
      },
      description: {
        en: "The school has separate laboratories for Physics, Chemistry, Biology, and Computer Science. All labs are equipped with modern facilities, ensuring the best environment for practical learning.",
        np: "स्कूलमा भौतिकी, रसायन, जीवविज्ञान र कम्प्युटर विज्ञानका लागि पृथक प्रयोगशालाहरू छन्। सबै प्रयोगशालाहरू आधुनिक सुविधाहरूसँग सुसज्जित छन्, जसले व्यावहारिक अध्ययनको लागि उत्कृष्ट वातावरण सुनिश्चित गर्दछ।",
      },
      image: "/placeholder.svg?height=400&width=600",
      icon: <Flask className="h-8 w-8" />,
      features: {
        en: ["Modern Equipment", "Safety Protocols", "Expert Supervision", "Digital Resources"],
        np: ["आधुनिक उपकरण", "सुरक्षा प्रोटोकल", "विशेषज्ञ निरीक्षण", "डिजिटल स्रोत"],
      },
    },
    {
      title: {
        en: "Transportation",
        np: "परिवहन",
      },
      description: {
        en: "Our fleet of school buses is safe, reliable, and well-maintained, providing fixed routes for smooth commutes to and from the school.",
        np: "हाम्रो स्कूलको बसहरूको बेड़ा सुरक्षित, भरपर्दो र राम्रोसँग मर्मत गरिएको छ, जसले स्कूलमा र स्कूलबाट जाने लागि निश्चित मार्गहरू प्रदान गर्दछ।",
      },
      image: "/placeholder.svg?height=400&width=600",
      icon: <Bus className="h-8 w-8" />,
      features: {
        en: ["GPS Tracking", "Experienced Drivers", "Regular Maintenance", "Fixed Routes"],
        np: ["GPS ट्र्याकिङ", "अनुभवी चालक", "नियमित मर्मत", "निश्चित मार्ग"],
      },
    },
    {
      title: {
        en: "Library",
        np: "पुस्तकालय",
      },
      description: {
        en: "The school library offers a wide collection of books, journals, and digital resources to encourage research and learning.",
        np: "स्कूल पुस्तकालयले पुस्तकहरू, जर्नलहरू र डिजिटल स्रोतहरूको एक विस्तृत सङ्ग्रह प्रदान गर्दछ, जसले अनुसन्धान र अध्ययनलाई प्रोत्साहन दिन्छ।",
      },
      image: "/placeholder.svg?height=400&width=600",
      icon: <BookOpen className="h-8 w-8" />,
      features: {
        en: ["10,000+ Books", "Digital Catalog", "Study Spaces", "Research Support"],
        np: ["१०,००० + पुस्तक", "डिजिटल सूची", "अध्ययन स्थान", "अनुसन्धान सहयोग"],
      },
    },
    {
      title: {
        en: "Hostel",
        np: "होस्टेल",
      },
      description: {
        en: "Our hostel facilities provide a safe, clean, and comfortable environment for students to reside in.",
        np: "हाम्रो होस्टेल सुविधाहरूले विद्यार्थीहरूको बसोबासको लागि सुरक्षित, सफा, र आरामदायक वातावरण प्रदान गर्दछ।",
      },
      image: "/placeholder.svg?height=400&width=600",
      icon: <Home className="h-8 w-8" />,
      features: {
        en: ["24/7 Security", "Nutritious Meals", "Study Rooms", "Recreation Areas"],
        np: ["२४/७ सुरक्षा", "पौष्टिक भोजन", "अध्ययन कोठा", "मनोरञ्जन क्षेत्र"],
      },
    },
    {
      title: {
        en: "Cafeteria",
        np: "क्याफेटेरिया",
      },
      description: {
        en: "The cafeteria serves hygienic and nutritious meals, offering a variety of options for students and staff.",
        np: "क्याफेटेरिया स्वच्छ र पौष्टिक भोजनहरू प्रदान गर्दछ, जसले विद्यार्थीहरू र कर्मचारीहरूका लागि विभिन्न विकल्पहरू प्रदान गर्दछ।",
      },
      image: "/placeholder.svg?height=400&width=600",
      icon: <Coffee className="h-8 w-8" />,
      features: {
        en: ["Fresh Ingredients", "Balanced Nutrition", "Variety of Options", "Hygienic Preparation"],
        np: ["ताजा सामग्री", "सन्तुलित पोषण", "विभिन्न विकल्प", "स्वच्छ तयारी"],
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="px-6 py-2 text-lg bg-blue-100 text-blue-800 hover:bg-blue-200">
              {language === "en" ? "Comprehensive Services" : "व्यापक सेवाहरू"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
              {language === "en" ? "Our Services" : "हाम्रो सेवाहरू"}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Discover the comprehensive range of services we offer to ensure the best educational experience for our students."
                : "हाम्रा विद्यार्थीहरूको लागि उत्कृष्ट शैक्षिक अनुभव सुनिश्चित गर्न हामीले प्रदान गर्ने व्यापक सेवाहरूको खोज गर्नुहोस्।"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-20"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div
                      className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center`}
                    >
                      {/* Image Section */}
                      <motion.div variants={imageVariants} className="w-full lg:w-1/2 relative overflow-hidden">
                        <div className="aspect-video lg:aspect-square relative">
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title[language]}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute top-6 left-6">
                            <div className="p-3 bg-blue-100 text-blue-700 rounded-full">{service.icon}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <div className="w-full lg:w-1/2 p-8 lg:p-12">
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">{service.title[language]}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{service.description[language]}</p>
                          </div>

                          <Separator className="my-6" />

                          {/* Features */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-800 flex items-center">
                              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                              {language === "en" ? "Key Features" : "मुख्य विशेषताहरू"}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.features[language].map((feature, featureIndex) => (
                                <motion.div
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIndex * 0.1 }}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  <span className="text-slate-600">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                              <span>{language === "en" ? "Learn More" : "थप जानकारी"}</span>
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
