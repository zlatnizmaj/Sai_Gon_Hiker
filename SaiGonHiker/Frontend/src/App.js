import { Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeSection from './components/HomeSection'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import BookTourForm from './components/BookTourForm'

function App() {
  window.onscroll = () => {
    searchBtn.classList.remove('fa-times')
    searchBar.classList.remove('active')
    menu.classList.remove('fa-times')
    navbar.classList.remove('active')
    loginForm.classList.remove('active')
  }

  return (
    <Router>
      <Header />
        <Route path="/" element={<HomeSection />} />
        <Route path="/login" element={<LoginForm />} />
      <Footer />
    </Router>
  )
}

export default App
