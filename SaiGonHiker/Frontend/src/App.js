// import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Swiper from 'swiper';

function App() {
  let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

  window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}
new Swiper(".review-slider", {
  spaceBetween:20,
  loop:true,
  autoplay: {
      delay:2500,
      disableOnInteraction: false,
  },
  breakpoints:{
      640: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      },
  },
});

new Swiper(".brand-slider",{
  spaceBetween: 50,
  loop: true,
  autoplay:{
      delay: 4000,
      disableOnInteraction: false,
  },
  breakpoints: {
      450:{
          slidesPerView: 2,
      },
      768:{
          slidesPerView: 3,
      },
      991:{
          slidesPerView: 4,
      },
      1200:{
          slidesPerView: 5,
      },
  },
});
// searchBtn.addEventListener('click', () => {
//   searchBtn.classList.toggle('fa-times');
//   searchBar.classList.toggle('active');
// });
// useEffect(()=>{
// formBtn.addEventListener('click', () => {
//   loginForm.classList.add('active');
// });

// formClose.addEventListener('click', () => {
//   loginForm.classList.remove('active');
// });
// }, [])


// videoBtn.forEach(btn => {
//   btn.addEventListener('click', () => {
//       document.querySelector('.controls .active').classList.remove('active');
//       btn.classList.add('active');
//       let src = btn.getAttribute('data-src');
//       document.querySelector('#video-slider').src = src;

//   });
// });


  return (
    <div className="app">
      <Header/>
      <LoginForm/>
      <HomeSection/>
      <Footer />
      
    </div>

  );
}

export default App;
