"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Clock, User, Building, MessageCircle, Calendar, Users } from "lucide-react"

const CCONTACT = () => {
  const { language } = useContext(LanguageContext)

  const translations = {
    en: {
      title: "Get in Touch",
      subtitle: "Contact our dedicated team for any inquiries or assistance",
      mapTitle: "Visit Our Campus",
      contactCards: "Contact Information",
      officeHours: "Office Hours",
      emergencyContact: "Emergency Contact",
      badge: "Contact Us",
    },
    np: {
      title: "सम्पर्कमा रहनुहोस्",
      subtitle: "कुनै पनि सोधपुछ वा सहायताको लागि हाम्रो समर्पित टोलीलाई सम्पर्क गर्नुहोस्",
      mapTitle: "हाम्रो क्याम्पस भ्रमण गर्नुहोस्",
      contactCards: "सम्पर्क जानकारी",
      officeHours: "कार्यालय समय",
      emergencyContact: "आपतकालीन सम्पर्क",
      badge: "हामीलाई सम्पर्क गर्नुहोस्",
    },
  }

  // Contact information data
  const contactData = [
    {
      name: {
        en: "Principal's Office",
        np: "प्रिन्सिपलको कार्यालय",
      },
      position: {
        en: "Administrative Head",
        np: "प्रशासनिक प्रमुख",
      },
      phone: "+977-1-234-5678",
      email: "principal@saraswatischool.edu.np",
      department: {
        en: "Administration",
        np: "प्रशासन",
      },
      icon: <User className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: {
        en: "Academic Office",
        np: "शैक्षिक कार्यालय",
      },
      position: {
        en: "Academic Coordinator",
        np: "शैक्षिक संयोजक",
      },
      phone: "+977-1-234-5679",
      // No email for this contact
      department: {
        en: "Academics",
        np: "शैक्षिक",
      },
      icon: <Building className="h-6 w-6" />,
      color: "bg-sky-100 text-sky-700",
    },
    {
      name: {
        en: "Admission Office",
        np: "भर्ना कार्यालय",
      },
      position: {
        en: "Admission Counselor",
        np: "भर्ना सल्लाहकार",
      },
      // No phone for this contact
      email: "admission@saraswatischool.edu.np",
      department: {
        en: "Admissions",
        np: "भर्ना",
      },
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: {
        en: "Student Affairs",
        np: "विद्यार्थी मामिला",
      },
      position: {
        en: "Student Counselor",
        np: "विद्यार्थी सल्लाहकार",
      },
      phone: "+977-1-234-5681",
      email: "students@saraswatischool.edu.np",
      department: {
        en: "Student Services",
        np: "विद्यार्थी सेवा",
      },
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-sky-100 text-sky-700",
    },
    {
      name: {
        en: "Finance Office",
        np: "वित्त कार्यालय",
      },
      position: {
        en: "Finance Manager",
        np: "वित्त प्रबन्धक",
      },
      // No phone or email for this contact
      department: {
        en: "Finance",
        np: "वित्त",
      },
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: {
        en: "Transport Office",
        np: "यातायात कार्यालय",
      },
      position: {
        en: "Transport Coordinator",
        np: "यातायात संयोजक",
      },
      phone: "+977-1-234-5683",
      email: "transport@saraswatischool.edu.np",
      department: {
        en: "Transportation",
        np: "यातायात",
      },
      icon: <MapPin className="h-6 w-6" />,
      color: "bg-sky-100 text-sky-700",
    },
  ]

  const officeHours = {
    en: {
      weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
      saturday: "Saturday: 9:00 AM - 2:00 PM",
      sunday: "Sunday: Closed",
    },
    np: {
      weekdays: "सोमबार - शुक्रबार: बिहान ८:०० - साँझ ५:००",
      saturday: "शनिबार: बिहान ९:०० - दिउँसो २:००",
      sunday: "आइतबार: बन्द",
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="px-6 py-2 text-lg bg-blue-100 text-blue-800 hover:bg-blue-200">
              {translations[language].badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
              {translations[language].title}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {translations[language].subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {translations[language].contactCards}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contactData.map((contact, index) => (
              <motion.div key={index} variants={cardVariants} whileHover={{ y: -5 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-full ${contact.color}`}>{contact.icon}</div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {contact.department[language]}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800">{contact.name[language]}</CardTitle>
                    <CardDescription className="text-slate-600">{contact.position[language]}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {contact.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="text-slate-600">{contact.phone}</span>
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span className="text-slate-600 text-sm">{contact.email}</span>
                        </div>
                      )}
                      {!contact.phone && !contact.email && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="text-slate-600 text-sm">
                            {language === "en" ? "Visit office for contact" : "सम्पर्कको लागि कार्यालयमा आउनुहोस्"}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map and Office Hours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden border-0 shadow-xl">
                <CardHeader className="bg-blue-200 p-4">
                  <CardTitle className="flex items-center text-black space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{translations[language].mapTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8874816395687!2d86.154012176399!3d27.021096736779036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec050061308dad%3A0xac92310a602ddc50!2sShree%20Saraswati%20Secondary%20School%20Dakaha-4%20Sindhuli!5e0!3m2!1sen!2snp!4v1695312228902!5m2!1sen!2snp"
                    width="100%"
                    height="400"
                    className="w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden={false}
                    tabIndex={0}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>{translations[language].officeHours}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-slate-600">{officeHours[language].weekdays}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-slate-600">{officeHours[language].saturday}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-slate-600">{officeHours[language].sunday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-700">
                    <Phone className="h-5 w-5" />
                    <span>{translations[language].emergencyContact}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-red-600 font-semibold">+977-1-234-9999</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CCONTACT
