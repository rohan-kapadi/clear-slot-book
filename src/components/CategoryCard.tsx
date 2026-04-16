import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  color: string;
  delay?: number;
}

export default function CategoryCard({ icon: Icon, label, color, delay = 0 }: CategoryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="card-elevated flex flex-col items-center gap-3 p-6 cursor-pointer min-w-[140px]"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: color }}>
        <Icon size={26} className="text-card" />
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </motion.button>
  );
}
