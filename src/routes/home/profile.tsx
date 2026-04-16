import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  User, MapPin, Phone, Mail, Bell, Shield, HelpCircle,
  ChevronRight, Star, TrendingUp, Calendar, LogOut, Edit3,
  Heart, FileText, CreditCard, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/home/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profile — MedBook" },
      { name: "description", content: "Manage your account, health preferences, and privacy settings." },
    ],
  }),
});

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", desc: "Name, email, date of birth", color: "oklch(0.55 0.14 175)" },
      { icon: MapPin, label: "Address & Location", desc: "Mumbai, Maharashtra", color: "oklch(0.6 0.15 230)" },
      { icon: Phone, label: "Contact Details", desc: "+91 98765 43210", color: "oklch(0.65 0.15 55)" },
    ],
  },
  {
    title: "Health",
    items: [
      { icon: Heart, label: "Health Preferences", desc: "Allergies, conditions, blood group", color: "oklch(0.6 0.22 25)" },
      { icon: FileText, label: "My Records", desc: "Reports, prescriptions, history", color: "oklch(0.55 0.18 280)" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Appointment reminders, updates", color: "oklch(0.65 0.22 80)" },
      { icon: CreditCard, label: "Payment Methods", desc: "Cards, UPI, wallets", color: "oklch(0.55 0.14 175)" },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: Shield, label: "Privacy & Security", desc: "Password change, two-factor auth", color: "oklch(0.55 0.14 175)" },
      { icon: Mail, label: "Email Preferences", desc: "Reports, newsletters, promotions", color: "oklch(0.6 0.15 230)" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: MessageSquare, label: "Chat with Us", desc: "24/7 support via chat", color: "oklch(0.55 0.14 175)" },
      { icon: HelpCircle, label: "Help & FAQs", desc: "Common questions, guides", color: "oklch(0.65 0.15 55)" },
      { icon: Star, label: "Rate MedBook", desc: "Share your feedback on the store", color: "oklch(0.75 0.15 75)" },
    ],
  },
];

function ProfilePage() {
  return (
    <div className="px-4 md:px-6 py-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-5 mb-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center text-3xl font-bold text-white select-none shadow-md">
              R
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Edit3 size={13} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-foreground truncate">Rohan Kapadi</h2>
            <p className="text-sm text-muted-foreground">rohan.kapadi@email.com</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                Premium
              </span>
              <span className="text-[11px] text-muted-foreground">Member since Jan 2025</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border">
          {[
            { icon: TrendingUp, label: "Total Visits", value: "23" },
            { icon: Calendar, label: "Appointments", value: "5" },
            { icon: Star, label: "Reviews", value: "8" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1.5">
                <s.icon size={15} className="text-primary" />
              </div>
              <p className="stat-number text-xl text-foreground leading-none">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Health summary chip row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="card-elevated p-4 mb-6"
      >
        <p className="section-label mb-3">Health Summary</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Blood Group: B+", color: "oklch(0.6 0.22 25)" },
            { label: "No Allergies", color: "oklch(0.6 0.18 145)" },
            { label: "Non-Smoker", color: "oklch(0.55 0.14 175)" },
            { label: "29 yrs", color: "oklch(0.6 0.15 230)" },
            { label: "Mumbai", color: "oklch(0.65 0.15 55)" },
          ].map((chip) => (
            <span
              key={chip.label}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: `${chip.color}18`, color: chip.color }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Settings sections */}
      <div className="space-y-5">
        {settingsSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.07 }}
          >
            <h3 className="section-label mb-2">{section.title}</h3>
            <div className="card-elevated overflow-hidden">
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors ${
                    ii < section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={15} className="text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sign Out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-destructive/25 text-destructive hover:bg-destructive/5 transition-all font-semibold text-sm">
          <LogOut size={16} /> Sign Out
        </button>
      </motion.div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground mt-5 mb-2">
        MedBook v1.0.0 · © 2026 · Privacy Policy
      </p>
    </div>
  );
}
