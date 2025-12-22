import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Dribbble, Link as LinkIcon, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Social {
  id: string;
  platform: string;
  url: string;
  label: string;
  icon_name: string;
}

const iconMap: Record<string, any> = {
  Twitter,
  Linkedin,
  Github,
  Dribbble,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState<Social[]>([]);
  const [profileName, setProfileName] = useState("Ahmed Hamza");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: socialData } = await supabase.from("socials").select("*").order("display_order", { ascending: true });
      if (socialData) setSocials(socialData);

      const { data: profileData } = await supabase.from("profile").select("name").single();
      if (profileData) setProfileName(profileData.name);
    };
    fetchData();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@example.com"); // Replace with dynamic email if available
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.footer
      className="w-full py-20 pb-32 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">

        {/* Get in touch */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-light mb-6">Get in touch</h3>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 mx-auto text-muted-foreground hover:text-accent transition-colors"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="text-sm">
              {copied ? "Email copied to clipboard" : "Copy email to clipboard"}
            </span>
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6 mb-20">
          {socials.map((link, index) => {
            const Icon = iconMap[link.icon_name] || LinkIcon;
            return (
              <motion.a
                key={link.id || index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <Icon size={24} strokeWidth={1.5} />
              </motion.a>
            );
          })}
        </div>

        {/* Colophon */}
        <div className="text-muted-foreground/40 text-xs md:text-sm space-y-2 font-light">
          <p className="mb-4">:: colophon ::</p>
          <p>Designed and engineered by {profileName.split(' ')[0]}.</p>
          <p>Built with React, Tailwind CSS, and Framer Motion.</p>
          <p className="mt-4">© {profileName}. Last updated {currentYear}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
