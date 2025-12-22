import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
}

interface Award {
  id: string;
  title: string;
  org: string;
  date: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
}

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

const About = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [bio, setBio] = useState({ intro: "", body: "", image_url: "" });

  useEffect(() => {
    const fetchData = async () => {
      const { data: expData } = await supabase.from("experience").select("*").order("display_order", { ascending: true });
      if (expData) setExperience(expData);

      const { data: awardData } = await supabase.from("awards").select("*").order("display_order", { ascending: true });
      if (awardData) setAwards(awardData);

      const { data: skillData } = await supabase.from("skills").select("*").order("display_order", { ascending: true });
      if (skillData) setSkills(skillData);

      const { data: profileData } = await supabase.from("profile").select("bio_intro, bio_body, image_url").single();
      if (profileData) setBio({ intro: profileData.bio_intro, body: profileData.bio_body, image_url: profileData.image_url || "" });
    };

    fetchData();
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
            className="text-accent/50 text-sm mb-8"
            variants={itemVariants}
          >
            // About
          </motion.h2>

          {/* Hero image placeholder */}
          <motion.div
            className="w-full h-[300px] md:h-[400px] bg-gradient-to-b from-background to-card rounded-lg mb-12 overflow-hidden relative"
            variants={itemVariants}
          >
            {bio.image_url ? (
              <img
                src={bio.image_url}
                alt="About"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-48 h-64 bg-gradient-to-t from-accent/20 to-transparent rounded-t-full" />
              </div>
            )}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-3xl md:text-5xl text-foreground font-light mb-6"
            variants={itemVariants}
          >
            {bio.intro || "I design digital interfaces"}
          </motion.h1>

          {/* Bio paragraph */}
          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-3xl mb-20 leading-relaxed whitespace-pre-wrap"
            variants={itemVariants}
          >
            {bio.body || "From a young age, I've been fascinated by the world of computers and software. Features like copy, paste, and undo seemed magical and touch screens were a joy to use. Along the way, I've developed a keen interest in visual design, and found my calling to digital Product Design."}
          </motion.p>

          {/* Work experience */}
          <motion.h2
            className="text-3xl md:text-4xl text-foreground font-light mb-12"
            variants={itemVariants}
          >
            I've worked <span className="text-muted-foreground">across</span> domains
          </motion.h2>

          <motion.div className="space-y-6 mb-20" variants={containerVariants}>
            {experience.map((job, index) => (
              <motion.div
                key={job.id || index}
                className="flex justify-between items-start border-b border-border/30 pb-6"
                variants={itemVariants}
              >
                <div>
                  <h3 className="text-highlight text-lg">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">@ {job.company}</p>
                </div>
                <p className="text-muted-foreground text-sm">{job.period}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Awards */}
          <motion.h2
            className="text-3xl md:text-4xl text-foreground font-light mb-12"
            variants={itemVariants}
          >
            and won some awards
          </motion.h2>

          <motion.div className="space-y-8 mb-20" variants={containerVariants}>
            {awards.map((award, index) => (
              <motion.div
                key={award.id || index}
                className="flex justify-between items-start"
                variants={itemVariants}
              >
                <div className="flex-1">
                  <h3 className="text-highlight text-lg">{award.title}</h3>
                  <p className="text-muted-foreground text-sm">@ {award.org}</p>
                  <p className="text-muted-foreground/60 text-xs mt-2">{award.description}</p>
                </div>
                <p className="text-muted-foreground text-sm">{award.date}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.h2
            className="text-3xl md:text-4xl text-foreground font-light mb-4"
            variants={itemVariants}
          >
            I've acquired a diverse set of skills
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8"
            variants={itemVariants}
          >
            and I hone them every day.
          </motion.p>
          <motion.p
            className="text-muted-foreground/60 text-sm mb-8"
            variants={itemVariants}
          >
            Currently, I'm learning three.js and some backend dev
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill.id || index}
                className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm text-foreground/80"
                variants={itemVariants}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--accent))" }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
