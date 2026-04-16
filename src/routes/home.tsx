import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin, Bell, User, Calendar, Clock, Video, ChevronRight,
  Zap, Stethoscope, Heart, Brain, Eye, Bone, Activity,
  Home as HomeIcon, Search, CalendarDays, UserCircle,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import DoctorCard from "../components/DoctorCard";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Dashboard — MedBook" },
      { name: "description", content: "Your personalized healthcare dashboard. View appointments, find doctors, and manage your health." },
      { property: "og:title", content: "Dashboard — MedBook" },
      { property: "og:description", content: "Your personalized healthcare dashboard." },
    ],
  }),
});

const quickActions = [
  { icon: CalendarDays, label: "Book Appointment", color: "oklch(0.55 0.14 175)" },
  { icon: Zap, label: "Emergency", color: "oklch(0.6 0.22 25)" },
  { icon: Video, label: "Teleconsult", color: "oklch(0.55 0.18 280)" },
  { icon: Search, label: "Find Doctor", color: "oklch(0.6 0.15 230)" },
];

const categories = [
  { icon: Stethoscope, label: "General", color: "oklch(0.55 0.14 175)" },
  { icon: Heart, label: "Cardiology", color: "oklch(0.6 0.22 25)" },
  { icon: Brain, label: "Neurology", color: "oklch(0.55 0.18 280)" },
  { icon: Eye, label: "Eye Care", color: "oklch(0.6 0.15 230)" },
  { icon: Bone, label: "Orthopedic", color: "oklch(0.65 0.15 55)" },
  { icon: Activity, label: "Skin Care", color: "oklch(0.6 0.16 330)" },
];

const doctors = [
  { name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: 4.9, reviews: 284, location: "City Hospital", available: "Today, 3:00 PM", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Amit Patel", specialty: "General Physician", rating: 4.8, reviews: 512, location: "MedCare Clinic", available: "Today, 5:30 PM", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Emily Chen", specialty: "Dermatologist", rating: 4.9, reviews: 198, location: "Skin Health Center", available: "Tomorrow, 10 AM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&crop=face" },
];

function HomePage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="section-container flex items-center justify-between h-16">
          <div>
            <p className="text-sm text-muted-foreground">{greeting} 👋</p>
            <p className="text-base font-bold text-foreground">Rohan</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-2 px-3 text-xs">
              <MapPin size={14} /> Mumbai
            </button>
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center relative">
              <Bell size={18} className="text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emergency rounded-full border-2 border-card" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <User size={18} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="section-container py-6 space-y-8">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <SearchBar compact />
        </motion.div>

        {/* Upcoming Appointment */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Upcoming Appointment</h3>
          <div className="card-elevated p-5 bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face"
                alt="Dr. Sarah Johnson"
                className="w-14 h-14 rounded-xl object-cover"
                loading="lazy"
                width={56}
                height={56}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">Dr. Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground">Cardiologist</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={13} /> Apr 18, 2026</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> 3:00 PM</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> City Hospital</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-primary flex-1 text-sm py-2.5">
                <Video size={16} /> Join Call
              </button>
              <button className="btn-secondary flex-1 text-sm py-2.5">
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <button key={a.label} className="card-elevated flex flex-col items-center gap-2 p-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: a.color }}>
                  <a.icon size={20} className="text-card" />
                </div>
                <span className="text-xs font-medium text-foreground text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories (horizontal scroll) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Health Categories</h3>
            <button className="text-xs font-medium text-primary">View All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {categories.map((c) => (
              <button key={c.label} className="card-elevated flex flex-col items-center gap-2 p-4 shrink-0 min-w-[88px]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color }}>
                  <c.icon size={18} className="text-card" />
                </div>
                <span className="text-xs font-medium text-foreground">{c.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Doctors */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recommended Doctors</h3>
            <button className="text-xs font-medium text-primary">See All</button>
          </div>
          <div className="space-y-3">
            {doctors.map((d, i) => (
              <DoctorCard key={d.name} {...d} delay={i * 0.08} />
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border md:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: HomeIcon, label: "Home", active: true },
            { icon: CalendarDays, label: "Appointments", active: false },
            { icon: Search, label: "Search", active: false },
            { icon: UserCircle, label: "Profile", active: false },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-0.5 py-1 px-3">
              <item.icon size={22} className={item.active ? "text-primary" : "text-muted-foreground"} />
              <span className={`text-[10px] font-medium ${item.active ? "text-primary" : "text-muted-foreground"}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
