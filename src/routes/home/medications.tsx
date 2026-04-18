import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Pill, Clock, CalendarDays, Info, CheckCircle, 
  AlertTriangle, RefreshCw, ChevronRight, Droplets, HeartPulse
} from "lucide-react";

export const Route = createFileRoute("/home/medications")({
  component: MedicationsPage,
  head: () => ({
    meta: [
      { title: "Medications — MedBook" },
      { name: "description", content: "Track and manage your prescribed medications." },
    ],
  }),
});

/* ── MOCK DATA ── */
type MedTime = "Morning" | "Afternoon" | "Evening" | "Night";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  type: "Pill" | "Liquid" | "Injection";
  prescribedBy: string;
  condition: string;
  schedule: MedTime[];
  frequency: string;
  remaining: number;
  total: number;
  nextDose: { time: string; period: MedTime; taken: boolean };
  instructions: string;
}

const medications: Medication[] = [
  {
    id: "m1",
    name: "Metoprolol Succinate",
    dosage: "25mg",
    type: "Pill",
    prescribedBy: "Dr. Ananya Sharma",
    condition: "Blood Pressure",
    schedule: ["Morning", "Evening"],
    frequency: "Twice daily with food",
    remaining: 18,
    total: 30,
    nextDose: { time: "8:00 PM", period: "Evening", taken: false },
    instructions: "Take after meals. May cause mild dizziness initially.",
  },
  {
    id: "m2",
    name: "Atorvastatin",
    dosage: "10mg",
    type: "Pill",
    prescribedBy: "Dr. Ananya Sharma",
    condition: "Cholesterol",
    schedule: ["Night"],
    frequency: "Once daily before bed",
    remaining: 4,
    total: 30,
    nextDose: { time: "10:00 PM", period: "Night", taken: false },
    instructions: "Avoid grapefruit juice while on this medication.",
  },
  {
    id: "m3",
    name: "Amoxicillin",
    dosage: "500mg",
    type: "Pill",
    prescribedBy: "Dr. Vikram Malhotra",
    condition: "Sinus Infection",
    schedule: ["Morning", "Afternoon", "Evening"],
    frequency: "Every 8 hours",
    remaining: 9,
    total: 21,
    nextDose: { time: "2:00 PM", period: "Afternoon", taken: true },
    instructions: "Complete the full course even if you feel better.",
  },
  {
    id: "m4",
    name: "Cough Syrup (Ascoril)",
    dosage: "10ml",
    type: "Liquid",
    prescribedBy: "Dr. Vikram Malhotra",
    condition: "Dry Cough",
    schedule: ["Morning", "Night"],
    frequency: "As needed (max 3/day)",
    remaining: 40,
    total: 100,
    nextDose: { time: "As needed", period: "Night", taken: false },
    instructions: "Shake well before use. May cause drowsiness.",
  }
];

const timeIconMap: Record<MedTime, JSX.Element> = {
  Morning: <span className="text-xl">🌅</span>,
  Afternoon: <span className="text-xl">☀️</span>,
  Evening: <span className="text-xl">🌇</span>,
  Night: <span className="text-xl">🌙</span>,
};

function MedicationsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Today" | "Low Stock">("All");

  const filteredMeds = medications.filter((med) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Low Stock") return (med.remaining / med.total) <= 0.2;
    // For 'Today', simulating logic where all scheduled meds are shown
    if (activeFilter === "Today") return med.schedule.length > 0;
    return true;
  });

  const medsToTakeCount = medications.filter(m => !m.nextDose.taken && m.nextDose.time !== "As needed").length;

  return (
    <div className="px-4 md:px-6 py-5 max-w-4xl mx-auto space-y-6">
      
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Medications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track prescriptions and timely refills</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Pill size={20} />
        </div>
      </div>

      {/* Daily Progress Alert */}
      {medsToTakeCount > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-primary/8 border border-primary/20 rounded-2xl p-4 flex gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex flex-col items-center justify-center shrink-0 border-4 border-white shadow-sm">
            <span className="font-bold text-primary leading-none text-sm">{medsToTakeCount}</span>
            <span className="text-[9px] font-bold text-primary uppercase">Meds</span>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm">Upcoming today</h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              You have {medsToTakeCount} scheduled dose{medsToTakeCount > 1 ? 's' : ''} left to take today. Set reminders to stay on track.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="bg-success/10 border border-success/20 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle className="text-success" size={24} />
          <div>
            <h3 className="font-bold text-success-foreground text-sm">All caught up!</h3>
            <p className="text-xs text-success-foreground/70 mt-0.5">You've taken all your scheduled medications for today.</p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-muted/50 p-1.5 rounded-xl overflow-x-auto scrollbar-hide">
        {(["All", "Today", "Low Stock"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter}
            {filter === "Low Stock" && (
              <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-emergency" />
            )}
          </button>
        ))}
      </div>

      {/* Medications List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMeds.map((med, i) => {
            const isLow = (med.remaining / med.total) <= 0.2;
            const ProgressColor = isLow ? "bg-emergency" : "bg-primary";

            return (
              <motion.div
                layout
                key={med.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="card-elevated p-0 overflow-hidden"
              >
                {/* Top Half: Medicine Info */}
                <div className="p-4 md:p-5 flex gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${med.type === 'Liquid' ? 'bg-blue-50 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                    {med.type === 'Liquid' ? <Droplets size={26} /> : <Pill size={26} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-lg truncate flex items-center gap-2">
                          {med.name} 
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold tracking-wide">
                            {med.dosage}
                          </span>
                        </h3>
                        <p className="text-sm text-primary font-semibold flex items-center gap-1.5 mt-0.5">
                          <HeartPulse size={14} /> {med.condition}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                        <CalendarDays size={14} /> {med.frequency}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-foreground">Prescribed by:</span> {med.prescribedBy}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info block: Schedule & Next dose */}
                <div className="px-4 md:px-5 pb-4">
                  <div className="bg-muted/30 rounded-xl p-3 flex flex-col md:flex-row md:items-center gap-4 justify-between border border-border/50">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">Schedule</p>
                      <div className="flex gap-2">
                        {med.schedule.map(time => (
                          <div key={time} className="flex items-center gap-1 bg-card border border-border rounded-md px-2 py-1 shadow-sm tooltip-trigger relative group">
                            {timeIconMap[time]}
                            <span className="text-[10px] font-semibold">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-3 md:pt-0 md:pl-4">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Next Dose</p>
                      <div className="flex items-center md:justify-end gap-2">
                        {med.nextDose.taken ? (
                          <span className="text-sm font-bold text-success flex items-center gap-1">
                            <CheckCircle size={15}/> Taken
                          </span>
                        ) : (
                          <span className="text-sm font-bold text-foreground flex items-center gap-1">
                            <Clock size={15} className="text-primary"/> {med.nextDose.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Half: Stock & Refill */}
                <div className="bg-card border-t border-border px-4 py-3 md:px-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 w-full max-w-sm">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-muted-foreground">Inventory</span>
                      <span className={isLow ? "text-emergency" : "text-foreground"}>
                        {med.remaining} / {med.total} {med.type === 'Liquid' ? 'ml' : 'pills'} left
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${ProgressColor}`} 
                        style={{ width: `${(med.remaining / med.total) * 100}%` }}
                      />
                    </div>
                    {isLow && (
                      <p className="text-[10px] font-bold text-emergency flex items-center gap-1 mt-1.5">
                        <AlertTriangle size={10} /> Running low. Refill soon.
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className={`flex-1 md:flex-none text-xs font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                      isLow 
                      ? "bg-emergency/10 text-emergency hover:bg-emergency/20" 
                      : "bg-muted text-foreground hover:bg-muted/80"
                    }`}>
                      <RefreshCw size={14} /> Refill
                    </button>
                    {!med.nextDose.taken && med.nextDose.time !== "As needed" && (
                      <button className="flex-1 md:flex-none bg-primary text-primary-foreground text-xs font-bold py-2 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1">
                        Take Now <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredMeds.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="text-muted-foreground/40" size={32} />
            </div>
            <h3 className="font-bold text-foreground text-lg mb-1">No medications found</h3>
            <p className="text-sm text-muted-foreground">No medications match the current filter.</p>
          </motion.div>
        )}
      </div>

      {/* Instructions / Info tip */}
      <div className="bg-primary/5 rounded-xl p-4 flex gap-3 text-sm text-muted-foreground">
        <Info className="shrink-0 text-primary mt-0.5" size={18} />
        <p>Always consult your doctor before modifying your medication schedule. Keep medicines stored in a cool, dry place away from direct sunlight.</p>
      </div>

    </div>
  );
}
