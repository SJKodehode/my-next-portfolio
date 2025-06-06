// pages/home.jsx (eller index.jsx hvis du kaller filen slik)
'use client';

import * as motion from 'motion/react-client';
import Skills from "@/components/skills";
import AboutMe from "@/components/aboutMe";
import ScrollTriggered from '@/components/motion/scroll';
import Rotate from '@/components/motion/rotate';

export default function Home() {
  // Variants for fornavn/etternavn
  const nameVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenBottom: { y: 100, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  // Variants for undertekst
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main>
      <div className="p-8 flex flex-col md:justify-around justify-center -mt-40 md:-mt-10 items-left h-[100vh]">
        {/* Fornavn slidere inn fra venstre */}
        <motion.h1
          className="md:text-[11vw] text-6xl font-semibold"
          variants={nameVariants}
          initial="hiddenLeft"
          animate="visible"
          transition={{ type: 'spring', stiffness: 120, duration: 0.8 }}
        >
          JØRGEN
        </motion.h1>

        {/* Etternavn slidere inn fra høyre, med litt delay */}
        <motion.h1
          className="md:text-[11vw] text-6xl font-semibold mb-4 w-full text-right"
          variants={nameVariants}
          initial="hiddenBottom"
          animate="visible"
          transition={{ type: 'spring', stiffness: 120, duration: 0.8, delay: 0.2 }}
        >
          SØRHEIM
        </motion.h1>
        <Rotate />

        {/* Undertekst fader inn med delay */}
        <motion.section
          className="mb-12"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="md:text-2xl font-semibold mb-2">
            Front-end developer with a love for UI/UX
          </h2>
        </motion.section>
      </div>

      {/* ========================= */}
      {/* Skills-seksjon med lett pop */}
      {/* ========================= */}

        <Skills />

      {/* ========================= */}
      {/* AboutMe-seksjon med fade */}
      {/* ========================= */}
        <AboutMe />
    </main>
  );
}
