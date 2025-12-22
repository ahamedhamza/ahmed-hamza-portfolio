import { motion } from "framer-motion";

interface MarqueeProps {
  items?: string[];
  separator?: string;
}

export const Marquee = ({ 
  items = ["Designer", "Developer", "Creative Coder"],
  separator = "✧"
}: MarqueeProps) => {
  const content = items.map(item => (
    <span key={item}>
      <span className="text-highlight"> {separator} </span>
      {item}
    </span>
  ));

  return (
    <motion.div 
      className="w-[340px] mt-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="whitespace-nowrap text-accent text-base flex items-center h-10 glass rounded-full border border-accent/25 overflow-hidden">
        <div className="flex animate-marquee">
          <p className="flex">{content}</p>
          <p className="flex">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Marquee;
