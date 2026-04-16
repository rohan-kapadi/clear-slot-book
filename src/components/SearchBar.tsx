import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact }: SearchBarProps) {
  return (
    <div 
      className={`p-2 bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl flex flex-col sm:flex-row items-center w-full transition-all duration-500 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-black/50 hover:border-primary/30 group focus-within:shadow-[0_15px_50px_-15px_rgba(var(--color-primary),0.3)] focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-card ${compact ? "max-w-2xl" : "max-w-3xl"}`}
    >
      
      {/* Primary Search Input */}
      <div className="relative flex-1 w-full flex flex-row items-center px-4 group-focus-within/search">
        <Search size={compact ? 18 : 22} className="text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
        <input
          type="text"
          placeholder="Search doctors, specialties, or issues..."
          className={`w-full bg-transparent border-none outline-none px-4 text-foreground placeholder:text-muted-foreground/60 font-medium ${compact ? "py-2.5 text-sm" : "py-3.5 text-base"}`}
        />
      </div>

      {/* Elegant Divider */}
      <div className="hidden sm:block w-[1px] h-10 bg-border/60 dark:bg-white/10 mx-1" />

      {/* Location Input */}
      <div className="relative sm:w-56 w-full flex flex-row items-center px-4 border-t border-border/30 sm:border-t-0 group-focus-within/location">
        <MapPin size={compact ? 18 : 20} className="text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
        <input
          type="text"
          placeholder="City or zip code"
          className={`w-full bg-transparent border-none outline-none px-3 text-foreground placeholder:text-muted-foreground/60 font-medium ${compact ? "py-2.5 text-sm" : "py-3.5 text-base"}`}
        />
      </div>

      {/* Premium Search Button */}
      <button className={`w-full sm:w-auto bg-primary hover:bg-primary-foreground hover:text-primary border border-transparent hover:border-primary/20 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 shrink-0 flex items-center justify-center gap-2 mt-2 sm:mt-0 ${compact ? "py-3 px-6 text-sm" : "py-4 px-8 text-base"}`}>
        <span className="hidden sm:inline tracking-wide">Search</span>
        <span className="sm:hidden tracking-wide">Find Doctors</span>
      </button>
    </div>
  );
}
