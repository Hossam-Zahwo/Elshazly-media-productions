'use client';
import React from 'react';

export default function AboutSection() {
  return (
    <section className="relative py-20 px-6 md:px-20 bg-gradient-to-b from-black via-[#111] to-black text-white overflow-hidden">
      {/* خلفية شكلية خفيفة */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-500 opacity-10 blur-3xl rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 opacity-10 blur-3xl rounded-full -z-10 animate-pulse" />

      <h2 className="text-4xl sm:text-5xl font-extrabold my-6 p-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-md">
      Elshazly Media Productions
      </h2>

      <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto text-gray-200 text-center">
    بتحوّل فكرتك لصورة احترافية.
من التصوير للإنتاج، بننفذ كل حاجة بإبداع ودقّة.
رؤيتك… نخلقها بصريًا.


      </p>
    </section>
  );
}
