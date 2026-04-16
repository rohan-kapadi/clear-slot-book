import { Heart, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background py-16 mt-auto overflow-hidden">
      {/* Decorative top gradient border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-black text-xl">M</span>
              </div>
              <span className="font-heading text-3xl font-bold tracking-tight">MedBook</span>
            </div>
            <p className="text-base text-background/70 leading-relaxed max-w-sm mb-8">
              Empowering better healthcare decisions. Find verified doctors, book instant appointments, and manage your health seamlessly from anywhere.
            </p>
            {/* Newsletter */}
            <div className="flex items-center gap-2 max-w-sm group">
              <input 
                type="email" 
                placeholder="Subscribe to our health newsletter" 
                className="bg-background/5 border border-background/10 text-background rounded-xl px-5 py-3.5 text-sm flex-1 outline-none shadow-inner focus:border-primary/50 focus:bg-background/10 transition-all duration-300 placeholder:text-background/40"
              />
              <button className="bg-primary text-primary-foreground p-3.5 rounded-xl shadow-lg border border-primary/50 hover:bg-primary-foreground hover:text-primary transition-all duration-300 flex items-center justify-center">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-background/90 tracking-wide uppercase text-sm">Services</h4>
            <ul className="space-y-4 text-base font-medium text-background/60">
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Find Doctors</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Book Appointments</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Teleconsultation</a></li>
              <li><a href="#" className="text-emergency hover:text-emergency/80 hover:translate-x-1 inline-block transition-all duration-300">Emergency Booking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-background/90 tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-4 text-base font-medium text-background/60">
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Press & Media</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-background/90 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-4 text-base font-medium text-background/60">
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-background/50 font-medium">© {new Date().getFullYear()} MedBook Technologies. All rights reserved.</p>
          
          <div className="flex gap-4 items-center">
            <a href="#" className="w-10 h-10 rounded-full bg-background/5 border border-background/10 flex items-center justify-center text-background/80 hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:scale-110 transition-all duration-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/5 border border-background/10 flex items-center justify-center text-background/80 hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:scale-110 transition-all duration-300">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/5 border border-background/10 flex items-center justify-center text-background/80 hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:scale-110 transition-all duration-300">
              <Instagram size={18} />
            </a>
          </div>

          <p className="flex items-center gap-2 text-sm text-background/50 font-medium">
            Crafted with <Heart size={16} className="text-emergency animate-pulse drop-shadow-[0_0_8px_rgba(var(--color-emergency),0.8)]" /> for better care
          </p>
        </div>
      </div>
    </footer>
  );
}
