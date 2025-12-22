import { motion } from "framer-motion";
import NameDisplay from "@/components/NameDisplay";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ProfileData {
  name: string;
  tagline: string;
  location: string;
  year: string;
}

const Index = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("profile").select("*").single();
      if (data) {
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 w-screen h-full overflow-auto flex flex-col items-center scrollbar-hide">
      <main className="md:px-3 max-w-5xl w-full min-h-[768px] h-screen shrink-0 flex flex-col items-center justify-center overflow-x-hidden md:overflow-x-visible relative">
        {/* Top location and year */}
        <motion.div
          className="absolute top-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-accent font-light text-xs md:text-sm opacity-50 inline">
            {profile?.location || "India"} <span className="mx-1">✧</span>
          </h1>
          <time
            dateTime={new Date().toISOString()}
            className="text-accent font-light text-xs md:text-sm opacity-50 inline"
          >
            {profile?.year || "20 25"}
          </time>
        </motion.div>

        {/* Decorative circle */}
        <motion.div
          className="w-[480px] h-[480px] md:w-[560px] md:h-[560px] mb-16 absolute rounded-full border border-accent/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Decorative horizontal lines */}
        <div className="flex flex-col gap-72 md:gap-96 justify-between absolute pointer-events-none">
          <motion.div
            className="w-[370px] md:w-[460px] h-[1px] mb-16 bg-accent/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="w-[370px] md:w-[460px] h-[1px] mb-16 bg-accent/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Name display */}
        <NameDisplay name={profile?.name} />

        {/* Marquee */}
        <Marquee />

        {/* Tagline */}
        <motion.p
          className="text-accent text-base md:text-lg font-light mt-6 pb-32 text-center max-w-[45ch]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="italic">{profile?.tagline || "Crafting digital interfaces"}</span>
        </motion.p>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

