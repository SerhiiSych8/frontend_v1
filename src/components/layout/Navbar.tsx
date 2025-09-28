'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useNavbar } from '../Layout';

// Icons
import IconLanguage from '@/assets/icons/language.svg';
import IconLiveSupport from "@/assets/icons/live_support.svg";
import IconTournaments from "@/assets/icons/tournament.svg";
import IconVIPProgram from "@/assets/icons/vip.svg";
import IconPromotions from "@/assets/icons/promotion.svg";
import IconAffiliateProgram from "@/assets/icons/affiliate.svg";
import IconSetting from "@/assets/icons/setting.svg";
import IconLiveCasino from "@/assets/icons/live_casino.svg";
import IconLiveDealer from "@/assets/icons/live_dealer.svg";
import IconPopularGames from "@/assets/icons/popular_game.svg";
import IconNewGames from "@/assets/icons/new_game.svg";
import IconBonusBuys from "@/assets/icons/bonus_buy.svg";
import IconSlots from "@/assets/icons/slot.svg";
import IconCrashGames from "@/assets/icons/crash.svg";
import IconMegaways from "@/assets/icons/megaway.svg";
import IconTableGames from "@/assets/icons/table_game.svg";
import IconJackpots from "@/assets/icons/jackpot.svg";
import IconProviders from "@/assets/icons/provider.svg";
import IconCasino from "@/assets/icons/casino.svg";
import IconSport from "@/assets/icons/sport.svg";

interface NavbarProps {
  isAuthenticated: boolean;
}

const casinoItems = [
  { name: 'Live Casino', href: '/live-casino', icon: IconLiveCasino },
  { name: 'Live Dealer', href: '/live-dealer', icon: IconLiveDealer },
  { name: 'Popular Games', href: '/popular-games', icon: IconPopularGames },
  { name: 'New Games', href: '/new-games', icon: IconNewGames },
  { name: 'Bonus Buys', href: '/bonus-buys', icon: IconBonusBuys },
  { name: 'Slots', href: '/slots', icon: IconSlots },
  { name: 'Crash Games', href: '/crash-games', icon: IconCrashGames },
  { name: 'Megaways', href: '/megaways', icon: IconMegaways },
  { name: 'Table Games', href: '/table-games', icon: IconTableGames },
  { name: 'Jackpots', href: '/jackpots', icon: IconJackpots },
  { name: 'Providers', href: '/providers', icon: IconProviders },
]

const navigationItems = [
  { name: 'VIP Program', href: '/vip', icon: IconVIPProgram },
  { name: 'Promotions', href: '/promotions', icon: IconPromotions },
  { name: 'Tournaments', href: '/tournaments', icon: IconTournaments },
  { name: 'Affiliate Program', href: '/affiliate', icon: IconAffiliateProgram },
];

const settingsItems = [
  { name: 'Setting', href: '/settings', icon: IconSetting },
  { name: 'Live Support', href: '/support', icon: IconLiveSupport },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: 'mdi:twitter' },
  { name: 'Instagram', href: '#', icon: 'mdi:instagram' },
  { name: 'LinkedIn', href: '#', icon: 'mdi:linkedin' },
  { name: 'Email', href: 'mailto:support@casinade.com', icon: 'mdi:email' },
];

const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useNavbar();
  const [selectedTab, setSelectedTab] = useState('Casino');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed hidden md:block ">
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full rounded-xl bg-[#0C1423] z-50 transform transition-all duration-500 ease-out ${isOpen
          ? 'translate-x-0 min-w-64 max-w-64'
          : '-translate-x-full lg:translate-x-0 lg:min-w-20 lg:max-w-20'
          } lg:static lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-4 flex gap-3 items-center justify-between transition-all duration-300 ease-in-out ${isOpen ? 'flex-row' : 'flex-col'}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <Icon icon="material-symbols:menu-rounded" className='w-8 h-8 text-yellow-primary/50 transition-colors duration-200 hover:text-yellow-primary' />
            </button>


             {/* Tab Buttons - Working like navigation items */}
             <div className={`flex ${isOpen ? 'flex-row space-x-2' : 'flex-col gap-3'} justify-center items-center transition-all duration-300 ease-in-out`}>
               <button
                 onClick={() => setSelectedTab('casino')}
                 className={`flex items-center justify-center ${isOpen ? 'space-x-2 px-3 py-2 w-[75px] h-[38px]' : 'justify-center w-12 h-12'} rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedTab === 'casino'
                   ? 'custom-btn-bg-active text-blue-primary'
                   : 'custom-btn-bg text-lavendar-primary hover:bg-opacity-80'
                   }`}
                 title={!isOpen ? 'Casino' : ''}
                 style={{
                   animationDelay: '0ms',
                   animation: isOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                 }}
               >
                {!isOpen &&<Image
                   src={IconCasino}
                   alt="Casino"
                   width={isOpen ? 48 : 40}
                   height={isOpen ? 48 : 40}
                   className="transition-all duration-300 ease-in-out"
                 />}
                 {isOpen && (
                   <span className="font-medium transition-all duration-300 ease-in-out animate-fadeIn whitespace-nowrap">
                     Casino
                   </span>
                 )}
               </button>
               <button
                 onClick={() => setSelectedTab('sport')}
                 className={`flex items-center justify-center ${isOpen ? 'space-x-2 px-3 py-2 w-[75px] h-[38px]' : 'justify-center w-12 h-12'} rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedTab === 'sport'
                   ? 'custom-btn-bg-active text-blue-primary'
                   : 'custom-btn-bg text-lavendar-primary hover:bg-opacity-80'
                   }`}
                 title={!isOpen ? 'Sport' : ''}
                 style={{
                   animationDelay: '50ms',
                   animation: isOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                 }}
               >
                 {!isOpen &&<Image
                   src={IconSport}
                   alt="Sport"
                   width={isOpen ? 48 : 40}
                   height={isOpen ? 48 : 40}
                   className="transition-all duration-300 ease-in-out"
                 />}
                 {isOpen && (
                   <span className="font-medium transition-all duration-300 ease-in-out animate-fadeIn whitespace-nowrap">
                     Sport
                   </span>
                 )}
               </button>
             </div>
          </div>

          {/* Main Navigation */}
          <div className={`flex-1 px-4 transition-all duration-300 ease-in-out ${isOpen ? '' : 'pt-6 pb-6'}`}>

            {/* Casino Section */}
            {/* <div className="space-y-1">
              {casinoItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 rounded-lg ${isActive(item.href)
                    ? 'bg-[#E0FE08]/10 text-yellow-primary/50'
                    : 'text-yellow-primary/50 hover:bg-[#E0FE08]/5'
                    }`}
                >
                  <Image src={item.icon} alt={item.name} width={48} height={48} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div> */}

            {/* Divider */}
            {/* <div className="my-4 h-px bg-[#E0FE08]/20"></div> */}

            {/* Content/Features Section */}
            <div className={`flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${isOpen ? 'space-y-1' : 'gap-3'}`}>
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center ${isOpen ? 'space-x-3 px-3 w-full' : 'justify-center w-12 h-12'} rounded-lg transition-all duration-300 ease-in-out hover:scale-105 transform ${isActive(item.href)
                    ? 'bg-[#E0FE08]/10 text-yellow-primary/50'
                    : 'text-yellow-primary/50 hover:bg-[#E0FE08]/5'
                    }`}
                  title={!isOpen ? item.name : ''}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={isOpen ? 48 : 40}
                    height={isOpen ? 48 : 40}
                    className="transition-all duration-300 ease-in-out"
                  />
                  {isOpen && (
                    <span className="font-medium text-sm transition-all duration-300 ease-in-out animate-fadeIn whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-[#E0FE08]/20 transition-all duration-300 ease-in-out"></div>

            {/* Settings Section */}
            <div className="space-y-1">
              {settingsItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full h-12 flex items-center ${isOpen ? 'space-x-3 px-3' : 'justify-center px-2'} py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isActive(item.href)
                    ? 'bg-[#E0FE08]/10 text-yellow-primary/50'
                    : 'text-yellow-primary/50 hover:bg-[#E0FE08]/5'
                    }`}
                  title={!isOpen ? item.name : ''}
                  style={{
                    animationDelay: `${(navigationItems.length + index) * 50}ms`,
                    animation: isOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={isOpen ? 48 : 32}
                    height={isOpen ? 48 : 32}
                    className="transition-all duration-300 ease-in-out"
                  />
                  {isOpen && (
                    <span className="font-medium transition-all duration-300 ease-in-out animate-fadeIn whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}

              {/* Language Selector - Only show when expanded */}
              {isOpen && (
                <div
                  className="relative group animate-fadeIn"
                  style={{
                    animationDelay: `${(navigationItems.length + settingsItems.length) * 50}ms`,
                    animation: 'slideInFromLeft 0.3s ease-out forwards'
                  }}
                >
                  <button className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-yellow-primary/50 hover:bg-[#E0FE08]/5 transition-all duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex items-center space-x-3">
                      <Image
                        alt="language"
                        src={IconLanguage}
                        width={48}
                        height={48}
                        className="transition-transform duration-200"
                      />
                      <span className="font-medium transition-all duration-300 ease-in-out whitespace-nowrap">Language</span>
                    </div>
                    <Icon icon="mdi:chevron-down" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Language Dropdown */}
                  <div className="absolute left-0 right-0 mt-1 bg-[#0C1423] border border-[#E0FE08]/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 z-10">
                    {languages.map((lang, index) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 ease-in-out transform hover:scale-105 ${selectedLanguage === lang
                          ? 'bg-[#E0FE08]/10 text-yellow-primary/50'
                          : 'text-yellow-primary/50 hover:bg-[#E0FE08]/5'
                          }`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'fadeInUp 0.2s ease-out forwards'
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links - Only show when expanded */}
          {isOpen && (
            <div
              className="p-4 animate-fadeIn"
              style={{
                animationDelay: `${(navigationItems.length + settingsItems.length + 1) * 50}ms`,
                animation: 'slideInFromLeft 0.3s ease-out forwards'
              }}
            >
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-blue-primary rounded-full flex items-center justify-center text-yellow-primary/50 hover:bg-yellow-primary hover:text-blue-primary transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 active:scale-95"
                    aria-label={social.name}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'bounceIn 0.4s ease-out forwards'
                    }}
                  >
                    <Icon icon={social.icon} className="w-5 h-5 transition-transform duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;