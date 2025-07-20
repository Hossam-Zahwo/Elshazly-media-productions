'use client';

interface SectionFilterProps {
  current: string;
  setSection: (section: string) => void;
}

const sections = ['Wedding', 'Events', 'Production', 'Company', 'Catering', 'Showreel'];


export default function SectionFilter({ current, setSection }: SectionFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-8 py-4 rounded-lg shadow-lg">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setSection(section)}
          className={`px-4 py-2 rounded-lg font-medium border transition duration-200 ${
            current === section
              ? 'bg-yellow-400 text-black border-yellow-500 scale-105 shadow-lg'
              : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
}
