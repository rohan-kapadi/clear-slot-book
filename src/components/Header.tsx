import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground">MedBook</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/home" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Specialties</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+1800123456" className="btn-secondary text-sm py-2 px-3">
            <Phone size={16} /> Emergency
          </a>
          <button className="btn-primary text-sm py-2 px-4">Book Now</button>
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
