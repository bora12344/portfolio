'use strict'


// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
// navbar menu 를 눌렀을 때 undefined 안나오게 하기
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return; 
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "Contact Me" button on home 
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show arrow-up button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight /2) {
        arrowUp.classList.add('visible');
    }  else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow-up" button 
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories'); // 긱긱의 버튼
const projectContainer = document.querySelector('.work__projects');  // 각각의 프로젝트
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove selection from the previous item and select new one 
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');  // 이미 선택된 아이를 remove 하고 
    const target = 
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode; //nodeName이 버튼일때는 target을, 버튼이 아니라면 parentNode로 할당
    target.classList.add('selected');


    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){
            project.classList.remove('invisible');
            }   else {
            project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}
