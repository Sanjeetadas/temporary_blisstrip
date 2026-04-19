import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import SuperNavbar from './SuperNavbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-mist flex flex-col">
      <SuperNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
