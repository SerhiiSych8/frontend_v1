'use client';

import { Icon } from '@iconify/react';

export default function HeroSection() {
  return (
    <section className="text-center py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Welcome to{' '}
        <span className="text-yellow-primary">Casinade</span>
      </h1>
      <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
        Experience the ultimate online casino with premium games, secure gaming,
        and exciting bonuses. Join thousands of players worldwide!
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="bg-yellow-primary text-dark-primary hover:bg-yellow-primary/90 font-bold px-8 py-3 rounded-lg transition-colors">
          Play Now
        </button>
        <button className="border border-lavendar-primary text-lavendar-primary hover:bg-lavendar-primary/10 font-medium px-8 py-3 rounded-lg transition-colors">
          Learn More
        </button>
      </div>
    </section>
  );
}
