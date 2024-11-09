// ./src/components/frontend/TeacherCard.js
import React from 'react';
import { Card } from "@/components/ui/card";
import { Facebook, Mail, Instagram } from "lucide-react";

function TeacherCard({ name, subject, description, imageUrl, socials }) {
  return (
    <Card className="group relative overflow-hidden bg-gray-300 hover:shadow-lg transition-all duration-300 max-w-[300px] w-full mx-auto">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_0,transparent_50%)] [background-size:10px_10px]"
        aria-hidden="true"
      />

      {/* Image section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
      </div>

      {/* Content section */}
      <div className="relative p-5 space-y-3">
        {/* Decorative line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Name and social links */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-sm font-medium text-blue-600">{subject}</p>
          </div>

          {/* Social buttons */}
          <div className="flex gap-2">
            {socials?.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Facebook size={18} />
              </a>
            )}

            {socials?.email && (
              <a
                href={`mailto:${socials.email}`}
                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <Mail size={18} />
              </a>
            )}

            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Instagram size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>
    </Card>
  );
}

export default TeacherCard;
