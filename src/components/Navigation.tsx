import { motion } from "framer-motion";
import { Home, User, Briefcase, MessageSquare } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/work", icon: Briefcase, label: "Work" },
  { path: "/contact", icon: MessageSquare, label: "Contact" },
];

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <motion.nav 
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex gap-1 p-1.5 glass rounded-2xl border border-accent/20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative"
            >
              <motion.div
                className={`p-3 rounded-xl transition-colors duration-300 ${
                  isActive 
                    ? 'bg-accent/20 text-accent' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} strokeWidth={1.5} />
              </motion.div>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent rounded-full"
                  layoutId="nav-indicator"
                  style={{ x: "-50%" }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
