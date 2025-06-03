import React, { useEffect, useState } from "react"

const courses = [
  {
    name: "MBA",
    color: "#d82f5a",
    url: "https://mitnepal.edu.np/course/mba",
    description:
      "Masters of Business Administration (MBA) at MIT bridges academic theory and real-world business challenges to enhance students' business acumen through practical problem-solving.",
    image: "/mba.jpg",
    angle: -70,
    distance: 160,
  },
  {
    name: "BBA",
    color: "#0068b3",
    url: "https://mitnepal.edu.np/course/bba",
    description:
      "A Bachelor of Business Administration (BBA) is a bachelor's degree that helps you establish a fundamental understanding of business and how various aspects of it apply to the real world.",
    image: "/bba.jpg",
    angle: 0,
    distance: 190,
  },
  {
    name: "BIT",
    color: "#e78732",
    url: "https://mitnepal.edu.np/course/bit",
    description:
      "Bachelor of Information Technology at MIT is a four-year, 129-credit undergraduate degree program based on a holistic understanding of information technology.",
    image: "/bit.jpg",
    angle: 70,
    distance: 160,
  },
]

export default function CourseArmsAnimation() {
  const [step, setStep] = useState(0) // 0: only center, 1: MBA, 2: BBA, 3: BIT, 4: details

  useEffect(() => {
    let timers = []
    timers.push(setTimeout(() => setStep(1), 600))
    timers.push(setTimeout(() => setStep(2), 1200))
    timers.push(setTimeout(() => setStep(3), 1800))
    timers.push(setTimeout(() => setStep(4), 2400))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Helper for arm position and animation
  const getArmStyle = (angle, distance, show) => {
    const rad = (angle * Math.PI) / 180
    const x = Math.cos(rad) * distance
    const y = Math.sin(rad) * distance
    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: show
        ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
        : "translate(-50%, -50%) scale(0.5)",
      opacity: show ? 1 : 0,
      transition: "all 0.7s cubic-bezier(.4,2,.6,1)",
      zIndex: 20,
      pointerEvents: show ? "auto" : "none",
    }
  }

  // Helper for arm line
  const getLineStyle = (angle, distance, show) => {
    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: show ? distance : 0,
      height: 4,
      background: "#e5e7eb",
      borderRadius: 2,
      transform: `translateY(-50%) rotate(${angle}deg)`,
      transformOrigin: "0 50%",
      opacity: show ? 1 : 0,
      transition: "all 0.7s cubic-bezier(.4,2,.6,1)",
      zIndex: 10,
      pointerEvents: "none",
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[650px]">
      {/* Central MIT Circle */}
      <div
        className="absolute left-1/2 top-1/2 z-30 flex items-center justify-center rounded-full bg-white border-4 border-gray-200 shadow-xl"
        style={{
          width: step > 0 ? 160 : 80,
          height: step > 0 ? 160 : 80,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.7s cubic-bezier(.4,2,.6,1), height 0.7s cubic-bezier(.4,2,.6,1)",
        }}
      >
        <span className="text-3xl font-bold text-gray-700 select-none">MIT</span>
      </div>

      {/* Arms and Course Buttons */}
      {courses.map((course, idx) => (
        <React.Fragment key={course.name}>
          {/* Arm line */}
          <div style={getLineStyle(course.angle, course.distance - 60, step > idx)} />
          {/* Course Button, Description, and Image */}
          <div style={getArmStyle(course.angle, course.distance, step > idx)}>
            <div className="flex flex-col items-center group">
              <a
                href={course.url}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg font-bold text-lg text-white mb-2 transition-transform duration-300 hover:scale-110"
                style={{
                  background: course.color,
                  boxShadow: `0 4px 24px 0 ${course.color}55`,
                }}
                tabIndex={step > idx ? 0 : -1}
              >
                {course.name}
              </a>
              <div
                className="w-56 bg-white rounded-lg shadow-lg p-3 mt-2 text-center transition-all duration-700"
                style={{
                  opacity: step === 4 ? 1 : 0,
                  transform:
                    step === 4 ? "translateY(0)" : "translateY(30px)",
                  pointerEvents: step === 4 ? "auto" : "none",
                  transitionDelay: step === 4 ? "0.2s" : "0s",
                }}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-24 object-cover rounded mb-2"
                  style={{ background: "#f3f4f6" }}
                  loading="lazy"
                />
                <p className="text-gray-700 text-sm">{course.description}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}

      {/* Apply Now Button */}
      <div
        className="absolute left-1/2 top-1/2 z-40"
        style={{
          transform:
            step > 3
              ? "translate(-50%, 120px)"
              : "translate(-50%, -50%) scale(0.5)",
          opacity: step > 3 ? 1 : 0,
          transition: "all 0.7s cubic-bezier(.4,2,.6,1)",
          pointerEvents: step > 3 ? "auto" : "none",
        }}
      >
        <a
          href="https://mitnepal.edu.np/course/apply/course"
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-2xl border-4 border-white hover:scale-105 transition"
        >
          Apply Now
        </a>
      </div>

      {/* Animation for fade-in */}
      <style>{`
        .group:hover .w-56 {
          box-shadow: 0 8px 32px 0 #00000022;
        }
      `}</style>
    </div>
  )
}
