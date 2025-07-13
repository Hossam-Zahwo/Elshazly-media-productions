'use client';
import React from 'react';

const services = [
  { title: 'Wedding', emoji: '💍' },
  { title: 'Events', emoji: '🎉' },
  { title: 'Production', emoji: '🎬' },
  { title: 'Company', emoji: '🏢' },
  { title: 'Catering', emoji: '🍽️' },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-[#111] text-white text-center">
      <h2 className="text-3xl font-bold mb-10">الخدمات</h2>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-6 md:px-16">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-[#1a1a1a] p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-2">{service.emoji}</div>
            <div className="font-semibold text-lg">{service.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}