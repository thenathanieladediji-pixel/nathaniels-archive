"use client";

import { motion } from "framer-motion";
import Collections from "@/components/Collections";
import SearchArchive from "@/components/SearchArchive";
import FeaturedWork from "@/components/FeaturedWork";
import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden overflow-x-hidden bg-black px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">


        {/* Base background glow */}
        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.14),transparent_60%)]
          "
        />


        {/* Luxury ambient glow spots */}

        <div
          className="
          absolute
          left-[-180px]
          top-[20%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-orange-500/10
          blur-[140px]
          "
        />


        <div
          className="
          absolute
          right-[-200px]
          bottom-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-orange-400/10
          blur-[160px]
          "
        />


        <div
          className="
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/5
          blur-[120px]
          "
        />



        {/* HERO RIBBON - LEFT ENTRY */}

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >


          {/* Main ribbon */}

          <motion.path

            d="
            M-200 700
            C250 150 500 150 800 450
            C1100 750 1350 750 1800 200
            "

            stroke="#ff7a00"
            strokeWidth="3"
            strokeLinecap="round"


            initial={{
              pathLength:0,
              opacity:0
            }}


            animate={{
              pathLength:1,
              opacity:1,

              x:[0,12,0],
              y:[0,-6,0]
            }}


            transition={{

              pathLength:{
                duration:4,
                ease:"easeInOut"
              },

              opacity:{
                duration:1
              },

              x:{
                duration:8,
                repeat:Infinity,
                ease:"easeInOut"
              },

              y:{
                duration:8,
                repeat:Infinity,
                ease:"easeInOut"
              }

            }}


            style={{
              filter:
              "drop-shadow(0 0 35px rgba(255,122,0,0.85))"
            }}

          />





          {/* Ribbon soft glow trail */}

          <motion.path

            d="
            M-200 720
            C250 170 500 170 800 470
            C1100 770 1350 770 1800 220
            "


            stroke="#ffb15c"
            strokeWidth="1"
            strokeLinecap="round"


            initial={{
              pathLength:0,
              opacity:0
            }}


            animate={{
              pathLength:1,
              opacity:0.45,

              x:[0,-10,0],
              y:[0,5,0]
            }}


            transition={{

              pathLength:{
                duration:5,
                ease:"easeInOut"
              },

              opacity:{
                duration:2
              },

              x:{
                duration:10,
                repeat:Infinity,
                ease:"easeInOut"
              },

              y:{
                duration:10,
                repeat:Infinity,
                ease:"easeInOut"
              }

            }}


            style={{
              filter:
              "drop-shadow(0 0 18px rgba(255,177,92,0.8))"
            }}

          />

        </svg>





        {/* BRAND */}

        <motion.div

          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6"

          initial={{
            opacity:0,
            y:30
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:1,
            delay:1
          }}

        >



          {/* Nathaniel's */}

          <motion.h1

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:1,
              delay:1.2
            }}

            className="
            font-signature
            text-4xl
            font-light
            italic
            tracking-wide
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            "

          >
            Nathaniel's
          </motion.h1>





          {/* Archive */}

          <motion.h2

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:1,
              delay:1.5
            }}

            className="
            mt-2
            text-4xl
            font-semibold
            uppercase
            tracking-[0.28em]
            sm:mt-3
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            "

          >

            ARCHIVE

          </motion.h2>





          {/* Subtitle */}

          <motion.p

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            transition={{
              delay:2.5,
              duration:1
            }}

            className="
            mt-8
            text-[0.65rem]
            uppercase
            tracking-[0.4em]
            text-white/50
            sm:mt-10
            sm:text-xs
            sm:tracking-[0.5em]
            "

          >

            Designer • Strategist • Builder

          </motion.p>



        </motion.div>





        {/* Scroll indicator */}

        <motion.div

          initial={{
            opacity:0,
            y:20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:3,
            duration:1
          }}

          className="
          absolute
          bottom-6
          left-1/2
          z-20
          -translate-x-1/2
          sm:bottom-10
          "

        >

          <motion.p

            animate={{
              y:[0,8,0]
            }}

            transition={{
              duration:2,
              repeat:Infinity,
              ease:"easeInOut"
            }}

            className="
            text-xs
            uppercase
            tracking-[0.5em]
            text-white/40
            "

          >

            Scroll to explore ↓

          </motion.p>


        </motion.div>



      </main>


         <FeaturedWork />
<Collections />
<SearchArchive />
<AboutPreview />
<ContactSection />
    </>
  );
}