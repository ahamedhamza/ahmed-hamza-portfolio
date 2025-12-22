import { motion } from "framer-motion";
import cloudBg from "@/assets/cloud-bg.jpg";

export const Background = () => {
  return (
    <div 
      className="w-screen h-screen fixed top-0 -z-10 flex justify-center"
      style={{
        backgroundImage: 'radial-gradient(50% 50%, rgb(26, 26, 26) 0%, rgb(0, 0, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Cloud background image with zoom intro animation */}
      <motion.div 
        className="w-full h-full opacity-[10%] absolute inset-0"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <img 
          src={cloudBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Vertical grid lines */}
      <GridLines />
    </div>
  );
};

const GridLines = () => {
  return (
    <div className="fixed top-0 w-[101%] h-full max-w-5xl flex justify-between pointer-events-none">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-accent/10 h-full w-[1px] animate-line-grow"
          style={{ 
            transformOrigin: index % 2 === 0 ? 'center top' : 'center bottom',
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default Background;
