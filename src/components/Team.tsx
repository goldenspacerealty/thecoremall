"use client";

import { useState } from "react";

const floorData = [
  {
    id: 1,
    floor: "LOWER GROUND FLOOR",
    area: "45,000",
    description:
      "A shopping center is a vibrant hub of diverse independent stores, offering a dynamic retail experience with a wide array of products.",
    image:
      "https://coremall.site/wp-content/uploads/2023/03/Lower-Ground-Floor-1.jpg",
  },

  {
    id: 2,
    floor: "UPPER GROUND FLOOR",
    area: "28,464",
    description:
      "A shopping center is a vibrant hub of diverse independent stores, offering a dynamic retail experience with a wide array of products.",
    image: "/Upper-Ground-Floor.jpg",
  },

  {
    id: 3,
    floor: "FIRST FLOOR",
    area: "45,000",
    description:
      "A shopping center is a vibrant hub of diverse independent stores, offering a dynamic retail experience with a wide array of products.",
    image:
      "https://coremall.site/wp-content/uploads/2023/03/Lower-Ground-Floor-1.jpg",
  },

  {
    id: 4,
    floor: "SECOND FLOOR",
    area: "23,661",
    description:
      "Mall food stores offer a delectable array of culinary delights, ranging from international cuisines to local favorites. Explore diverse flavors and enjoy a delightful dining experience within the mall.",
    image: "/Second-Floor.jpg",
  },

  {
    id: 5,
    floor: "THIRD - TENTH FLOOR",
    area: "25,644",
    description:
      "The mall’s cinema is a cinematic haven, offering a diverse selection of films. With state-of-the-art facilities, it provides an immersive entertainment experience for movie enthusiasts in a convenient mall setting.",
    image: "/Third-Floor.jpg",
  },
];

export function Team() {
  const [activeFloor, setActiveFloor] = useState(floorData[0]);

  return (
    <section id="plans" className="w-full bg-[#f5f5f5] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Heading */}
        <div className="mb-16 text-center">
          <h3 className="text-accent-purple text-3xl md:text-5xl font-light tracking-wide uppercase">
            HAVE A QUESTION?
          </h3>

          <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-tight mt-3 uppercase">
            WE ARE GLAD TO CONSULT YOU!
          </h2>
        </div>

        {/* Floor Heading + Tabs */}
        <div className="flex flex-col xl:flex-row gap-10 xl:items-start mb-14">
          {/* Left Side Title */}
          <div className="min-w-[240px]">
            <h2 className="text-5xl md:text-7xl font-light text-accent-purple leading-none uppercase">
              FLOOR
            </h2>

            <h2 className="text-5xl md:text-7xl font-bold text-[#111827] leading-none mt-2 uppercase">
              PLANS
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            {floorData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveFloor(item)}
                className={`px-6 py-4 border text-sm md:text-base font-medium transition-all duration-300 uppercase tracking-wide

                ${
                  activeFloor.id === item.id
                    ? "bg-accent-purple text-white border-accent-purple"
                    : "bg-white text-black border-gray-300 hover:bg-accent-purple hover:text-white"
                }
                `}
              >
                {item.floor}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative w-full h-[350px]  overflow-hidden shadow-2xl">
            <img
              src={activeFloor.image}
              alt={activeFloor.floor}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Overlay Label */}
          </div>

          {/* Right Content */}
          <div>
            <p className="text-gray-600 text-lg leading-9 mb-12">
              {activeFloor.description}
            </p>

            {/* Floor */}
            <div className="border-b border-gray-300 pb-6 mb-6 flex items-center justify-between">
              <span className="text-gray-500 uppercase tracking-wider text-sm">
                FLOOR
              </span>

              <span className="font-semibold text-[#111827] text-lg uppercase">
                {activeFloor.floor}
              </span>
            </div>

            {/* Area */}
            <div className="border-b border-gray-300 pb-6 mb-10 flex items-center justify-between">
              <span className="text-gray-500 uppercase tracking-wider text-sm">
                AREA M2
              </span>

              <span className="font-semibold text-[#111827] text-lg">
                {activeFloor.area}
              </span>
            </div>

            {/* Button */}
            <a href="#location"
              className="inline-block bg-accent-purple hover:bg-accent-purple/80 transition-all duration-300 text-white px-14 py-5 text-lg font-semibold tracking-wide uppercase"
            >
              Schedule
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
