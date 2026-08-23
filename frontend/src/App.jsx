import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import HowWork from './pages/HowWork'
import Contact from './pages/Contact'
import CitiesServed from './pages/CitiesServed'
import NotFound from './pages/NotFound'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/how-work" element={<HowWork />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cities-served" element={<CitiesServed />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
