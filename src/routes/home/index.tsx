import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar, Clock, MapPin, Video, ChevronRight, Zap,
  Stethoscope, Heart, Brain, Eye, Bone, Activity, Search,
  TrendingUp, Pill, Flame, CalendarDays, Star,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import DoctorCard from "@/components/DoctorCard";

export const Route = createFileRoute("/home/")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — MedBook" },
      { name: "description", content: "Your personalized healthcare dashboard. View appointments, find doctors, and manage your health." },
    ],
  }),
});

const categories = [
  { icon: Stethoscope, label: "General", color: "oklch(0.55 0.14 175)" },
  { icon: Heart, label: "Cardiology", color: "oklch(0.6 0.22 25)" },
  { icon: Brain, label: "Neurology", color: "oklch(0.55 0.18 280)" },
  { icon: Eye, label: "Eye Care", color: "oklch(0.6 0.15 230)" },
  { icon: Bone, label: "Orthopedic", color: "oklch(0.65 0.15 55)" },
  { icon: Activity, label: "Skin Care", color: "oklch(0.6 0.16 330)" },
];

const quickActions = [
  { icon: CalendarDays, label: "Book", color: "oklch(0.55 0.14 175)", to: "/home/appointments" as const },
  { icon: Zap, label: "Emergency", color: "oklch(0.65 0.22 25)", to: "/home/search" as const },
  { icon: Video, label: "Teleconsult", color: "oklch(0.55 0.18 280)", to: "/home/search" as const },
  { icon: Search, label: "Find Doctor", color: "oklch(0.6 0.15 230)", to: "/home/search" as const },
];

const doctors = [
  { name: "Dr. Ananya Sharma", specialty: "Cardiologist", rating: 4.9, reviews: 284, location: "Apex Hospital", available: "Today, 3:00 PM", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Vikram Malhotra", specialty: "General Physician", rating: 4.8, reviews: 512, location: "Swasthya Care", available: "Today, 5:30 PM", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Kavita Reddy", specialty: "Dermatologist", rating: 4.9, reviews: 198, location: "Clear Skin Clinic", available: "Tomorrow, 10 AM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&crop=face" },
];

function DashboardPage() {
  return (
    <div className="px-4 md:px-6 py-5 max-w-4xl mx-auto space-y-6">

      {/* ── Health Stats Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { icon: TrendingUp, label: "Total Visits", value: "23", color: "oklch(0.55 0.14 175)" },
          { icon: Pill, label: "Prescriptions", value: "3 Active", color: "oklch(0.55 0.18 280)" },
          { icon: Flame, label: "Health Streak", value: "7 Days", color: "oklch(0.65 0.22 25)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card-elevated p-3.5 text-center"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ background: `${stat.color}22` }}
            >
              <stat.icon size={17} style={{ color: stat.color }} />
            </div>
            <p className="stat-number text-foreground text-base leading-none">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07 }}
      >
        <SearchBar compact />
      </motion.div>

      {/* ── Upcoming Appointment ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-label">Upcoming Appointment</h3>
          <Link
            to="/home/appointments"
            className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
          >
            See All <ChevronRight size={13} />
          </Link>
        </div>
        <div className="card-elevated p-5 border border-primary/12 bg-gradient-to-br from-primary/6 to-transparent">
          <div className="flex items-start gap-4">
            {/* Avatar with online dot */}
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face"
                alt="Dr. Ananya Sharma"
                className="w-16 h-16 rounded-2xl object-cover"
                loading="lazy"
                width={64}
                height={64}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-foreground leading-tight">Dr. Ananya Sharma</h4>
                  <p className="text-sm text-primary font-semibold">Cardiologist</p>
                </div>
                <span className="shrink-0 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  In 2 days
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> Apr 18, 2026</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> 3:00 PM</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> Apex Hospital</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="btn-primary flex-1 text-sm py-2.5">
              <Video size={15} /> Join Call
            </button>
            <button className="btn-secondary flex-1 text-sm py-2.5">
              View Details <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
      >
        <h3 className="section-label mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="card-elevated flex flex-col items-center gap-2 p-4 no-underline hover:scale-[1.03] transition-transform"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: a.color }}
              >
                <a.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Health Specialties ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-label">Browse Specialties</h3>
          <Link to="/home/search" className="text-xs font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c.label}
              className="card-elevated flex flex-col items-center gap-2 p-4 shrink-0 min-w-[84px] hover:scale-[1.04] transition-transform"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: c.color }}
              >
                <c.icon size={18} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Recommended Doctors ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-label">Recommended for You</h3>
          <Link to="/home/search" className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
            See All <ChevronRight size={13} />
          </Link>
        </div>
        <div className="space-y-3">
          {doctors.map((d, i) => (
            <DoctorCard key={d.name} {...d} delay={i * 0.07} />
          ))}
        </div>

        {/* Health tip card at bottom */}
        <div className="mt-4 card-elevated p-4 bg-gradient-to-r from-primary/8 to-transparent border border-primary/10 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <Star size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Health Tip of the Day</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Drink at least 8 glasses of water daily. Staying hydrated improves energy, focus, and overall wellbeing.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
