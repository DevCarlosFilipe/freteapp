import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import HowWork from './pages/HowWork'
import Testes from './pages/Testes'
import TestesBE from './pages/TestesBE'
import Contact from './pages/Contact'
import CitiesServed from './pages/CitiesServed'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import NotFound from './pages/NotFound'
import ClientLayout from './components/layout/dashboard/ClientLayout'

// Dashboard Pages
import DashboardHome from './pages/Dashboard/Home'
import Orders from './pages/Dashboard/Orders'
import NewOrder from './pages/Dashboard/NewOrder'
import Addresses from './pages/Dashboard/Addresses'
import Profile from './pages/Dashboard/Profile'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/how-work" element={<HowWork />} />
                <Route path="/testes" element={<Testes />} />
                <Route path="/testes-be" element={<TestesBE />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cities-served" element={<CitiesServed />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="*" element={<NotFound />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<ClientLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="new-order" element={<NewOrder />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
