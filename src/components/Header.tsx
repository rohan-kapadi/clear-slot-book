import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="section-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-primary/40 group-hover:-translate-y-0.5 transition-all duration-300">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground tracking-tight">MedBook</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-black/20 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/20 shadow-sm">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/60 dark:hover:bg-white/10 px-4 py-1.5 rounded-full transition-all duration-300">Home</Link>
          <Link to="/home" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/60 dark:hover:bg-white/10 px-4 py-1.5 rounded-full transition-all duration-300">Dashboard</Link>
          <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/60 dark:hover:bg-white/10 px-4 py-1.5 rounded-full transition-all duration-300">Specialties</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/60 dark:hover:bg-white/10 px-4 py-1.5 rounded-full transition-all duration-300">How It Works</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+1800123456" className="btn-secondary rounded-full border-border/50 hover:border-emergency/30 hover:bg-emergency/5 hover:text-emergency text-sm py-2 px-4 shadow-sm transition-all duration-300 group">
            <Phone size={16} className="text-muted-foreground group-hover:text-emergency transition-colors" /> Emergency
          </a>
          <button className="btn-primary rounded-full shadow-md hover:shadow-primary/40 hover:-translate-y-0.5 text-sm py-2 px-6 transition-all duration-300">Book Now</button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col gap-1 p-4">
              <Link to="/" className="py-3 px-4 rounded-lg text-foreground font-medium hover:bg-muted transition-colors">Home</Link>
              <Link to="/home" className="py-3 px-4 rounded-lg text-foreground font-medium hover:bg-muted transition-colors">Dashboard</Link>
              <a href="#categories" className="py-3 px-4 rounded-lg text-foreground font-medium hover:bg-muted transition-colors">Specialties</a>
              <div className="flex gap-2 mt-2">
                <button className="btn-emergency flex-1 text-sm py-2.5">Emergency</button>
                <button className="btn-primary flex-1 text-sm py-2.5">Book Now</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
