import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-heading text-lg font-bold">MedBook</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Trusted healthcare booking for millions. Find verified doctors instantly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Find Doctors</li>
              <li>Book Appointments</li>
              <li>Teleconsultation</li>
              <li>Emergency</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>HIPAA Compliance</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-60">
          <p>© 2026 MedBook. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart size={14} className="text-emergency" /> for better healthcare</p>
        </div>
      </div>
    </footer>
  );
}
