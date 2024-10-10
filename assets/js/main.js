document.addEventListener('DOMContentLoaded', function () {
    //navbar
    const navPreview = document.getElementById("nav_preview");
    const my_navbar = document.querySelector(".my_navbar");


    navPreview.addEventListener("click", function () {
        // Toggle the visibility of nav_preview
        navPreview.classList.toggle("show");
        my_navbar.classList.toggle("show");
    });

    //Headline move with mouse
    const headline = document.getElementById('headline');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
      document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    });    
    function animateHeadline() {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;
      headline.style.transform = `translate(${targetX}px, ${targetY}px)`;
      requestAnimationFrame(animateHeadline);
    }
    animateHeadline();

    // rotate on sight
    const fosil = document.getElementById('fosil');
    const dirt0 = document.getElementById('dirt0');
    const dirt1 = document.getElementById('dirt1');

    const isNearMiddle = (element,offset) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementMiddle = rect.top + rect.height / 2;

        return (elementMiddle > windowHeight / 2 - offset) && 
                (elementMiddle < windowHeight / 2 + offset);
    };
    const checkPosition = () => {
    if (isNearMiddle(fosil,250)) {
        fosil.classList.add('rotate');
    } else {
        fosil.classList.remove('rotate');
    }
    if (isNearMiddle(dirt0,350)) {
        dirt0.classList.add('rotate');
    } else {
        dirt0.classList.remove('rotate');
    }
    if (isNearMiddle(dirt1,300)) {
        dirt1.classList.add('rotate');
    } else {
        dirt1.classList.remove('rotate');
    }
    };
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('load', checkPosition);

    // Sunset
    const sunset = document.getElementById('sunset');
    const night = document.getElementById('night');
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');

    const cloud3 = document.getElementById('cloud3');
    const cloud4 = document.getElementById('cloud4');
    const cloud5 = document.getElementById('cloud5');

    const nightStartOffset = 400;

    const updateNightOpacity = () => {
    const sunsetRect = sunset.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sunsetVisibleHeight = sunsetRect.height;
    const distanceScrolledPastOffset = windowHeight - sunsetRect.top - nightStartOffset;

    if (distanceScrolledPastOffset >= 0 && sunsetRect.bottom > 0) {
        let scrollProgress = distanceScrolledPastOffset / (sunsetVisibleHeight - nightStartOffset);
        scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);
        night.style.opacity = scrollProgress;
        const marginTop = scrollProgress * -400;
        sun.style.marginTop = `${marginTop}px`;
        moon.style.marginTop = `${(marginTop+400)*-1}px`;
        const cloudOpacity = 1 - (scrollProgress * 0.6);
        cloud3.style.opacity = cloudOpacity.toString();
        cloud4.style.opacity = cloudOpacity.toString();
        cloud5.style.opacity = cloudOpacity.toString();
    }
    if (sunsetRect.bottom <= 0) {
        night.style.opacity = 1;
        sun.style.marginTop = `-400px`;
        moon.style.marginTop = `0px`;
        cloud3.style.opacity = '0.4';
        cloud4.style.opacity = '0.4';
        cloud5.style.opacity = '0.4';
    }
    if (sunsetRect.top > windowHeight) {
        night.style.opacity = 0;
        sun.style.marginTop = `0px`;
        moon.style.marginTop = `-400px`;
        cloud3.style.opacity = '1';
        cloud4.style.opacity = '1';
        cloud5.style.opacity = '1';
    }
    };
    window.addEventListener('scroll', updateNightOpacity);
    window.addEventListener('load', updateNightOpacity);

    //Butterfly cursor
    const butterfly = document.getElementById('butterflyCursor');
    let butterflyX = 0, butterflyY = 0;
    let mouseXfly = 0, mouseYfly = 0;
    let prevMouseX = 0;
    let direction = 'right';
    const threshold = 5;
    
    document.addEventListener('mousemove', (e) => {
        mouseXfly = e.clientX;
        mouseYfly = e.clientY;
    });
    
    function animateButterfly() {
        butterflyX += (mouseXfly - butterflyX) * 0.1;
        butterflyY += (mouseYfly - butterflyY) * 0.1;

        const deltaX = mouseXfly - prevMouseX;
    
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && direction !== 'right') {
                direction = 'right';
                butterfly.style.transform = `translate(${butterflyX - 55}px, ${butterflyY - 55}px) scaleX(-1)`;
            } else if (deltaX < 0 && direction !== 'left') {
                direction = 'left';
                butterfly.style.transform = `translate(${butterflyX + 55}px, ${butterflyY - 55}px) scaleX(1)`;
            }
        } else {
            butterfly.style.transform = `translate(${butterflyX + (direction === 'right' ? -55 : 55)}px, ${butterflyY - 55}px) scaleX(${direction === 'right' ? -1 : 1})`;
        }
        prevMouseX = mouseXfly;    
        requestAnimationFrame(animateButterfly);
    }
    
    animateButterfly();
    


});