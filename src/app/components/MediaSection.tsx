'use client';

import { useState } from "react";
import { MediaItem } from "../lib/media";
import { FaPlayCircle, FaTimesCircle, FaPhotoVideo } from "react-icons/fa";

interface MediaSectionProps {
  title: string;
  media: MediaItem[];
}

const getYouTubeEmbedUrl = (url: string): string => {
  const shortMatch = url.match(/youtu\.be\/([^\?&]+)/);
  const longMatch = url.match(/youtube\.com\/watch\?v=([^\?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^\?&]+)/);
  const id = shortMatch?.[1] || longMatch?.[1] || embedMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

export default function MediaSection({ title, media }: MediaSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  return (
    <>
      <section className="px-6 sm:px-12 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center border-l-4 border-yellow-400 pl-4 flex items-center justify-center gap-2">
          <FaPhotoVideo className="text-yellow-400" /> {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {media.length > 0 ? (
            media.map((item) => (
              <div key={item.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                  {item.type === 'image' ? (
                    <FaPhotoVideo className="text-blue-400" />
                  ) : (
                    <FaPlayCircle className="text-red-500" />
                  )}
                  {item.title}
                </h3>

                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-60 object-cover rounded"
                  />
                ) : (
                  <div
                    onClick={() => setSelectedVideo(item)}
                    className="w-full h-60 bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer flex items-center justify-center rounded border border-gray-600 group"
                  >
                    <FaPlayCircle className="text-white text-5xl opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full flex justify-center items-center gap-2">
              <FaTimesCircle /> لا يوجد محتوى حاليًا لهذا القسم.
            </p>
          )}
        </div>
      </section>

      {/* Popup Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
          <div className="relative max-w-4xl w-full aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.url)}
              title={selectedVideo.title}
              className="w-full h-full rounded-lg shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-6 -right-6 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
            >
              <FaTimesCircle className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
