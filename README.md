# BLISSTRIP

BLISSTRIP is a React + Tailwind frontend travel clone inspired by the MakeMyTrip references you shared. The brand has been changed to `BLISSTRIP`, the navbar includes an empty logo placeholder box, and no AI assistant/chat widget is present.

## Folder Structure

```text
Sanjeeta Codex/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── search/
│   │   └── sections/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   │   ├── api/
│   │   └── mock-data/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Setup Instructions

1. Open a terminal in this folder:

```bash
cd "C:\Users\Sanjeeta Das\OneDrive\Desktop\sanjeeta\semester 2\Sanjeeta Codex"
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and add API keys where needed.

4. Run the development server:

```bash
npm run dev
```

## What Is Implemented

- Responsive BLISSTRIP routes for:
  - Flights
  - Hotels
  - Villas & Homestays
  - Trains
  - Buses
  - Cabs
  - Tours & Attractions
  - Visa
  - Cruise
  - Forex Card & Currency
  - Travel Insurance
- Dynamic navbar tabs and page navigation
- Floating hero search card inspired by the provided UI
- Search submissions that navigate to results pages
- Loading states and API error handling
- Dynamic offer cards and destination cards
- Real API support for location suggestions, hotels, and forex
- Mock fallbacks where open/public APIs are limited

## API Integration Guide

### Flights

- API Name: Aviationstack
- Signup Link: https://aviationstack.com/
- Endpoint: `https://api.aviationstack.com/v1/flights`
- Parameters:
  - `access_key`
  - `dep_iata`
  - `arr_iata`
  - `flight_date`
- Code Location: `src/services/api/flightsApi.js`
- API Key Env: `VITE_AVIATIONSTACK_API_KEY`
- Fallback Used: `getMockFlights()`

### Hotels

- API Name: Geoapify Places API
- Signup Link: https://www.geoapify.com/
- Endpoints:
  - `https://api.geoapify.com/v1/geocode/autocomplete`
  - `https://api.geoapify.com/v2/places`
- Parameters:
  - `text`
  - `apiKey`
  - `categories=accommodation.hotel`
  - `filter=circle:lon,lat,radius`
- Code Location:
  - `src/services/api/locationApi.js`
  - `src/services/api/staysApi.js`
- API Key Env: `VITE_GEOAPIFY_API_KEY`
- Fallback Used: `getMockStays(query, 'hotel')`

### Villas / Homestays

- Suggested API: Geoapify Places API or a vacation-rental marketplace API
- Suggested Signup: https://www.geoapify.com/
- Prepared Endpoint: `https://api.geoapify.com/v2/places`
- Parameters:
  - `categories=accommodation.apartment,accommodation.guest_house`
- Code Location: `src/services/api/staysApi.js`
- API Key Env: `VITE_GEOAPIFY_API_KEY`
- Fallback Used: `getMockStays(query, 'villa')`

### Trains

- Suggested API: RapidAPI-hosted train provider
- Signup Link: https://rapidapi.com/
- Prepared Endpoint: `https://YOUR_TRAIN_HOST/searchTrain`
- Parameters:
  - `source`
  - `destination`
  - `date`
- Code Location: `src/services/api/transportApi.js`
- API Key Envs:
  - `VITE_RAPIDAPI_KEY`
  - `VITE_RAPIDAPI_HOST_TRAINS`
- Fallback Used: `getMockTrains(query)`

### Buses

- Suggested API: RapidAPI-hosted bus provider
- Signup Link: https://rapidapi.com/
- Prepared Endpoint: `https://YOUR_BUS_HOST/search`
- Parameters:
  - `from`
  - `to`
  - `date`
- Code Location: `src/services/api/transportApi.js`
- API Key Envs:
  - `VITE_RAPIDAPI_KEY`
  - `VITE_RAPIDAPI_HOST_BUSES`
- Fallback Used: `getMockBuses(query)`

### Forex Card / Currency Exchange

- API Name: Frankfurter
- Signup Link: https://www.frankfurter.app/
- Endpoint: `https://api.frankfurter.app/latest`
- Parameters:
  - `from`
  - `to`
  - `amount`
- Code Location: `src/services/api/forexApi.js`
- API Key Needed: No
- Fallback Used: `getMockForex(query)`

### Offers / Info Cards

- API Name: DummyJSON
- Signup Link: https://dummyjson.com/
- Endpoints:
  - `https://dummyjson.com/posts`
  - `https://dummyjson.com/products`
- Parameters:
  - `limit`
  - `skip`
- Code Location: `src/services/api/offersApi.js`
- Images:
  - Dynamic placeholder images from `https://picsum.photos/seed/...`

## Final Run Instructions

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.
