'use client'
import Link from "next/link";
import { useTheme } from "./themeProvider";

export default function Header() {
    const { colors } = useTheme();

    const primary = colors[1]
    const secondary = colors[2]
    const accent = colors[3]
    return (
        <div className=" flex my-4 md:my-9 justify-center">
            <nav className="flex justify-start ml-8 font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                <div>
                    <Link href={'/'}>
                    <p>HOME</p>
                    </Link>
                </div>
            </nav>
            <nav className="flex justify-end w-full font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl gap-4 md:gap-10 mr-8 md:flex-row flex-col items-end">
                <div>
                    <Link href={'#'}>
                    <p style={{color: primary}}>ABOUT ME</p>
                    </Link>
                </div>

                <div>
                    <Link href={'#'}>
                    <p style={{color: secondary}}>PROJECTS</p>
                    </Link>

                </div>
                <div>
                    <Link href={'#'}>
                    <p style={{color: accent}}>CONTACT</p>
                    </Link>
                </div>
            </nav>  
        </div>
    )
}