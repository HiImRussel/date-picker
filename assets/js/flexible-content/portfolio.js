import Swiper, { Navigation } from "swiper";
import "swiper/css";

export const initPortfolioSlider = () => {
    const sliders = document.querySelectorAll(".js-portfolio-slider");

    sliders.forEach((slider) => {
        const swiper = new Swiper(slider, {
            modules: [Navigation],
            slidesPerView: 1.4,
            centeredSlides: true,
            spaceBetween: 81,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
};
