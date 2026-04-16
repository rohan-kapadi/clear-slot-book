import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
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
  { icon: Stethoscope, label: "General Physician", color: "oklch(0.55 0.14 175)", desc: "Primary care, fever, cold, and routine health checkups." },
  { icon: Heart, label: "Cardiologist", color: "oklch(0.6 0.22 25)", desc: "Expert care for heart health, blood pressure, and cardiovascular conditions." },
  { icon: Brain, label: "Neurologist", color: "oklch(0.55 0.18 280)", desc: "Specialist treatment for brain, spinal cord, and nervous system disorders." },
  { icon: Eye, label: "Ophthalmologist", color: "oklch(0.6 0.15 230)", desc: "Comprehensive vision care, eye diseases, and optical surgeries." },
  { icon: Bone, label: "Orthopedic", color: "oklch(0.65 0.15 55)", desc: "Advanced treatment for bones, joints, ligaments, tendons, and muscles." },
  { icon: Activity, label: "Dermatologist", color: "oklch(0.6 0.16 330)", desc: "Specialized care for skin conditions, hair loss, and cosmetic dermatology." },
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
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                Book Doctor Appointments{" "}
                <span className="text-primary">Easily & Instantly</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
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
              className="hidden md:block relative perspective-1000"
            >
              {/* Massive continuous physics loop (Float, Scale, Rotate) */}
              <motion.div
                animate={{ 
                  y: [0, -18, 0], 
                  scale: [1, 1.025, 1], 
                  rotate: [0, -1.5, 0] 
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative"
              >
                {/* Static base shadow container */}
                <div className="absolute inset-0 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] pointer-events-none" />
                
                {/* Dynamically pulsing deep shadow and color wash */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(var(--color-primary),0.3)] bg-gradient-to-tr from-primary/20 via-transparent to-transparent z-10 pointer-events-none mix-blend-overlay" 
                />
                
                <img
                  src={heroImage}
                  alt="Trusted team of healthcare professionals"
                  className="rounded-[2.5rem] border border-white/20 dark:border-white/10 w-full relative z-0"
                  width={1280}
                  height={720}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 md:py-20 relative overflow-hidden bg-muted/20">
        {/* Visible background image */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Soft edge fade so it doesn't look like a harsh block */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Browse by Specialty</h2>
            <p className="text-muted-foreground mt-4 text-lg">Find the right care for your needs</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((c, i) => (
              <CategoryCard key={c.label} icon={c.icon} label={c.label} color={c.color} desc={c.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
        {/* Visible background image */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop')`, // Clinical/modern texture
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Soft edge fade so it blends into the page flawlessly */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-4 text-lg">Book your appointment in 3 simple steps</p>
          </motion.div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Background dashed connecting line */}
            <div className="hidden md:block absolute top-[4rem] left-[16.66%] right-[16.66%] border-t-[3px] border-dotted border-border/80 z-0" />
            
            {/* Animated foreground solid line */}
            <div 
              className="hidden md:block absolute top-[4rem] left-[16.66%] border-t-[3px] border-solid border-primary z-0 transition-all duration-700 ease-in-out text-primary" 
              style={{ width: hoveredStep === null || hoveredStep === 0 ? '0%' : hoveredStep === 1 ? '50%' : '100%' }}
            >
               {/* Glowing dot leading the path */}
               <div 
                 className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 translate-x-1.5 rounded-full bg-primary shadow-[0_0_12px_4px_currentColor] transition-opacity duration-300" 
                 style={{ opacity: hoveredStep ? 1 : 0 }} 
               />
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`card-elevated p-8 text-center transition-all duration-500 border border-transparent bg-card overflow-hidden relative group
                    ${hoveredStep === i ? 'shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] shadow-primary/20 ring-1 ring-primary/40 -translate-y-2' : ''}
                    ${hoveredStep !== null && i === hoveredStep + 1 ? 'border-primary/20 shadow-xl -translate-y-1 bg-primary/[0.02]' : ''}
                    ${hoveredStep !== null && i < hoveredStep ? 'scale-[0.98] blur-[1px] opacity-80' : ''}
                  `}
                >
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-500
                    ${hoveredStep === i ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-110' : 'bg-primary/10 text-primary'}
                    ${hoveredStep !== null && i === hoveredStep + 1 ? 'bg-primary/20 scale-105' : ''}
                  `}>
                    <step.icon size={28} className={hoveredStep === i ? 'text-primary-foreground' : 'text-primary'} />
                  </div>
                  
                  <div className={`text-sm font-bold mb-2 transition-colors duration-500 ${hoveredStep === i ? 'text-primary' : 'text-primary/70'}`}>Step {i + 1}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Ambient background glows so the glassmorphism pops */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-emergency/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: Zap, title: "Emergency Booking", desc: "1-tap access to urgent care doctors available now", btn: "btn-emergency", label: "Book Emergency", 
                glowClass: "hover:shadow-emergency/30 hover:border-emergency/40", 
                iconClass: "bg-emergency/10 text-emergency group-hover:bg-emergency group-hover:text-emergency-foreground group-hover:shadow-[0_0_20px_rgba(var(--color-emergency),0.4)]" 
              },
              { 
                icon: Video, title: "Teleconsultation", desc: "Video call with specialists from the comfort of home", btn: "btn-primary", label: "Start Video Call", 
                glowClass: "hover:shadow-primary/30 hover:border-primary/40", 
                iconClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.4)]" 
              },
              { 
                icon: Activity, title: "AI Recommendations", desc: "Get personalized doctor suggestions based on symptoms", btn: "btn-secondary", label: "Get Recommendations", 
                glowClass: "hover:shadow-foreground/10 hover:border-foreground/30", 
                iconClass: "bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-background group-hover:shadow-lg" 
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`p-8 flex flex-col rounded-3xl transition-all duration-500 border group cursor-default
                  bg-white/40 dark:bg-black/30 backdrop-blur-2xl border-white/40 dark:border-white/10 
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]
                  ${item.glowClass} hover:-translate-y-2 hover:shadow-2xl
                `}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ease-out ${item.iconClass}`}>
                  <item.icon size={28} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">{item.desc}</p>
                <button className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 ${item.btn === 'btn-secondary' ? 'bg-background hover:bg-muted text-foreground border border-border group-hover:border-foreground/50' : item.btn}`}>
                  {item.label}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-muted/40">
        {/* Visible background image */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')`, // Clean laboratory / clinical bokeh
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Ambient background glows for extra glass punch */}
        <div className="absolute top-1/4 -right-1/4 w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-emergency/10 blur-[120px] rounded-full pointer-events-none z-0" />
        
        {/* Soft edge fade  */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">What Patients Say</h2>
            <p className="text-muted-foreground mt-4 text-lg">Trusted by millions across the country</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Ready to take charge of your health?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
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
