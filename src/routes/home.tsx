import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Home, Calendar, Search, User, Bell, MapPin, Stethoscope,
  Settings, HelpCircle, LogOut, X, Clock, CheckCircle,
  CalendarDays, Pill, AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomeLayout,
});

const navItems = [
  { to: "/home", icon: Home, label: "Home", exact: true },
  { to: "/home/appointments", icon: Calendar, label: "Appointments", exact: false },
  { to: "/home/search", icon: Search, label: "Find Doctor", exact: false },
  { to: "/home/profile", icon: User, label: "Profile", exact: false },
] as const;

/* ── Notification data ── */
type NotifType = "appointment" | "reminder" | "health" | "system";
interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initialNotifs: Notification[] = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Appointment",
    body: "Dr. Ananya Sharma · Cardiology · Apr 18 at 3:00 PM",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    type: "reminder",
    title: "Medication Reminder",
    body: "Time to take your evening dose of Metoprolol 25mg.",
    time: "4h ago",
    read: false,
  },
  {
    id: 3,
    type: "appointment",
    title: "Teleconsult Tomorrow",
    body: "Dr. Priya Nair · Neurology · Apr 22 at 11:30 AM",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "health",
    title: "Health Streak! 🔥",
    body: "You've maintained a 7-day health streak. Keep it up!",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Report Available",
    body: "Your blood work report from Apr 5 is now available to view.",
    time: "3 days ago",
    read: true,
  },
];

const notifIconMap: Record<NotifType, { icon: typeof Bell; color: string; bg: string }> = {
  appointment: { icon: CalendarDays, color: "text-primary", bg: "bg-primary/12" },
  reminder:    { icon: Pill,         color: "text-purple-500", bg: "bg-purple-50" },
  health:      { icon: AlertTriangle, color: "text-warning-foreground", bg: "bg-warning/12" },
  system:      { icon: CheckCircle,  color: "text-success", bg: "bg-success/12" },
};

/* ══════════════════════════════
   NOTIFICATION PANEL
══════════════════════════════ */
interface NotifPanelProps {
  notifs: Notification[];
  onMarkAllRead: () => void;
  onMarkRead: (id: number) => void;
  onClose: () => void;
}

function NotificationPanel({ notifs, onMarkAllRead, onMarkRead, onClose }: NotifPanelProps) {
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
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
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors ml-1"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="overflow-y-auto max-h-[400px]">
        {notifs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Bell size={22} className="text-muted-foreground/40" />
            </div>
            <p className="text-sm font-semibold text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">No new notifications</p>
          </div>
        ) : (
          notifs.map((notif, i) => {
            const meta = notifIconMap[notif.type];
            const Icon = meta.icon;
            return (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onMarkRead(notif.id)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 border-b border-border last:border-0 ${
                  !notif.read ? "bg-primary/3" : ""
                }`}
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={16} className={meta.color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-tight ${notif.read ? "text-foreground/80" : "text-foreground"}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                    {notif.body}
                  </p>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70 mt-1.5">
                    <Clock size={10} /> {notif.time}
                  </span>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="py-2.5 px-4 border-t border-border bg-muted/30">
        <button className="text-xs font-semibold text-primary hover:underline w-full text-center">
          View all notifications
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════
   HOME LAYOUT
══════════════════════════════ */
function HomeLayout() {
  const location = useLocation();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  // Close on route change
  useEffect(() => {
    setNotifOpen(false);
  }, [location.pathname]);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const isActive = (to: string, exact: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen app-bg flex home-app">
      {/* ═══ Desktop Sidebar ═══ */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 sidebar-bg border-r border-border z-40">
        {/* Brand */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Stethoscope size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="brand-name text-foreground text-xl leading-none">MedBook</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide uppercase font-semibold">Healthcare Platform</p>
            </div>
          </div>
        </div>

        {/* Greeting card */}
        <div className="p-5">
          <div className="bg-primary/6 border border-primary/12 rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{greeting} 👋</p>
            <p className="font-bold text-foreground text-base mt-0.5">Rohan Kapadi</p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Premium Member
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-border space-y-0.5">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <Settings size={17} /> Settings
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <HelpCircle size={17} /> Help & Support
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-destructive/80 hover:bg-destructive/6 hover:text-destructive transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ═══ Main area ═══ */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 topbar-glass border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile: greeting */}
            <div className="md:hidden">
              <p className="text-sm text-muted-foreground leading-none">{greeting} 👋</p>
              <p className="text-base font-bold text-foreground mt-0.5">Rohan</p>
            </div>
            {/* Desktop: greeting */}
            <div className="hidden md:block">
              <p className="text-xs text-muted-foreground">{greeting} 👋</p>
              <p className="text-base font-bold text-foreground">Rohan Kapadi</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn-secondary py-1.5 px-3 text-xs gap-1.5">
                <MapPin size={13} /> Mumbai
              </button>

              {/* ── Bell button with dropdown ── */}
              <div className="relative" ref={notifRef}>
                <button
                  id="btn-notifications"
                  onClick={() => setNotifOpen((o) => !o)}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                    notifOpen
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {/* Animated bell */}
                  <motion.div
                    animate={notifOpen ? { rotate: [0, -15, 15, -10, 10, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Bell size={17} />
                  </motion.div>

                  {/* Unread badge */}
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-emergency text-white text-[10px] font-bold rounded-full border-2 border-card flex items-center justify-center px-0.5"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Notification panel */}
                <AnimatePresence>
                  {notifOpen && (
                    <NotificationPanel
                      notifs={notifs}
                      onMarkAllRead={markAllRead}
                      onMarkRead={markRead}
                      onClose={() => setNotifOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/home/profile"
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm"
              >
                R
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-24 md:pb-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* ═══ Mobile Bottom Nav ═══ */}
      <nav className="fixed bottom-0 left-0 right-0 topbar-glass border-t border-border md:hidden z-50">
        <div className="flex items-center py-1 px-1 safe-area-pb">
          {navItems.map((item) => {
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex-1 flex flex-col items-center gap-0.5 pt-2 pb-1.5"
              >
                <div className={`w-12 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${active ? "bg-primary/15" : ""}`}>
                  <item.icon size={20} className={`transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
