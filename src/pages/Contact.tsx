import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@example.com",
    label: "hello@example.com",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    label: "@ahmedhamza",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "Ahmed Hamza",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    label: "@ahmedhamza",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const Contact = () => {
  return (
    <PageTransition>
      <div className="fixed left-0 top-0 z-10 w-screen h-full overflow-auto flex flex-col items-center scrollbar-hide">
        <motion.main
          className="max-w-5xl w-full px-4 md:px-8 py-20 flex-1 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page title */}
          <motion.h2
            className="text-accent/50 text-sm mb-8"
            variants={itemVariants}
          >
            // Contact
          </motion.h2>

          {/* Main heading */}
          <motion.h1
            className="text-4xl md:text-6xl text-foreground font-light mb-6"
            variants={itemVariants}
          >
            Let's <span className="italic text-muted-foreground">connect</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg mb-16 max-w-xl"
            variants={itemVariants}
          >
            I'm always open to discussing product design work or partnership opportunities.
          </motion.p>

          {/* Social links */}
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 border border-border/30 rounded-xl hover:border-accent/30 hover:bg-card/50 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{link.name}</h3>
                    <p className="text-muted-foreground text-sm">{link.label}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="mt-20 text-center"
            variants={itemVariants}
          >
            <p className="text-muted-foreground/40 text-sm">
              Based in India <span className="mx-2">✧</span> Available worldwide
            </p>
          </motion.div>
        </motion.main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
