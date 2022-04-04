const header = document.querySelector('.page-header');
const menuButton = header.querySelector('.menu-button');
const nav = header.querySelector('.main-nav');
const buyButtons = document.querySelectorAll('.js-buy');
const buyPopup = document.querySelector('.buy');
const successPopup = document.querySelector('.success');
const locationLinks = document.querySelectorAll('.locations__link');
const forms = document.querySelectorAll('.js-form');

// Mobile menu

let isMenuOpen = false;

header.classList.remove('page-header--no-js');
menuButton.classList.remove('menu-button--no-js');
nav.classList.remove('main-nav--no-js');

const openMenu = () => {
  header.classList.add('page-header--nav-open');
  menuButton.classList.add('menu-button--nav-open');
  nav.classList.add('main-nav--nav-open');
  isMenuOpen = true;
}

const closeMenu = () => {
  header.classList.remove('page-header--nav-open');
  menuButton.classList.remove('menu-button--nav-open');
  nav.classList.remove('main-nav--nav-open');
  isMenuOpen = false;
}

menuButton.addEventListener('click', function () {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Swiper

const thumbs = new Swiper('.descriptions__menu' , {
  slidesPerView: "auto",
  freeMode: true,
  breakpoints: {
    1212: {
      allowTouchMove: false
    }
  }
});

const gallery = new Swiper('.descriptions__wrapper', {
  spaceBetween: 30,
  allowTouchMove: false,

  thumbs: {
    swiper: thumbs,
    slideThumbActiveClass: 'descriptions__tab--active'
  }
})

for (let link of locationLinks) {
  link.addEventListener('click', ({target}) => {
    gallery.slideTo(target.getAttribute('data-slide'));
  })
}

//Popup

let closeButton;

const handleBuyClick = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  openPopup(buyPopup);
}

const handleEscPress = (evt) => {
  evt.preventDefault();

  if (evt.keyCode == 27) {
    closePopup();
  }
}

const handleSubmitClick = (evt) => {
  evt.preventDefault();
  successPopup.classList.add('buy__success--open');
}

const closePopup = () => {
  buyPopup.classList.remove('open');
  successPopup.classList.remove('open');
  document.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', handleEscPress);
  closeButton.removeEventListener('click', closePopup);
}

const openPopup = (popup) => {
  closeButton = popup.querySelector('.js-button-close');
  popup.classList.add('open')
  closeButton.addEventListener('click', closePopup);
  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', handleEscPress);
  popup.addEventListener('click', (evt) => evt.stopPropagation());
}

for (let button of buyButtons) {
  button.addEventListener('click', handleBuyClick);
}

for (let form of forms) {
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    openPopup(successPopup);
  });
}
