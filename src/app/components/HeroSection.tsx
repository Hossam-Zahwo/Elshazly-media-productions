'use client';

import React from 'react';
import { FaPlayCircle } from 'react-icons/fa'; // ✅ استيراد الأيقونة

export default function HeroSection() {
  return (
    <section className="relative text-center py-28 bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* ✅ لوجو الشركة */}
        <img
          src="/V-removebg-preview.png"
          alt="لوجو Elshazly Media Productions"
          className="w-60 sm:w-72 md:w-80 lg:w-96 mb-6"
        />

        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          بنصنع لحظات لا تُنسى، ونحولها لقصص حقيقية تلمس القلوب وتتشاف بوضوح.
        </p>

        <a
          href="#showreel"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-gray-200 transition"
        >
          <FaPlayCircle className="text-xl" />
          شوف شغلنا
        </a>
      </div>
    </section>
  );
}
