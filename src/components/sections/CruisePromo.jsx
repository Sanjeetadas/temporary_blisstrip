export default function CruisePromo() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[16px] overflow-hidden text-white mt-12 flex flex-col md:flex-row relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      
      <div className="p-8 md:p-12 relative z-10 w-full md:w-1/3 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold mb-2">Cruise</h2>
        <p className="text-lg text-blue-100 font-medium italic">From search to sail, guided by experts</p>
      </div>

      <div className="p-8 relative z-10 w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Search destinations & best itineraries", img: "https://images.unsplash.com/photo-1582293041079-7814c2b1cb05?auto=format&fit=crop&w=160&q=80" },
          { title: "Pricing without existing room fares", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=160&q=80" },
          { title: "100% price performance", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=160&q=80" },
          { title: "Expert travel tips to get you started", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=160&q=80" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col items-center text-center p-0">
            <div className="w-full h-24 overflow-hidden bg-slate-100">
              <img src={item.img} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-bold text-ink p-3 leading-tight">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
