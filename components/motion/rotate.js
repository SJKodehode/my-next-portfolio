import * as motion from "motion/react-client"
import { useTheme } from "../themeProvider"
import { spring } from "framer-motion"

export default function Rotate() {
    const { colors } = useTheme()
    const box = {
        width: '8vw',
        height: '8vw',
        backgroundColor: colors[2],
        borderRadius: 0,
    }


    return (
        <div className="hidden md:flex gap-1 md:gap-8 w-[85vw] justify-start bottom-0 md:bottom-auto absolute left-4 md:left-10 2xl:mt-28">
        <div className=" pb-40 mb-40">

        <motion.div className=" opacity-40"
            style={box}
            
            whileTap={{
                scale: 0.95,
                transition: { duration: 0.2, }
            }}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, delay: 0 }
                
            }}
            drag="y"
            dragMomentum={false}
            dragConstraints={{top: 0, bottom: 320}}
            initial={{
                y: 320,
                
            }}
            animate={{
                y: 160,
                transition: { type: spring, duration: 1, delay: 0.8 }
            }}
            
            />
            </div>
        <div className=" mt-40">
        <motion.div className="shadow-2xs mt-40 opacity-60"
            style={box}
            // whileTap={{ rotate: -6}}
            whileHover={{ 
                scale: 1.10,
                transition: { duration: 0.2, delay: 0 }
            }}
            drag="y"
            dragMomentum={false}
            dragConstraints={{top: -160, bottom: 0}}
            initial={{
                y: 0,
            }}
            animate={{
                y: -160,
                transition: { type: spring, duration: 1, delay: 0.4 }
            }}
            
            />
            </div>
        <motion.div className=" mt-40 opacity-80"
            style={box}
            transition={{ type: spring, duration: 1 }}
            // whileTap={{ rotate: -6}}
            whileHover={{ 
                scale: 1.10
            }}
            drag="x"
            dragMomentum={false}
            dragConstraints={{left: 0, right: 0}}
            initial={{
                x: -460,
            }}
            animate={{
                x: 0,
                
            }}
            />
        
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

