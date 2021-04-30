import Swiper from 'swiper/bundle';

const swipertabs = () => {
    window.addEventListener('DOMContentLoaded', function() {
        var swiperContainer = document.querySelectorAll('.tab-pane');
        var swipers = document.getElementsByClassName('tab-slider');

        swiperContainer.forEach(function (instance, index) {            

            buildElementsSwipers(instance, index);

            setTimeout( function(){ 
                new Swiper(swipers[index], {
                    breakpointsInverse: true,
                    slidesPerView: 1,
                    spaceBetween: 40,

                    // Navigation arrows
                    navigation: {
                        nextEl: '.swipers-tab-btn-next'+index,
                        prevEl: '.swipers-tab-btn-prev'+index,
                    }
                });
            }, 500);
        }); 
        

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(".tab-slider").each(function (index, element) {
                var swiper = this.swiper;
                swiper.update();
            });
        });
    });


    const buildElementsSwipers = (instance, index) => {
        const btnContentSelector = `
            <div class="swiper-button-next swipers-tab-btn-next${index}"></div> 
            <div class="swiper-button-prev swipers-tab-btn-prev${index}"></div>`;
        const buttonParentContainer = document.querySelector(`${instance.tagName.toLowerCase()}#${instance.getAttribute('id')} div.col-arrows`);
        const buttonChildContainer = buttonParentContainer.firstElementChild;
        
        buttonChildContainer.innerHTML = btnContentSelector;
    }

}
export default swipertabs;