import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('blisstrip_bookings')) || [];
    } catch {
      return [];
    }
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('blisstrip_searches')) || [];
    } catch {
      return [];
    }
  });

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('blisstrip_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('blisstrip_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addBooking = (item) => {
    setBookings((prev) => [...prev, { ...item, bookingId: Date.now() }]);
  };

  const addSearch = (searchData) => {
    setRecentSearches((prev) => {
      const updated = [searchData, ...prev.filter(s => s.id !== searchData.id)].slice(0, 5);
      return updated;
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        bookings,
        addBooking,
        recentSearches,
        addSearch,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
