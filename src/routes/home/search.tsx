import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search, MapPin, SlidersHorizontal, Star, Clock, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/home/search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Find Doctors — MedBook" },
      { name: "description", content: "Search from 15,000+ verified doctors near you. Filter by specialty, availability, and ratings." },
    ],
  }),
});

const specialties = ["All", "General", "Cardiology", "Neurology", "Dermatology", "Orthopedic", "Eye Care", "Gynecology"];
const availabilities = ["Any Time", "Today", "Tomorrow", "This Week"];
const sortOptions = ["Relevance", "Rating", "Price ↑", "Price ↓"];

const allDoctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 284,
    location: "Apex Hospital, Bandra",
    available: "Today, 3:00 PM",
    experience: "12 years",
    fee: "₹800",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "Cardiology",
    availableToday: true,
  },
  {
    id: 2,
    name: "Dr. Vikram Malhotra",
    specialty: "General Physician",
    rating: 4.8,
    reviews: 512,
    location: "Swasthya Care, Andheri",
    available: "Today, 5:30 PM",
    experience: "8 years",
    fee: "₹500",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "General",
    availableToday: true,
  },
  {
    id: 3,
    name: "Dr. Kavita Reddy",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 198,
    location: "Clear Skin Clinic, Powai",
    available: "Tomorrow, 10 AM",
    experience: "10 years",
    fee: "₹700",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "Dermatology",
    availableToday: false,
  },
  {
    id: 4,
    name: "Dr. Priya Nair",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 143,
    location: "NeuroHealth Centre, Dadar",
    available: "Today, 1:00 PM",
    experience: "15 years",
    fee: "₹1,200",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "Neurology",
    availableToday: true,
  },
  {
    id: 5,
    name: "Dr. Suresh Iyer",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviews: 267,
    location: "Bone & Joint Clinic, Thane",
    available: "Tomorrow, 9 AM",
    experience: "18 years",
    fee: "₹900",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "Orthopedic",
    availableToday: false,
  },
  {
    id: 6,
    name: "Dr. Neeraj Gupta",
    specialty: "General Physician",
    rating: 4.6,
    reviews: 389,
    location: "City Medical Hub, Kurla",
    available: "Today, 7:00 PM",
    experience: "6 years",
    fee: "₹400",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "General",
    availableToday: true,
  },
  {
    id: 7,
    name: "Dr. Meena Pillai",
    specialty: "Gynaecologist",
    rating: 4.9,
    reviews: 321,
    location: "Women's Wellness Clinic, Juhu",
    available: "Tomorrow, 11 AM",
    experience: "14 years",
    fee: "₹1,000",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face",
    specialtyKey: "Gynecology",
    availableToday: false,
  },
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedAvail, setSelectedAvail] = useState("Any Time");
  const [selectedSort, setSelectedSort] = useState("Relevance");

  const filtered = allDoctors.filter((d) => {
    const matchQuery =
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.location.toLowerCase().includes(query.toLowerCase());
    const matchSpec =
      selectedSpecialty === "All" ||
      d.specialtyKey.toLowerCase() === selectedSpecialty.toLowerCase();
    const matchAvail =
      selectedAvail === "Any Time" ||
      (selectedAvail === "Today" && d.availableToday) ||
      (selectedAvail === "Tomorrow" && !d.availableToday);
    return matchQuery && matchSpec && matchAvail;
  });

  return (
    <div className="px-4 md:px-6 py-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Find a Doctor</h1>
        <p className="text-sm text-muted-foreground mt-0.5">15,000+ verified doctors near you</p>
      </div>

      {/* Search bar + Filter button */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            id="doctor-search-input"
            type="text"
            placeholder="Search doctors, specialties, hospitals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all"
          />
        </div>
        <button className="btn-secondary px-4 gap-2 text-sm">
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Location row */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <MapPin size={14} className="text-primary" />
        <span>Showing results near <strong className="text-foreground">Mumbai</strong></span>
        <button className="text-primary text-xs font-semibold ml-auto hover:underline">Change</button>
      </div>

      {/* Specialty chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mb-3">
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpecialty(s)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              selectedSpecialty === s
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Availability + Sort chips row */}
      <div className="flex gap-4 mb-5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-2 shrink-0">
          {availabilities.map((a) => (
            <button
              key={a}
              onClick={() => setSelectedAvail(a)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                selectedAvail === a
                  ? "border-primary text-primary bg-primary/8"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0 border-l border-border pl-4">
          {sortOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSort(s)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                selectedSort === s
                  ? "border-primary text-primary bg-primary/8"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{filtered.length}</span> doctors found
        </p>
      </div>

      {/* Doctor cards */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-muted-foreground/40" />
          </div>
          <h3 className="font-bold text-foreground">No doctors found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.055 }}
              className="card-elevated p-4 flex gap-4"
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
                loading="lazy"
                width={64}
                height={64}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-foreground">{d.name}</h4>
                    <p className="text-sm text-primary font-semibold">{d.specialty}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground text-base">{d.fee}</p>
                    <p className="text-[10px] text-muted-foreground">per visit</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-warning-foreground">
                    <Star size={11} className="fill-warning text-warning" />
                    {d.rating} ({d.reviews})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} /> {d.location}
                  </span>
                  <span>{d.experience} exp</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center gap-1 text-xs font-semibold text-success">
                    <Clock size={12} /> {d.available}
                  </span>
                  <div className="flex gap-2">
                    <button className="btn-secondary text-xs py-1.5 px-3">
                      Profile <ChevronRight size={12} />
                    </button>
                    <button className="btn-primary text-xs py-1.5 px-4">Book</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
