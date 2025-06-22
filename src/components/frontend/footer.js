"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Facebook, ChevronRight, Globe, Heart, ExternalLink } from "lucide-react"
import { LanguageContext } from "../LanguageContext"

const Footer = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);


  const quickLinks = [
    { label: { en: "Home", np: "गृहपृष्ठ" }, url: "/" },
    { label: { en: "Gallery", np: "ग्यालेरी" }, url: "/gallery" },
    { label: { en: "Our Programs", np: "हाम्रा कार्यक्रमहरू" }, url: "/programs" },
    { label: { en: "Our Services", np: "हाम्रा सेवाहरू" }, url: "/services" },
    { label: { en: "Our Teachers", np: "हाम्रा शिक्षकहरू" }, url: "/teachers" },
    { label: { en: "Our Achievements", np: "हाम्रा उपलब्धिहरू" }, url: "/achievements" },
    { label: { en: "News", np: "समाचार" }, url: "/news" },
    { label: { en: "Contact", np: "सम्पर्क" }, url: "/contact" },
  ]

  const socialLinks = [
    {
      label: { en: "Facebook", np: "फेसबुक" },
      url: "https://www.facebook.com/saraswati.secondary.school.dakaha",
      icon: <Facebook className="h-4 w-4" />,
    },
  ]

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      text: { en: "Dakaha-4, Sindhuli, Nepal", np: "डकाहा-४, सिन्धुली, नेपाल" },
      type: "address",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: { en: "981199494 / 9707432740", np: "९८११९९४९४ / ९७०७४३२७४०" },
      type: "phone",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      text: { en: "sssdakaha@gmail.com", np: "sssdakaha@gmail.com" },
      type: "email",
    },
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }


  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* School Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="mb-4">
                <div className="w-32 h-32 ">
                  <img
                    src="/logo.svg?height=160&width=160"
                    alt="School Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-blue-100">
                {language === "en" ? "Shree Saraswati Secondary School" : "श्री सरस्वती माध्यमिक विद्यालय"}
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-100 flex items-center">
                <ChevronRight className="h-5 w-5 mr-1" />
                {language === "en" ? "Quick Links" : "छिटो लिङ्कहरू"}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a
                      href={link.url}
                      className="flex items-center text-blue-200 hover:text-white transition-colors duration-300 group"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 group-hover:text-blue-300" />
                      {language === "en" ? link.label.en : link.label.np}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Network */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-100 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                {language === "en" ? "Connect With Us" : "हामीसँग जडान हुनुहोस्"}
              </h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-200 hover:text-white transition-colors duration-300 group"
                  >
                    {link.icon}
                    <span className="ml-2">{language === "en" ? link.label.en : link.label.np}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4 text-blue-100 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {language === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-3 text-blue-200 hover:text-white transition-colors duration-300"
                  >
                    <div className="text-blue-300 mt-1">{contact.icon}</div>
                    <div>
                      {contact.type === "phone" ? (
                        <a href={`tel:${contact.text.en}`} className="hover:underline">
                          {contact.text[language]}
                        </a>
                      ) : contact.type === "email" ? (
                        <a href={`mailto:${contact.text.en}`} className="hover:underline">
                          {contact.text[language]}
                        </a>
                      ) : (
                        <span>{contact.text[language]}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <Separator className="bg-blue-700 mb-6" />

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center text-blue-200 text-sm">
              <span>© 2025</span>
              <Heart className="h-4 w-4 mx-2 text-red-400" />
              <span>{language === "en" ? "Shree Saraswati Secondary School" : "श्री सरस्वती माध्यमिक विद्यालय"}</span>
              <span className="ml-2">{language === "en" ? "All rights reserved." : "सबै अधिकार सुरक्षित छन्।"}</span>
            </div>

            <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-blue-800 text-blue-100 hover:bg-blue-700">
                {language === "en"
                    ? "Made with ❤️ by Innowix Studios"
                    : "इनोविक्स स्टुडियो द्वारा ❤️ सँग तयार पारिएको"}
                </Badge>
              <Button
                onClick={toggleLanguage}
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-100 hover:bg-blue-800 hover:text-white transition-all duration-300"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "नेपाली" : "English"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <div className="relative">
        <svg
          className="absolute bottom-0 left-0 w-full h-6 text-blue-950"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer
