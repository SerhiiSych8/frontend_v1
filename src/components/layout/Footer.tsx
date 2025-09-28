'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    games: [
      { name: 'Slots', href: '/games/slots' },
      { name: 'Blackjack', href: '/games/blackjack' },
      { name: 'Roulette', href: '/games/roulette' },
      { name: 'Poker', href: '/games/poker' },
      { name: 'Live Casino', href: '/live-casino' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Live Chat', href: '/support' },
      { name: 'FAQ', href: '/faq' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Responsible Gaming', href: '/responsible-gaming' },
      { name: 'Licenses', href: '/licenses' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
    ],
  };

  return (
    <footer className="bg-dark-primary rounded-xl mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-yellow-primary rounded-lg flex items-center justify-center">
                <Icon icon="mdi:dice-6" className="w-6 h-6 text-dark-primary" />
              </div>
              <span className="text-2xl font-bold text-yellow-primary">Casinade</span>
            </div>
            <p className="text-yellow-primary/70 text-sm mb-6 max-w-xs">
              Your ultimate destination for premium online casino games, secure gaming, and exciting bonuses.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Icon icon="mdi:facebook" className="w-5 h-5 text-yellow-primary/50" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Icon icon="mdi:twitter" className="w-5 h-5 text-yellow-primary/50" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Icon icon="mdi:instagram" className="w-5 h-5 text-yellow-primary/50" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Discord"
              >
                <Icon icon="mdi:discord" className="w-5 h-5 text-yellow-primary/50" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Games */}
            <div>
              <h3 className="text-yellow-primary font-semibold mb-4">Games</h3>
              <ul className="space-y-3">
                {footerLinks.games.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-yellow-primary/50 hover:text-primary-lavendar transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-yellow-primary font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-yellow-primary/50 hover:text-primary-lavendar transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-yellow-primary font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-yellow-primary/50 hover:text-primary-lavendar transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-yellow-primary font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-yellow-primary/50 hover:text-primary-lavendar transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-lavendar/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:shield-check" className="w-5 h-5 text-yellow-primary/50" />
                <span className="text-sm text-yellow-primary/50">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:lock" className="w-5 h-5 text-yellow-primary/50" />
                <span className="text-sm text-yellow-primary/50">Licensed Gaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:account-group" className="w-5 h-5 text-yellow-primary/50" />
                <span className="text-sm text-yellow-primary/50">24/7 Support</span>
              </div>
            </div>
            <p className="text-sm text-yellow-primary/50">
              © {currentYear} Casinade. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
