// import Swiper from 'swiper';
import Swiper from 'swiper/bundle';

const swiperexclusivos = () => {
    if (document.querySelector('.swiper-exclusivo')) {
        new Swiper('.swiper-exclusivo', {
            spaceBetween: 30,
            slidesPerView: 'auto',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 700,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-exclusivos-next',
                prevEl: '.swiper-button-exclusivos-prev',
            },
        });
    }
}
export default swiperexclusivos;