import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 z-10 w-screen h-full flex items-center justify-center">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-8xl md:text-9xl font-light text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-8">This page could not be found.</p>
        <motion.button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-accent/30 rounded-full text-accent hover:bg-accent/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go back home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
