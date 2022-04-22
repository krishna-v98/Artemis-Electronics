var close1 = document.getElementById('close-1');
var flash = document.getElementById('flash');
var close2 = document.getElementById('close-2');

flash.style.opacity = 1;
flash.style.top = '0px';
flash.style.left = (window.innerWidth / 2) - (flash.offsetWidth / 2) + 'px';

setTimeout(() => {
    flash.style.opacity = '0';
    flash.style.top = '-200px';
}, 3000);

window.addEventListener('load', setTimeout);

close1.addEventListener('click', () => {
    flash.style.opacity = '0';
    flash.style.top = '-200px';
});

close2.addEventListener('click', () => {
    flash.style.opacity = '0';
    flash.style.top = '-200px';
});

