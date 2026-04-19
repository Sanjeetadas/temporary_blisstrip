import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const seoLinks = [
  {
    title: 'MAKEMYTRIP',
    links: 'About Us, Investor Relations, Careers, MMT Foundation, CSR Policy, myPartner - Travel Agent Portal, Foreign Exchange, List your hotel, Partners- Redbus, Partners- Goibibo, Advertise with Us'
  },
  {
    title: 'ABOUT THE SITE',
    links: 'Customer Support, Payment Security, Privacy Policy, User Agreement, Terms of Service, Franchise Offices, Make A Payment, Work From Home'
  },
  {
    title: 'QUICK LINKS',
    links: 'Flights Discount Coupons, Domestic Airlines, Indigo Airlines, Air Asia, SpiceJet, GoAir, Air India, Air Costa, Vistara, International Airlines, Emirates, Qatar Airways, Thai Airways, SriLankan Airlines, Etihad Airways, Singapore Airlines, Kuwait Airways, Saudi Arabian Airlines'
  },
  {
    title: 'IMPORTANT LINKS',
    links: 'Cheap Flights, Flight Status, Kumbh Mela, Domestic Airlines, International Airlines, Indigo, Spicejet, GoAir, Air Asia, Air India, Corporate Travel, Cleartrip, Flight booking, Hotels in India, Cheap Hotels, Bus Tickets'
  },
  {
    title: 'PRODUCT OFFERING',
    links: 'Flights, International Flights, Charter Flights, Hotels, International Hotels, Homestays and Villas, Activities, Holidays In India, International Holidays, Book Hotels From UAE, myBiz for Corporate Travel, Book Online Cabs, Book Bus Tickets, Book Train Tickets, Cheap Tickets to India, Book Flights From US, Book Flights From UAE, Trip Planner, Gift Cards, Trip Money, Trip Ideas, Travel Blog, PNR Status, MakeMyTrip Advertising Solutions, One Way Cab'
  }
];

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Massive Links Block */}
      <div className="bg-[#f2f2f2] border-t border-slate-200 text-[#4a4a4a] py-8">
        <div className="page-shell">
          <div className="flex flex-col gap-6">
            {seoLinks.map((section) => (
              <div key={section.title}>
                <h6 className="text-[10px] font-bold uppercase mb-2 text-[#4a4a4a]">{section.title}</h6>
                <p className="text-[11px] leading-relaxed text-[#4a4a4a] cursor-pointer">
                  {section.links.split(', ').map((link, idx, arr) => (
                    <span key={idx} className="hover:text-blue-500">
                      {link}{idx < arr.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Black Bottom Bar */}
      <div className="bg-black text-white py-6">
        <div className="page-shell flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:opacity-80 transition"><Twitter size={24} /></a>
            <a href="#" className="hover:opacity-80 transition"><Instagram size={24} /></a>
            <a href="#" className="hover:opacity-80 transition"><Linkedin size={24} /></a>
            <a href="#" className="hover:opacity-80 transition"><Facebook size={24} /></a>
          </div>
          <div className="text-sm font-semibold text-white/90">
            © 2026 MAKEMYTRIP PVT. LTD.
          </div>
        </div>
      </div>
    </footer>
  );
}
