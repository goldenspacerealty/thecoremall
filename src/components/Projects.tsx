"use client";
import { Button } from "./ui/button";

export function Projects() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-12">
      {/* Container for the image - relative to allow the card to sit on top */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-xl">
        {/* Background Image */}
        <img
          src="/About2.avif"
          alt="The Core Mall Ghaziabad"
          className="absolute right-0 top-0 h-[700px] sm:h-full w-full sm:w-2/3 object-cover object-center"
        />

        {/* White Content Card */}
        <div className="absolute left-0 top-1/2 sm:top-1/2 -translate-y-1/2 w-full sm:w-1/2 lg:w-3/6 z-10">
          <div className="bg-white/10 backdrop-blur-md sm:bg-white p-8 md:p-16 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-light text-white sm:text-gray-900 mb-6 text-center lg:text-left">
              Discover the Essence of <br />
              <span className="font-semibold">The Core Mall Ghaziabad</span>
            </h2>

            <p className="text-white/80 sm:text-gray-600 text-sm md:text-base leading-relaxed mb-8 text-center lg:text-left max-w-xl">
              <span className="font-semibold underline">
                The Core Mall Ghaziabad
              </span>{" "}
              The Core Mall Ghaziabad is a thoughtfully designed commercial
              destination blending luxury retail, studio apartments, and
              entertainment to offer high-growth investment opportunities. This
              space aims to provide an unmatched experience for businesses and
              consumers alike.
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="#amenities">
                <Button className="bg-accent-purple hover:bg-accent-purple/80 text-white px-8 py-6 rounded-full text-lg font-medium transition-all">
                  See Our Projects
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
