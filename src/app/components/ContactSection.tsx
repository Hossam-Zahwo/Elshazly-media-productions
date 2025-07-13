'use client';
import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const links = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/201234567890',
    icon: <FaWhatsapp />,
    color: 'text-green-500',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourpage',
    icon: <FaFacebookF />,
    color: 'text-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourpage',
    icon: <FaInstagram />,
    color: 'text-pink-500',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@yourpage',
    icon: <FaTiktok />,
    color: 'text-white',
  },
];

export default function ContactSection() {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-3xl font-bold mb-10">تواصل معانا على السوشيال</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-32 h-32 rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center hover:bg-white hover:text-black transition duration-300 shadow-md"
          >
            <div className={`text-4xl mb-2 transition-transform group-hover:scale-125 ${link.color}`}>
              {link.icon}
            </div>
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
