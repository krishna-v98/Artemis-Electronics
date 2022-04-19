const footer = () => {
    var footer = document.getElementById('footer');
    var footerHeight = footer.offsetHeight;
    var windowHeight = window.innerHeight;
    var footerTop = footer.offsetTop;
    var footerBottom = footerTop + footerHeight;
    var windowBottom = windowHeight + window.scrollY;
    if (footerBottom < windowBottom) {
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
    }
}

window.onload = footer;