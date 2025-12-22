import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  link: string;
  image_url: string;
  gradient_start: string;
  gradient_end: string;
  gradient?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("*").order("display_order", { ascending: true });
      if (data) {
        // Map the data to match the component's expected format if needed, or just use it directly.
        // The schema has gradient_start and gradient_end, but the component used a single 'gradient' string.
        // I'll construct the gradient string here or update the component to use start/end.
        const formattedProjects = data.map((p, index) => ({
          ...p,
          number: (index + 1).toString().padStart(2, '0'),
          gradient: `from-${p.gradient_start?.replace('from-', '') || 'purple-600/20'} to-${p.gradient_end?.replace('to-', '') || 'violet-600/20'}`
        }));
        setProjects(formattedProjects);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageTransition>
      <div className="fixed left-0 top-0 z-10 w-screen h-full overflow-auto flex flex-col items-center scrollbar-hide">
        <motion.main
          className="max-w-5xl w-full px-4 md:px-8 py-20 pb-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page title */}
          <motion.h2
            className="text-accent/50 text-sm mb-12"
            variants={itemVariants}
          >
            // Work
          </motion.h2>

          {/* Projects */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.article
                key={project.id || index}
                className="group"
                variants={itemVariants}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Project image */}
                  <motion.div
                    className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${project.gradient} overflow-hidden relative`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-48 bg-background/80 rounded-2xl shadow-2xl flex items-center justify-center">
                          <span className="text-4xl font-light text-muted-foreground">{project.number}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Project info */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-muted-foreground/40 text-2xl font-light">{project.number}</span>
                      <h3 className="text-2xl md:text-3xl text-foreground font-light">{project.title}</h3>
                    </div>
                    <p className="text-highlight text-sm mb-4">{project.category}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
                  </div>
                </div>

                {/* Read link */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 border border-border/30 rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Read
                  <ArrowUpRight size={16} />
                </motion.a>
              </motion.article>
            ))}
          </div>
        </motion.main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Work;
