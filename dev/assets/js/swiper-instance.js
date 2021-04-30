// import Swiper from 'swiper';
import Swiper from 'swiper/bundle';

const swiperheroden7 = () => {
    if (document.querySelector('.hero-slider')) {
        new Swiper('.hero-slider', {
            spaceBetween: 30,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}
export default swiperheroden7;