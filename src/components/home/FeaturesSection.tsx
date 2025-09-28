'use client';

import { Icon } from '@iconify/react';

export default function FeaturesSection() {
  return (
    <section className="bg-dark-primary/30 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Why Choose Casinade?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:shield-check" className="w-8 h-8 text-dark-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Secure Gaming</h3>
          <p className="text-white/70">
            Your security is our priority with SSL encryption and licensed gaming.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:gift" className="w-8 h-8 text-dark-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Amazing Bonuses</h3>
          <p className="text-white/70">
            Get welcome bonuses, daily rewards, and special promotions.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:headset" className="w-8 h-8 text-dark-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
          <p className="text-white/70">
            Our support team is always here to help you with any questions.
          </p>
        </div>
      </div>
    </section>
  );
}
