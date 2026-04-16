import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  color: string;
  delay?: number;
  desc: string;
}

export default function CategoryCard({ icon: Icon, label, color, delay = 0, desc }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="group [perspective:1200px] w-full min-h-[220px] h-full cursor-pointer"
    >
      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-md group-hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)]">
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] card-elevated flex flex-col items-center justify-center gap-5 p-6 border border-white/40 dark:border-white/10 overflow-hidden bg-card/90 backdrop-blur-md">
          {/* Subtle background tint */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: color }} />
          
          {/* Aesthetic Icon Container */}
          <div className="w-20 h-20 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 rounded-full opacity-30 blur-2xl transition-opacity duration-300" style={{ background: color }} />
            <div 
              className="relative z-10 w-16 h-16 rounded-[1.25rem] flex items-center justify-center shadow-lg border border-white/20" 
              style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 80%, black))` }}
            >
              <Icon size={30} className="text-white drop-shadow-md" />
            </div>
          </div>
          <span className="text-xl font-bold text-foreground z-10 tracking-tight">{label}</span>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] card-elevated flex flex-col items-center justify-center p-8 text-center border-2 bg-gradient-to-br from-white to-muted/20 dark:from-background dark:to-muted backdrop-blur-2xl"
          style={{ borderColor: `color-mix(in srgb, ${color} 20%, transparent)` }}
        >
           <h3 className="text-2xl font-black mb-3 mt-1 tracking-tight" style={{ color: color }}>{label}</h3>
           <p className="text-sm font-medium text-foreground/75 leading-relaxed bg-background/50 p-4 rounded-xl shadow-inner border border-white/10 dark:border-black/10">
             {desc}
           </p>
           <div className="w-12 h-12 mt-auto rounded-full flex items-center justify-center shadow-sm" style={{ background: `color-mix(in srgb, ${color} 10%, transparent)` }}>
             <Icon size={20} style={{ color: color }} />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
