import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Calendar, Clock, MapPin, Video, ChevronRight,
  CheckCircle, XCircle, Star, Phone, Plus, X,
  Stethoscope, Heart, Brain, Eye, Bone, Activity,
  ArrowLeft, ArrowRight, User,
} from "lucide-react";

export const Route = createFileRoute("/home/appointments")({
  component: AppointmentsPage,
  head: () => ({
    meta: [
      { title: "Appointments — MedBook" },
      { name: "description", content: "Manage and track all your healthcare appointments in one place." },
    ],
  }),
});

type Tab = "Upcoming" | "Past" | "Cancelled";
const tabs: Tab[] = ["Upcoming", "Past", "Cancelled"];

/* ── Data ── */
const upcoming = [
  { id: 1, doctor: "Dr. Ananya Sharma", specialty: "Cardiologist", date: "Apr 18, 2026", time: "3:00 PM", location: "Apex Hospital", type: "In-person" as const, countdown: "2 days", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { id: 2, doctor: "Dr. Priya Nair", specialty: "Neurologist", date: "Apr 22, 2026", time: "11:30 AM", location: "Online", type: "Teleconsult" as const, countdown: "6 days", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&crop=face" },
];
const past = [
  { id: 3, doctor: "Dr. Vikram Malhotra", specialty: "General Physician", date: "Apr 5, 2026", time: "5:30 PM", location: "Swasthya Care", type: "In-person" as const, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face", rating: null },
  { id: 4, doctor: "Dr. Suresh Iyer", specialty: "Orthopedic Surgeon", date: "Mar 20, 2026", time: "10:00 AM", location: "Bone & Joint Clinic", type: "In-person" as const, image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&crop=face", rating: 5 },
  { id: 5, doctor: "Dr. Neeraj Gupta", specialty: "General Physician", date: "Mar 8, 2026", time: "7:00 PM", location: "City Medical Hub", type: "In-person" as const, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face", rating: 4 },
];

/* ── Booking form data ── */
const specialties = [
  { icon: Stethoscope, label: "General", color: "oklch(0.55 0.14 175)" },
  { icon: Heart, label: "Cardiology", color: "oklch(0.6 0.22 25)" },
  { icon: Brain, label: "Neurology", color: "oklch(0.55 0.18 280)" },
  { icon: Eye, label: "Eye Care", color: "oklch(0.6 0.15 230)" },
  { icon: Bone, label: "Orthopedic", color: "oklch(0.65 0.15 55)" },
  { icon: Activity, label: "Dermatology", color: "oklch(0.6 0.16 330)" },
];

const doctorOptions = [
  { name: "Dr. Ananya Sharma", specialty: "Cardiologist", rating: 4.9, fee: "₹800", available: "Today, 3:00 PM", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Vikram Malhotra", specialty: "General Physician", rating: 4.8, fee: "₹500", available: "Today, 5:30 PM", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Kavita Reddy", specialty: "Dermatologist", rating: 4.9, fee: "₹700", available: "Tomorrow, 10 AM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&crop=face" },
  { name: "Dr. Priya Nair", specialty: "Neurologist", rating: 4.7, fee: "₹1,200", available: "Today, 1:00 PM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM",
];

/* ══════════════════════════════════════════
   BOOKING MODAL
══════════════════════════════════════════ */
interface BookingModalProps {
  onClose: () => void;
}

function BookingModal({ onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [apptType, setApptType] = useState<"In-person" | "Teleconsult">("In-person");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canProceedStep1 = selectedDoctor !== "";
  const canProceedStep2 = selectedDate !== "" && selectedTime !== "";

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(onClose, 2200);
  };

  // Backdrop click closes
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
        onClick={handleBackdrop}
      >
        {/* Modal sheet */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          className="w-full md:max-w-xl bg-card rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Drag handle (mobile) ── */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* ── Modal Header ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              {step > 1 && !submitted && (
                <button
                  onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeft size={16} className="text-foreground" />
                </button>
              )}
              <div>
                <h2 className="font-bold text-foreground text-lg leading-tight">
                  {submitted ? "Booking Confirmed!" : step === 1 ? "Pick a Doctor" : step === 2 ? "Choose Date & Time" : "Confirm Booking"}
                </h2>
                {!submitted && (
                  <p className="text-xs text-muted-foreground">
                    Step {step} of 2
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X size={16} className="text-foreground" />
            </button>
          </div>

          {/* ── Progress bar ── */}
          {!submitted && (
            <div className="h-1 bg-muted">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </div>
          )}

          {/* ── Modal Body ── */}
          <div className="overflow-y-auto flex-1 px-5 py-5">

            {/* ─── SUCCESS STATE ─── */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="py-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={42} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Appointment Booked!</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                  Your appointment with <strong className="text-foreground">{selectedDoctor}</strong> on{" "}
                  <strong className="text-foreground">{selectedDate}</strong> at{" "}
                  <strong className="text-foreground">{selectedTime}</strong> is confirmed.
                </p>
                <div className="mt-6 p-4 bg-primary/6 border border-primary/12 rounded-2xl text-left">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} className="text-primary" />
                    <span>{selectedDate} · {selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <User size={14} className="text-primary" />
                    <span>{selectedDoctor}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    {apptType === "Teleconsult" ? <Video size={14} className="text-primary" /> : <MapPin size={14} className="text-primary" />}
                    <span>{apptType}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Closing in a moment…</p>
              </motion.div>
            )}

            {/* ─── STEP 1: Doctor & Specialty ─── */}
            {!submitted && step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Specialty chips */}
                <div>
                  <p className="section-label mb-3">Specialty</p>
                  <div className="grid grid-cols-3 gap-2">
                    {specialties.map((s) => {
                      const active = selectedSpecialty === s.label;
                      return (
                        <button
                          key={s.label}
                          onClick={() => setSelectedSpecialty(active ? "" : s.label)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${
                            active
                              ? "border-primary bg-primary/8 shadow-sm"
                              : "border-border hover:border-border/60 bg-card"
                          }`}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: active ? s.color : `${s.color}22` }}
                          >
                            <s.icon size={17} style={{ color: active ? "white" : s.color }} />
                          </div>
                          <span className={`text-[11px] font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Doctor list */}
                <div>
                  <p className="section-label mb-3">Select Doctor</p>
                  <div className="space-y-2">
                    {doctorOptions.map((d) => {
                      const active = selectedDoctor === d.name;
                      return (
                        <button
                          key={d.name}
                          onClick={() => setSelectedDoctor(active ? "" : d.name)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 text-left ${
                            active
                              ? "border-primary bg-primary/6 shadow-sm"
                              : "border-border hover:border-border/60 bg-card"
                          }`}
                        >
                          <img
                            src={d.image}
                            alt={d.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                            loading="lazy"
                            width={48}
                            height={48}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-sm ${active ? "text-primary" : "text-foreground"}`}>
                              {d.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{d.specialty}</p>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-0.5 text-warning-foreground font-semibold">
                                <Star size={10} className="fill-warning text-warning" /> {d.rating}
                              </span>
                              <span className="text-success font-semibold">{d.fee}</span>
                              <span className="flex items-center gap-0.5">
                                <Clock size={10} /> {d.available}
                              </span>
                            </div>
                          </div>
                          {active && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <CheckCircle size={12} className="text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Date, Time, Type, Notes ─── */}
            {!submitted && step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Selected doctor recap */}
                <div className="flex items-center gap-3 p-3 bg-primary/6 border border-primary/15 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <User size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedDoctor}</p>
                    <p className="text-xs text-muted-foreground">{doctorOptions.find(d => d.name === selectedDoctor)?.specialty}</p>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="appt-date" className="section-label block mb-2">Select Date</label>
                  <input
                    id="appt-date"
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all font-medium text-foreground"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <p className="section-label mb-3">Select Time Slot</p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-1 rounded-xl text-xs font-semibold border-2 transition-all duration-150 ${
                          selectedTime === slot
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border text-foreground hover:border-primary/50 bg-card"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type toggle */}
                <div>
                  <p className="section-label mb-3">Appointment Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["In-person", "Teleconsult"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setApptType(type)}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-150 ${
                          apptType === type
                            ? "border-primary bg-primary/8 text-primary shadow-sm"
                            : "border-border text-muted-foreground hover:border-primary/40 bg-card"
                        }`}
                      >
                        {type === "Teleconsult" ? <Video size={16} /> : <MapPin size={16} />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="appt-notes" className="section-label block mb-2">
                    Notes / Reason <span className="normal-case text-[10px]">(optional)</span>
                  </label>
                  <textarea
                    id="appt-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your symptoms or reason for visit…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all resize-none placeholder:text-muted-foreground/60"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Modal Footer CTA ── */}
          {!submitted && (
            <div className="px-5 py-4 border-t border-border bg-card">
              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="btn-primary w-full py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue <ArrowRight size={17} />
                </button>
              )}
              {step === 2 && (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceedStep2}
                  className="btn-primary w-full py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CheckCircle size={17} /> Confirm Booking
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════
   APPOINTMENTS PAGE
══════════════════════════════════════════ */
function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Upcoming");
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="px-4 md:px-6 py-5 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Appointments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage your visits</p>
        </div>
        <button
          id="btn-book-new"
          onClick={() => setShowBooking(true)}
          className="btn-primary text-sm py-2 px-4 gap-1.5"
        >
          <Plus size={15} /> Book New
        </button>
      </div>

      {/* Stats summary row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Upcoming", value: upcoming.length, color: "text-primary" },
          { label: "Completed", value: past.length, color: "text-success" },
          { label: "Cancelled", value: 0, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="card-elevated p-3 text-center">
            <p className={`stat-number text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`appointments-tab-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "Upcoming" && upcoming.length > 0 && (
              <span className="ml-1.5 text-[10px] font-bold text-primary bg-primary/12 px-1.5 py-0.5 rounded-full">
                {upcoming.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "Upcoming" && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {upcoming.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09 }}
                className="card-elevated p-5 border-l-4 border-l-primary"
              >
                <div className="flex items-start gap-4">
                  <img src={appt.image} alt={appt.doctor} className="w-14 h-14 rounded-2xl object-cover shrink-0" loading="lazy" width={56} height={56} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground">{appt.doctor}</h4>
                        <p className="text-sm text-primary font-semibold">{appt.specialty}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {appt.countdown}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{appt.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{appt.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{appt.location}</span>
                    </div>
                    <div className="mt-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${appt.type === "Teleconsult" ? "text-purple-600 bg-purple-50" : "text-teal-600 bg-teal-50"}`}>
                        {appt.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {appt.type === "Teleconsult" ? (
                    <button className="btn-primary flex-1 text-sm py-2.5"><Video size={15} /> Join Call</button>
                  ) : (
                    <button className="btn-primary flex-1 text-sm py-2.5"><Phone size={15} /> Call Clinic</button>
                  )}
                  <button className="btn-secondary py-2.5 px-4 text-sm">Reschedule</button>
                  <button className="py-2.5 px-3 text-sm rounded-xl border border-destructive/25 text-destructive hover:bg-destructive/6 transition-all font-semibold">Cancel</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Past" && (
          <motion.div
            key="past"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {past.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09 }}
                className="card-elevated p-5"
              >
                <div className="flex items-start gap-4">
                  <img src={appt.image} alt={appt.doctor} className="w-14 h-14 rounded-2xl object-cover shrink-0 opacity-90" loading="lazy" width={56} height={56} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground">{appt.doctor}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{appt.specialty}</p>
                      </div>
                      <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
                        <CheckCircle size={11} /> Done
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{appt.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{appt.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{appt.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn-primary flex-1 text-sm py-2.5">Book Again</button>
                  {appt.rating ? (
                    <div className="flex-1 flex items-center justify-center gap-1.5 bg-warning/8 text-warning-foreground rounded-xl text-sm font-semibold">
                      {Array.from({ length: appt.rating }).map((_, k) => (
                        <Star key={k} size={13} className="fill-warning text-warning" />
                      ))}
                    </div>
                  ) : (
                    <button className="btn-secondary flex-1 text-sm py-2.5"><Star size={14} /> Rate Visit</button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Cancelled" && (
          <motion.div
            key="cancelled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
              <XCircle size={38} className="text-muted-foreground/50" />
            </div>
            <h3 className="font-bold text-foreground text-lg">No Cancelled Appointments</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">Great! You haven't cancelled any appointments. Keep it up!</p>
            <button onClick={() => setShowBooking(true)} className="btn-primary mt-6 text-sm px-6 py-3">
              <Plus size={15} /> Book an Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prescription CTA */}
      {activeTab === "Past" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 card-elevated p-4 flex items-center justify-between bg-primary/4 border border-primary/10"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">Your Prescriptions</p>
            <p className="text-xs text-muted-foreground">View past prescription records</p>
          </div>
          <button className="btn-secondary text-xs py-2 px-3">View All <ChevronRight size={13} /></button>
        </motion.div>
      )}

      {/* ── Booking Modal (portal) ── */}
      <AnimatePresence>
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </div>
  );
}
