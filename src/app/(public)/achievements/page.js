"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "@/components/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Trophy,
  Medal,
  Award,
  Star,
  Target,
  Users,
  BookOpen,
  Zap,
  Palette,
  Heart,
  Calendar,
  ArrowRight,
} from "lucide-react"

const AchievementsPage = () => {
  const { language } = useContext(LanguageContext)

  const achievements = [
    {
      title: {
        en: "Academic Excellence",
        np: "शैक्षिक उत्कृष्टता",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Top results in board exams for consecutive years with a focus on holistic education and student development.",
        np: "समान्य वर्षहरूमा बोर्ड परीक्षा परिणामहरू, समग्र शिक्षा र विद्यार्थी विकासमा ध्यान केन्द्रित गरिएको।",
      },
      icon: <BookOpen className="h-6 w-6" />,
      category: { en: "Academic", np: "शैक्षिक" },
      year: "2023",
      stats: { en: "95% Pass Rate", np: "९५% उत्तीर्ण दर" },
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: {
        en: "Sports Championship",
        np: "खेल च्याम्पियनशिप",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Winners of inter-school competitions with stellar performances in athletics and team sports across multiple disciplines.",
        np: "इंटर-स्कूल प्रतियोगिताहरूमा विजेताहरू, एथलेटिक्स र टोली खेलहरूमा उत्कृष्ट प्रदर्शन।",
      },
      icon: <Trophy className="h-6 w-6" />,
      category: { en: "Sports", np: "खेल" },
      year: "2023",
      stats: { en: "5 Gold Medals", np: "५ स्वर्ण पदक" },
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: {
        en: "Science Fair Winner",
        np: "विज्ञान मेला विजेता",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Innovative projects that made headlines, including renewable energy models and environmental conservation initiatives.",
        np: "नवीनतम परियोजनाहरू जसले हेडलाइन्स बनाएका छन्, जसमा नवीकरणीय ऊर्जा मोडेलहरू समावेश छन्।",
      },
      icon: <Zap className="h-6 w-6" />,
      category: { en: "Science", np: "विज्ञान" },
      year: "2023",
      stats: { en: "1st Place", np: "पहिलो स्थान" },
      color: "bg-green-100 text-green-700",
    },
    {
      title: {
        en: "Debate Champion",
        np: "विवाद च्याम्पियन",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Nationwide debating competition champions for three consecutive years, showcasing exceptional oratory skills.",
        np: "तीन लगातार वर्षहरूको लागि राष्ट्रिय बहस प्रतियोगिता च्याम्पियनहरू।",
      },
      icon: <Target className="h-6 w-6" />,
      category: { en: "Debate", np: "बहस" },
      year: "2021-2023",
      stats: { en: "3 Years Running", np: "३ वर्ष लगातार" },
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: {
        en: "Art Showcase",
        np: "कला प्रदर्शनी",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Top awards in creative arts, from traditional painting to modern digital design and multimedia presentations.",
        np: "रचनात्मक कलामा शीर्ष पुरस्कारहरू, चित्रकला देखि डिजिटल डिजाइन सम्म।",
      },
      icon: <Palette className="h-6 w-6" />,
      category: { en: "Arts", np: "कला" },
      year: "2023",
      stats: { en: "Multiple Awards", np: "धेरै पुरस्कार" },
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: {
        en: "Community Service",
        np: "सामुदायिक सेवा",
      },
      image: "/placeholder.svg?height=300&width=400",
      description: {
        en: "Impactful volunteering initiatives and social awareness campaigns that have positively affected the local community.",
        np: "प्रभावशाली स्वयंसेवी पहलहरू र सामाजिक सचेतना अभियानहरू।",
      },
      icon: <Heart className="h-6 w-6" />,
      category: { en: "Community", np: "समुदाय" },
      year: "2023",
      stats: { en: "500+ Hours", np: "५००+ घण्टा" },
      color: "bg-red-100 text-red-700",
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="px-6 py-2 text-lg bg-blue-100 text-blue-800 hover:bg-blue-200">
              {language === "en" ? "Our Pride" : "हाम्रो गर्व"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
              {language === "en" ? "Our Achievements" : "हाम्रो उपलब्धिहरू"}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Celebrating excellence in academics, sports, arts, and community service. Our students consistently achieve remarkable success across all fields."
                : "शैक्षिक, खेल, कला र सामुदायिक सेवामा उत्कृष्टता मनाउँदै। हाम्रा विद्यार्थीहरूले सबै क्षेत्रमा उल्लेखनीय सफलता हासिल गर्छन्।"}
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {language === "en" ? "Hall of Fame" : "सम्मान कक्ष"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Discover the remarkable achievements that define our school's legacy of excellence."
                : "हाम्रो स्कूलको उत्कृष्टताको विरासत परिभाषित गर्ने उल्लेखनीय उपलब्धिहरू पत्ता लगाउनुहोस्।"}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={cardVariants} whileHover={{ y: -10 }}>
                <Card className="h-full overflow-hidden border-0 shadow-lg group transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="aspect-video">
                      <img
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title[language]}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className={`p-2 rounded-full ${achievement.color}`}>{achievement.icon}</div>
                      <Badge variant="secondary" className="bg-white/90 text-slate-700">
                        {achievement.category[language]}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{achievement.year}</span>
                      </Badge>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
                    >
                      <div className="p-4 text-white">
                        <div className="text-lg font-semibold">{achievement.stats[language]}</div>
                      </div>
                    </motion.div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-black font-bold group-hover:text-blue-700 transition-colors duration-300">
                      {achievement.title[language]}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {achievement.description[language]}
                    </CardDescription>
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

export default AchievementsPage
