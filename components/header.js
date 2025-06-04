'use client'
import Link from "next/link";
import { useTheme } from "./themeProvider";

export default function Header() {
    const { colors } = useTheme();

    const primary = colors[1]
    const secondary = colors[2]
    const accent = colors[3]
    return (
        <div className=" flex my-9 justify-center">
            <nav className="flex justify-start sm:ml-32 ml-8 font-semibold md:text-2xl xl:text-5xl">
                <div>
                    <Link href={'/'}>
                    <p>HOME</p>
                    </Link>
                </div>
            </nav>
            <nav className="flex justify-end w-full font-semibold md:text-2xl xl:text-5xl gap-10 mr-8">
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