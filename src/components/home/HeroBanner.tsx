
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

// Images
import BannerImage1 from '@/assets/banner/banner.jpg';

const BannerItems = [
  {
    title: "GOLD SPIN CUP",
    subtitle: "Tournament",
    img: BannerImage1.src,
    cta: 'JOIN NOW'
  },
  {
    title: '$20.000 AND 100 FREE SPINS',
    subtitle: "SIGN UP AND GET REWARD UP TO",
    img: BannerImage1.src,
    cta: 'PLAY NOW'
  },
  {
    title: 'WELCOME BONUS 200%',
    subtitle: "Bonus",
    img: BannerImage1.src,
    cta: 'CLAIM NOW'
  }
]

const HeroBanner = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-[#0C1423] min-h-[250px] md:min-h-[320px] lg:min-h-[380px] xl:min-h-[420px] flex items-center">
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          navigation={{
            nextEl: '.banner-swiper-next',
            prevEl: '.banner-swiper-prev',
          }}
          className="w-full h-full"
        >
          {BannerItems.map((item, index) => (
            <SwiperSlide className='w-full!' key={index}>
              <div
                className="flex flex-col h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] justify-end px-4 md:px-8 pb-6 md:pb-8"
                style={{
                  backgroundImage: item.img ? `url(${item.img})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className="text-sm md:text-base lg:text-xl text-yellow-primary/60 mb-1 md:mb-2 tracking-widest uppercase leading-tight">{item.subtitle}</span>
                <h2 className="text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold text-yellow-primary mb-2 md:mb-3 lg:mb-4 leading-tight">{item.title}</h2>
              </div>
            </SwiperSlide>
          ))}
          {/* Navigation Buttons */}
          <button className="banner-swiper-prev absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm border-none p-1.5 md:p-2.5 rounded-full hover:bg-primary-lavendar/20 transition-colors" aria-label="Previous">
            <Icon icon="mdi:chevron-left" className="w-4 h-4 md:w-5 md:h-5 text-primary-lavendar" />
          </button>
          <button className="banner-swiper-next absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm border-none p-1.5 md:p-2.5 rounded-full hover:bg-primary-lavendar/20 transition-colors" aria-label="Next">
            <Icon icon="mdi:chevron-right" className="w-4 h-4 md:w-5 md:h-5 text-primary-lavendar" />
          </button>
        </Swiper>
      </div>
    );
}

export default HeroBanner;