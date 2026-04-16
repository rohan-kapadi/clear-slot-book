import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact }: SearchBarProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 w-full ${compact ? "max-w-2xl" : "max-w-3xl"}`}>
      <div className="relative flex-1">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search doctors, specialties, hospitals..."
          className={`search-input-main ${compact ? "py-3 text-sm" : ""}`}
        />
      </div>
      <div className="relative sm:w-52">
        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Location"
          className={`search-input-main pl-11 ${compact ? "py-3 text-sm" : ""}`}
        />
      </div>
      <button className={`btn-primary shrink-0 ${compact ? "py-3 px-5 text-sm" : ""}`}>
        <Search size={18} /> Search
      </button>
    </div>
  );
}
