"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const slides = [
  { type: "image", src: "/sliderhome.webp" },
  { type: "image", src: "/image2.avif" },

  { type: "image", src: "/sliderhome.webp" },
  { type: "image", src: "/sliderhome.webp" },
];

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play slider — switch every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Show background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure video is muted immediately on load to prevent any audio
  useEffect(() => {
    if (videoRef.current) {
      console.log("Video element found, setting up...");
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;

      // Add event listeners for debugging
      videoRef.current.addEventListener("loadstart", () =>
        console.log("Video: loadstart"),
      );
      videoRef.current.addEventListener("loadedmetadata", () =>
        console.log("Video: loadedmetadata"),
      );
      videoRef.current.addEventListener("canplay", () =>
        console.log("Video: canplay"),
      );
      videoRef.current.addEventListener("playing", () =>
        console.log("Video: playing"),
      );
      videoRef.current.addEventListener("error", (e) =>
        console.error("Video error:", e),
      );

      // Force mute on play
      videoRef.current.addEventListener("play", () => {
        if (videoRef.current) {
          console.log("Video play event fired");
          videoRef.current.muted = isMuted;
          videoRef.current.volume = isMuted ? 0 : 0.7;
        }
      });

      // Try to play the video
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Video autoplay successful"))
          .catch((error) => console.error("Video autoplay failed:", error));
      }
    }
  }, []);

  // Update video mute state when isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* SLIDER BACKGROUND */}
      <AnimatePresence mode="wait">
        {slides[currentSlide].type === "video" ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover scale-110"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slides[0].src} type="video/webm" />
            </video>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].src}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Full-Width Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src="/logo.avif" alt="MOJJU" className="h-8 w-auto" />
            </motion.div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105">Overview</a>
              <a href="#highlights" className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105">Highlights</a>
              <a href="#amenities" className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105">Amenities</a>
              <a href="#plans" className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105">Floor Plans</a>
              <a href="#location" className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105">Location</a>
            </div>

            {/* Right Side - Video Controls + CTA + Mobile Menu */}
            <div className="flex items-center space-x-3 relative">
              {/* Video Controls with Sound On indicator */}

              {/* CTA Button - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:block bg-red-600 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 gentle-animation ml-4 cursor-pointer"
              >
                Enquire
              </motion.button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer z-[120] relative"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? "0%" : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[90] mobile-menu-panel pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Close Button at the top */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col px-6 pb-6 h-full">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4 text-white">
              <a href="#about" className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Overview</a>
              <a href="#highlights" className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Highlights</a>
              <a href="#amenities" className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Amenities</a>
              <a href="#plans" className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Floor Plans</a>
              <a href="#location" className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>Location</a>
            </div>

            {/* Mobile CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 active:bg-red-800 gentle-animation mt-8 cursor-pointer"
            >
              Enquire
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Big Studio Title - Lower Left */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute top-[40%] left-6 sm:left-8 lg:left-12 z-40"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white">
            <span className="block">The Core Mall</span>
          </h1>
          <p className="text-gray-300 text-lg mt-4">
            Quality Shopping Experience at Concept Capital Aesthetically built
            project in Ghaziabad offering modern conveniences for a quality
            living experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-all"
            >
              Schedule a Visit
            </a>
            <a
              href="#amenities"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/50 hover:bg-white/10 text-white font-semibold rounded-md transition-all"
            >
              Discover the Project
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
