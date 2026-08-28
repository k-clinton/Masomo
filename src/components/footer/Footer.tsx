import Link from "next/link";
import { siteConfig } from "@/data/site";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] py-20 px-6 md:px-10 xl:px-16 dark">
      <div className="max-w-[1400px] mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl text-[#f5f5f0] hover:text-[#c5a059] transition-colors duration-300 block mb-4"
            >
              Mersomo
            </Link>
            <p className="text-sm text-[#f5f5f0]/50 leading-relaxed max-w-xs">
              Premium academic support and educational services. Helping
              students achieve their full potential.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#f5f5f0]/40 mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#f5f5f0]/60 hover:text-[#f5f5f0] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#f5f5f0]/60 hover:text-[#f5f5f0] transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#f5f5f0]/40 mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-[#f5f5f0]/60 hover:text-[#c5a059] transition-colors duration-200"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-[#f5f5f0]/60 hover:text-[#f5f5f0] transition-colors duration-200"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <p className="text-sm text-[#f5f5f0]/40">
                  {siteConfig.contact.location}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-[#f5f5f0]/30">
            &copy; {year} Mersomo. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mersomo on X"
              className="text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              <XIcon size={16} />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mersomo on LinkedIn"
              className="text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mersomo on Instagram"
              className="text-[#f5f5f0]/40 hover:text-[#f5f5f0] transition-colors duration-200"
            >
              <InstagramIcon size={16} />
            </a>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#f5f5f0]/30 hover:text-[#f5f5f0]/60 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
