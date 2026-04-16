import { Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  available: string;
  image: string;
  delay?: number;
}

export default function DoctorCard({ name, specialty, rating, reviews, location, available, image, delay = 0 }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="card-elevated p-4 flex gap-4"
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
        loading="lazy"
        width={80}
        height={80}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{name}</h4>
        <p className="text-sm text-muted-foreground">{specialty}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-warning-foreground font-medium">
            <Star size={13} className="fill-warning text-warning" /> {rating} ({reviews})
          </span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1 text-xs font-medium text-success">
            <Clock size={12} /> {available}
          </span>
          <button className="btn-primary text-xs py-1.5 px-3">Book</button>
        </div>
      </div>
    </motion.div>
  );
}
