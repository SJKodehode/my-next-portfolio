// components/aboutMe.js
'use client';

import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import CannonBall from "./wreckingBall";
import Image from "next/image";

import { useTheme } from './themeProvider';

export default function AboutMe() {
    const { colors } = useTheme();

    const primary = colors[1]
    const secondary = colors[2]
    const accent = colors[3]
  // Tekstene vi ønsker å vise med typewriter-effekt
  const paragraph1 =
    "A front-end developer with a passion for bold and exciting design. I have extensive knowledge in modern web technologies that I use to get a fully tailored solution.";
  const paragraph2 =
    "When I'm not coding, I explore new technologies, stay updated with industry trends, and experiment with personal projects to apply what I've learned.";

  // Hastighet per tegn i ms
  const typeSpeed = 30;
  // Ekstra pause (500 ms) etter at første paragraf er ferdig
  const pauseAfterFirst = 700;
  // Total forsinkelse for når vi skal vise andre paragraf
  const totalDelaySecond = paragraph1.length * typeSpeed + pauseAfterFirst;

  // State for om andre paragraf skal rendres
  const [showSecond, setShowSecond] = useState(false);

  // useEffect for å skru på andre paragraf etter totalDelaySecond
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecond(true);
    }, totalDelaySecond);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex relative flex-col justify-center w-full sm:h-[60vh] h-dvh min-h-[900px] lg:min-h-auto my-28 items-center">
      <h2 className="text-3xl mb-16 font-bold">About Me</h2>

      <div className=" flex sm:flex-row flex-col-reverse text-lg font-normal gap-8">
        <div className="max-w-[30rem] flex flex-col justify-center rounded-4xl px-8 gap-3 py-8 z-10 mx-4"
             style={{
                backgroundColor: colors[1],
                color: colors[0]
             }}
             
        >
          {/* Første avsnitt med typewriter-effekt */}
          <p className="">
            <Typewriter
              words={[paragraph1]}
              cursor
              cursorStyle="|"
              typeSpeed={typeSpeed}
              delaySpeed={1000} /* Pause etter at første er ferdig (kun visuell, ikke avgjør start av andre) */
            />
          </p>

          {/* Andre paragraf rendres først etter totalDelaySecond */}
          {showSecond && (
            <p className=" opacity-90">
              <Typewriter
                words={[paragraph2]}
                cursor
                cursorStyle="|"
                typeSpeed={typeSpeed}
                delaySpeed={1000} /* Pause etter at andre er ferdig om man vil loope */
              />
            </p>
          )}
        </div>

        {/*
        <div className="rounded-4xl -ml-[8rem]">
          <CannonBall width={700} height={100} />
        </div>
        */}

        <div className="rounded-4xl overflow-hidden mx-4 sm:w-60 self-center">
          <Image
            src="/images/chess-img.jpg"
            width={500}
            height={500}
            alt="Chess image of me"
          />
        </div>
      </div>
    </div>
  );
}
