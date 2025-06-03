"use client"
import dynamic from "next/dynamic"

const CourseArmsAnimation = dynamic(() => import("@/components/CourseArmsAnimation"), { ssr: false })

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CourseArmsAnimation />
    </div>
  )
}
