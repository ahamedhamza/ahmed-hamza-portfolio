import { motion, type Variants } from "framer-motion";

interface NameDisplayProps {
  name?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const containerVariantsReverse: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
      delayChildren: 0.6,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const NameDisplay = ({ name = "Ahamed Hamza" }: NameDisplayProps) => {
  const words = name.split(" ");

  return (
    <div className="flex flex-col justify-center items-center">
      {words.map((word, wordIndex) => (
        <motion.div
          key={wordIndex}
          className={`flex items-end overflow-hidden ${wordIndex > 0 ? "mt-2 md:mt-4" : ""}`}
          variants={wordIndex === 0 ? containerVariants : containerVariantsReverse}
          initial="hidden"
          animate="visible"
        >
          {word.split("").map((char, charIndex) => {
            // Use SVG for capital A only
            if (char === "A") {
              return (
                <motion.div
                  key={`${wordIndex}-${charIndex}`}
                  className="overflow-hidden"
                  variants={letterVariants}
                >
                  <img
                    src="/svg/name/cap-a.svg"
                    alt="A"
                    draggable={false}
                    className="h-[80px] md:h-[100px] lg:h-[120px]"
                  />
                </motion.div>
              );
            }

            // Use Playfair Display font for all other letters
            return (
              <motion.div
                key={`${wordIndex}-${charIndex}`}
                className="overflow-hidden"
              >
                <motion.span
                  className="inline-block text-7xl md:text-8xl lg:text-9xl text-[#9F9FAD] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export default NameDisplay;
