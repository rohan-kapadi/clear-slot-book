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
      transition={{ delay, duration: 0.4 }}
      className="card-elevated p-6"
    >
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-warning text-warning" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{text}"</p>
      <p className="text-sm font-semibold text-foreground">{name}</p>
    </motion.div>
  );
}
