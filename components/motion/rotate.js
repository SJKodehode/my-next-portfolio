import * as motion from "motion/react-client"

export default function Rotate() {
    return (
        <div className="flex gap-8">
        <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.90}}
            />
        <motion.div 
            style={box}
            animate={{ rotate: 720 }}
            transition={{ duration: 0.2}}
            whileTap={{ scale: 0.80}}
            whileHover={{ scale: 1.10 }}
            />
        
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
}
