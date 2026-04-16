import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search, ShieldCheck, Users, Star, Stethoscope, Heart, Brain,
  Eye, Bone, Activity, CheckCircle, ArrowRight, Zap, Video, Clock,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import heroImage from "../assets/hero-doctors.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "MedBook — Book Doctor Appointments Easily & Instantly" },
      { name: "description", content: "Find verified doctors, book instant appointments, and get healthcare from the comfort of your home. Trusted by 2M+ patients." },
      { property: "og:title", content: "MedBook — Book Doctor Appointments Easily & Instantly" },
      { property: "og:description", content: "Find verified doctors, book instant appointments. Trusted by 2M+ patients." },
    ],
  }),
});

const categories = [
  { icon: Stethoscope, label: "General Physician", color: "oklch(0.55 0.14 175)" },
  { icon: Heart, label: "Cardiologist", color: "oklch(0.6 0.22 25)" },
  { icon: Brain, label: "Neurologist", color: "oklch(0.55 0.18 280)" },
  { icon: Eye, label: "Ophthalmologist", color: "oklch(0.6 0.15 230)" },
  { icon: Bone, label: "Orthopedic", color: "oklch(0.65 0.15 55)" },
  { icon: Activity, label: "Dermatologist", color: "oklch(0.6 0.16 330)" },
];

const steps = [
  { icon: Search, title: "Search Doctor", desc: "Find by specialty, name, or location" },
  { icon: Clock, title: "Select Slot", desc: "Pick a time that works for you" },
  { icon: CheckCircle, title: "Confirm Booking", desc: "Instant confirmation, zero hassle" },
];

const testimonials = [
  { name: "Priya S.", text: "Booked an appointment in under 30 seconds! The doctor was incredibly professional. MedBook has changed how I think about healthcare.", rating: 5 },
  { name: "Rahul M.", text: "The teleconsultation feature saved me a trip across the city. Seamless video call with my cardiologist.", rating: 5 },
  { name: "Anita K.", text: "As a senior citizen, I found this app very easy to use. Large buttons and clear text — exactly what I needed.", rating: 5 },
];

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex gap-2 mb-6">
                <span className="trust-badge"><ShieldCheck size={15} /> Verified Doctors</span>
                <span className="trust-badge"><Star size={15} /> 4.8+ Rating</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4">
                Book Doctor Appointments{" "}
                <span className="text-primary">Easily & Instantly</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Verified doctors, instant slot booking, zero waiting time. Your health, simplified.
              </p>
              <SearchBar />
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users size={16} className="text-primary" /> <strong className="text-foreground">2M+</strong> Patients</span>
                <span className="flex items-center gap-1.5"><Stethoscope size={16} className="text-primary" /> <strong className="text-foreground">15K+</strong> Doctors</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> HIPAA Compliant</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src={heroImage}
                alt="Trusted team of healthcare professionals"
                className="rounded-3xl shadow-2xl w-full"
                width={1280}
                height={720}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 md:py-20">
        <div className="section-container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Browse by Specialty</h2>
            <p className="text-muted-foreground mt-2">Find the right care for your needs</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <CategoryCard key={c.label} icon={c.icon} label={c.label} color={c.color} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-muted/50">
        <div className="section-container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-2">Book your appointment in 3 simple steps</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon size={28} className="text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-1">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Emergency Booking", desc: "1-tap access to urgent care doctors available now", btn: "btn-emergency", label: "Book Emergency" },
              { icon: Video, title: "Teleconsultation", desc: "Video call with specialists from the comfort of home", btn: "btn-primary", label: "Start Video Call" },
              { icon: Activity, title: "AI Recommendations", desc: "Get personalized doctor suggestions based on symptoms", btn: "btn-secondary", label: "Get Recommendations" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{item.desc}</p>
                <button className={`${item.btn} text-sm w-full`}>{item.label}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="section-container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Patients Say</h2>
            <p className="text-muted-foreground mt-2">Trusted by millions across the country</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to take charge of your health?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Join 2 million+ patients who trust MedBook for their healthcare needs.
            </p>
            <button className="btn-primary text-lg py-4 px-8">
              Book Your Appointment <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Sticky CTA (mobile) */}
      <div className="sticky-cta md:hidden">
        <button className="btn-primary w-full">Book Appointment</button>
      </div>
    </div>
  );
}
