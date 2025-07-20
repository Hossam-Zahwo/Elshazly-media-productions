'use client';

const items = [
  { type: 'image', url: '/gallery/1.jpg' },
  { type: 'video', url: 'https://www.youtube.com/embed/xyz123' },
  { type: 'image', url: '/gallery/2.jpg' },
];

export default function GallerySection() {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-12">أعمالنا</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
            {item.type === 'image' ? (
              <img src={item.url} alt="Gallery item" className="w-full h-64 object-cover" />
            ) : (
              <iframe
                src={item.url}
                title="Video"
                className="w-full h-64"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
