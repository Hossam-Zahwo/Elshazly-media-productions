'use client'; // ✅ ضروري جدًا لحل مشكلة hydration

import { useEffect, useState } from 'react';
import MediaSection from './components/MediaSection';
import SectionFilter from './components/SectionFilter';
import { MediaItem } from './lib/media'; 
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

const sections = ['Wedding', 'Events', 'Production', 'Company', 'Catering', 'Showreel'];

export default function HomePage() {
  const [selectedSection, setSelectedSection] = useState('Wedding');
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/data/${selectedSection.toLowerCase()}.json`);
        if (!res.ok) throw new Error('فشل التحميل');
        const json = await res.json();
        setMedia(json);
      } catch (err) {
        console.error('Error loading data:', err);
        setMedia([]);
      }
    };

    loadData();
  }, [selectedSection]);

  return (
    <main>
      <HeroSection />
      <SectionFilter current={selectedSection} setSection={setSelectedSection} />
      <MediaSection title={selectedSection} media={media} />
    
      
    
      <AboutSection />
      <ContactSection />

    </main>
  );
}
