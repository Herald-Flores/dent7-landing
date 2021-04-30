// Import jQuery
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// Import libraries
var bootstrap = require('bootstrap');
import Swiper from 'swiper';


import swiperHero from './swiper-instance';
import swipertabs from './tabslider';
import swipeexclusivo from './_swiper-exclusivo';

//swiper
swiperHero();

swipertabs();

swipeexclusivo();