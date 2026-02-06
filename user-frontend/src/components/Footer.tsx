import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'News room', href: '#' },
    { name: 'Blog', href: '#' },
    { name: "Didn't find your product?", href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Sellers', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Left Section: Branding & Address */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00b8d9] rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-200">
                💠
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-slate-800 font-extrabold text-lg">FRESH</span>
                <span className="text-emerald-500 text-[10px] tracking-[0.3em] font-bold">SAFE</span>
              </div>
            </div>
            <address className="not-italic text-sm text-slate-500 leading-relaxed">
              Freshtohome Foods Private Limited No. 1, 2nd Floor,<br />
              Carlton Towers, Old Airport Road,<br />
              Bangalore – 560008
            </address>
          </div>

          {/* Center Section: Navigation & Description */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-600 font-medium">
              {footerLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-[#00b8d9] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.length - 1 && (
                    <span className="text-slate-300" aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            <p className="text-sm text-slate-500">
              Order your daily Fish, Poultry and Mutton. <br className="hidden sm:block" />
              Get it delivered at your door steps.
            </p>
          </div>

          {/* Right Section: Contact & Socials */}
          <div className="flex flex-col md:items-start lg:items-end">
            <div className="w-full lg:w-fit">
              <h4 className="text-slate-800 font-bold mb-3">Contact Us</h4>
              <p className="text-sm text-slate-500 hover:text-[#00b8d9] transition-colors cursor-pointer">1800-313-3302</p>
              <p className="text-sm text-slate-500 mb-6 hover:text-[#00b8d9] transition-colors cursor-pointer">customercare@freshtohome.com</p>

              <h4 className="text-slate-800 font-bold mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <SocialIcon Icon={Facebook} href="#" />
                <SocialIcon Icon={Twitter} href="#" />
                <SocialIcon Icon={Instagram} href="#" />
                <SocialIcon Icon={Youtube} href="#" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} Fresh & Safe. All rights reserved.
      </div>
    </footer>
  );
};

// Helper Social Icon Component
const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
  <Link 
    href={href} 
    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#00b8d9] hover:text-[#00b8d9] hover:shadow-sm transition-all duration-200"
  >
    <Icon size={18} />
  </Link>
);

export default Footer;