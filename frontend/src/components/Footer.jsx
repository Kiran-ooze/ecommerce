import { Link } from "react-router-dom";
import { ShoppingBag, Mail, ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full mt-24 bg-white border-t border-zinc-200/80 text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-100">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-zinc-900">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-base tracking-tight text-zinc-900">
                ShopEasy
              </span>
            </Link>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Minimal, fast, and secure e-commerce platform designed for modern shopping experiences.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium text-zinc-600">
              <li>
                <Link to="/" className="hover:text-zinc-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-zinc-900 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <a href="#support" className="hover:text-zinc-900 transition-colors inline-flex items-center gap-1">
                  Support <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Card */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Support & Contact
            </h4>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>Need assistance?</span>
              </div>
              <p className="text-xs text-zinc-500">
                Our support team is available 24/7 to answer your queries.
              </p>
              <a 
                href="mailto:support@shopeasy.com" 
                className="inline-block text-xs font-semibold text-zinc-900 underline hover:text-zinc-600"
              >
                support@shopeasy.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ShopEasy Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">
              Cookies
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;