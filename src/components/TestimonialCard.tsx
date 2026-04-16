import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  delay?: number;
}

export default function TestimonialCard({ name, text, rating, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="p-8 rounded-3xl bg-white/40 dark:bg-black/30 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary),0.2)] transition-all duration-300 group"
    >
      <div className="flex gap-1 mb-6 opacity-80 transition-opacity group-hover:opacity-100">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={18} className="fill-warning text-warning" />
        ))}
      </div>
      <p className="text-base text-muted-foreground leading-relaxed mb-8 font-medium italic group-hover:text-foreground/90 transition-colors">"{text}"</p>
      
      <div className="flex items-center gap-4 mt-auto">
         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold shadow-inner border border-primary/20">
           {name.charAt(0)}
         </div>
         <p className="text-base font-bold text-foreground">{name}</p>
      </div>
    </motion.div>
  );
}
