"use client";

import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import shop from "/shop images.avif";
const images = [
  "/gleary/Imag1.avif",
  "/gleary/gl3.avif",
  "/gleary/gl4.avif",
  "/gleary/gl5.avif",
  "/gleary/gl6.avif",
  "/gleary/gl7.jpg",
  "/gleary/gl8.jpg",
  "/gleary/gl9.jpg",
  "/gleary/image2.avif",
  "/gleary/About2.avif",
  "/gleary/sliderhome.webp",
];

export function About() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    setTimeout(() => setAnimationStarted(true), 1000);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLightbox((prev) =>
          prev !== null ? (prev + 1) % images.length : null,
        );
      if (e.key === "ArrowLeft")
        setLightbox((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null,
        );
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  // Mouse drag to scroll film strip
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (stripRef.current?.offsetLeft || 0);
    scrollLeft.current = stripRef.current?.scrollLeft || 0;
    setIsPaused(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - (stripRef.current.offsetLeft || 0);
    stripRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="about"
      className="relative pb-16 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight text-center">
            Our Gallery
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A glimpse into The Core Mall — click any image to view
          </p>
        </div>

        {/* Film Strip */}
        <div className="relative max-w-full mx-auto">
          <div
            className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden"
            style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
          >
            {/* Top Perforations */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black z-20 overflow-hidden">
              <div
                className={`flex items-center justify-between px-8 h-full ${animationStarted && !isPaused ? "perforations-scroll-animation" : ""}`}
                style={{ width: "200%" }}
              >
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-4 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Perforations */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black z-20 overflow-hidden">
              <div
                className={`flex items-center justify-between px-8 h-full ${animationStarted && !isPaused ? "perforations-scroll-animation" : ""}`}
                style={{ width: "200%" }}
              >
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-4 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Scrollable Strip */}
            <div
              ref={stripRef}
              className="relative py-10 px-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <div
                className={`flex ${animationStarted && !isPaused ? "film-scroll-animation" : ""}`}
                style={{ width: "max-content", gap: "20px" }}
              >
                {[...images, ...images].map((src, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 overflow-hidden rounded-xl border-2 border-gray-600 hover:border-accent-purple transition-all duration-300 cursor-pointer group"
                    style={{
                      width: "380px",
                      height: "260px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                    onClick={() => setLightbox(index % images.length)}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${(index % images.length) + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto py-10">
        <div className="relative bg-white rounded-2xl p-4 overflow-hidden">
          {/* Film grain overlay for authenticity */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none border-2  bogder-black "
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
              backgroundSize: "4px 4px",
            }}
          />

          {/* Main gallery image */}
          <img
            src={shop}
            alt="Shop images"
            className="w-full h-auto rounded-xl border-4 border-black"
            style={{
              filter: "contrast(1.05) saturate(1.1) brightness(0.95)",
            }}
          />

          {/* Subtle overlay gradient for depth */}
          <div
            className="absolute inset-4 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 20%, transparent 80%, rgba(124,58,237,0.03) 100%)",
            }}
          />
        </div>

        
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <img
            src={images[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
