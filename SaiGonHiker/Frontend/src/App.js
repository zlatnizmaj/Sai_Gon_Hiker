// import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import BookTourForm from "./components/BookTourForm";

function App() {
  let searchBtn = document.querySelector('#search-btn');
  let searchBar = document.querySelector('.search-bar-container');
  let loginForm = document.querySelector('.login-form-container');
  let menu = document.querySelector('#menu-bar');
  let navbar = document.querySelector('.navbar');

  window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
  }

  return (
    <div className="app">
      <Header />
      <LoginForm />
      <HomeSection />
      <BookTourForm />
      <Footer />
    </div>

  );
}

export default App;
