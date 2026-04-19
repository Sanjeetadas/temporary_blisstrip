import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HotelResultsPage from './pages/HotelResultsPage';
import HotelsPage from './pages/HotelsPage';
import ModulePage from './pages/ModulePage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import StaticPage from './pages/StaticPage';
import { moduleOrder } from './utils/moduleConfigs';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/flights" replace />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/results" element={<HotelResultsPage />} />
        {moduleOrder.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<ModulePage />} />
        ))}
        <Route path="/about" element={<StaticPage title="About Us" content={<p>BLISSTRIP is a leading travel platform connecting you with the best experiences worldwide.</p>} />} />
        <Route path="/contact" element={<StaticPage title="Contact Us" content={<p>Email us at support@blisstrip.com or call our 24/7 helpline.</p>} />} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy" content={<p>Your privacy is important to us. We securely encrypt all your travel data.</p>} />} />
        <Route path="/terms" element={<StaticPage title="Terms & Conditions" content={<p>By using this website, you agree to our standard terms of booking and cancellation.</p>} />} />
        <Route path="/:moduleSlug/results" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
