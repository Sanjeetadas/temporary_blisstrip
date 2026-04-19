import {
  BedDouble,
  Briefcase,
  Bus,
  CarFront,
  Compass,
  CreditCard,
  Plane,
  Shield,
  ShipWheel,
  TrainFront,
  WalletCards,
} from 'lucide-react';

export const moduleOrder = [
  'flights',
  'hotels',
  'homestays',
  'trains',
  'buses',
  'cabs',
  'attractions',
  'visa',
  'cruise',
  'forex',
  'insurance',
];

const baseFaqs = [
  {
    q: 'Can I use this project without a backend?',
    a: 'Yes. Every module is built for frontend-only delivery. Search actions hit public APIs where possible and fall back to realistic mock adapters where public coverage is limited.',
  },
  {
    q: 'How do the search flows behave when an API key is missing?',
    a: 'The service layer automatically returns curated mock data and preserves the same loading, error, and result UI so you can keep developing without blocking on API access.',
  },
  {
    q: 'Is the layout responsive like a production travel website?',
    a: 'Yes. The floating search shell, offers grid, promotional cards, and result listings all adapt across mobile, tablet, and desktop breakpoints.',
  },
];

export const moduleConfigs = {
  flights: {
    slug: 'flights',
    title: 'Flights',
    eyebrow: 'Book domestic and international flights',
    accent: 'Fare deals, class selection, and production-style flight search.',
    icon: Plane,
    heroImage:
      'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80")',
    notice: 'One way, round trip, and multi-city style booking with live-ready API hooks.',
    promoTitle: 'Explore international routes and seasonal airfare deals',
    promoCopy: 'Use the dynamic offer rail below to populate promotional flight cards from API-driven content.',
    searchFields: [
      { name: 'tripType', label: 'Trip Type', type: 'select', options: ['oneway', 'roundtrip', 'multicity'] },
      { name: 'from', label: 'From', type: 'location', placeholder: 'Delhi' },
      { name: 'to', label: 'To', type: 'location', placeholder: 'Bengaluru' },
      { name: 'departDate', label: 'Departure', type: 'date' },
      { name: 'returnDate', label: 'Return', type: 'date' },
      { name: 'travellers', label: 'Travellers', type: 'number', min: 1, max: 9, placeholder: '1' },
      { name: 'cabinClass', label: 'Class', type: 'select', options: ['economy', 'premium economy', 'business', 'first'] },
    ],
    defaultValues: {
      tripType: 'oneway',
      from: 'Delhi',
      to: 'Bengaluru',
      departDate: '',
      returnDate: '',
      travellers: 1,
      cabinClass: 'economy',
    },
    discoverTitle: 'Popular air corridors',
    discoverType: 'flight',
    faqItems: [
      ...baseFaqs,
      {
        q: 'Which flight API is prepared in this project?',
        a: 'The project is wired for Aviationstack-compatible responses. If no key is provided, mock flight results are returned through the same adapter shape.',
      },
    ],
    seoSections: [
      {
        title: 'Why book flights on BLISSTRIP?',
        body: 'The UI mirrors a high-conversion travel booking flow with big route selectors, a strong blue CTA, promotional fare chips, and modular search results that are easy to extend.',
      },
      {
        title: 'What happens after search?',
        body: 'Users land on a dedicated results route with loader states, price cards, and filters so the navigation feels like a production OTA instead of a demo page.',
      },
    ],
  },
  hotels: {
    slug: 'hotels',
    title: 'Hotels',
    eyebrow: 'City stays, resorts, and budget properties',
    accent: 'A close BLISSTRIP adaptation of the MakeMyTrip hotel booking experience.',
    icon: BedDouble,
    heroImage:
      'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
    notice: 'Check-in, check-out, guests, and dynamic destination-based property search.',
    promoTitle: 'Enjoy premium stays, city hotels, and getaway properties',
    promoCopy: 'Hotel discovery cards and promotional offers are fetched dynamically, then displayed in a MakeMyTrip-style content stack.',
    searchFields: [
      { name: 'destination', label: 'City, Property Name Or Location', type: 'location', placeholder: 'Goa' },
      { name: 'checkIn', label: 'Check-In', type: 'date' },
      { name: 'checkOut', label: 'Check-Out', type: 'date' },
      { name: 'roomsAndGuests', label: 'Rooms & Guests', type: 'select', options: ['1 Room, 2 Adults', '1 Room, 1 Adult', '2 Rooms, 4 Adults'] },
      { name: 'priceBand', label: 'Price Per Night', type: 'select', options: ['₹0-₹1500, ₹1500-₹2500...', 'budget', 'value', 'premium'] },
    ],
    defaultValues: {
      destination: 'Goa',
      checkIn: '',
      checkOut: '',
      rooms: 1,
      guests: 2,
      priceBand: 'value',
    },
    discoverTitle: 'Trending hotel destinations',
    discoverType: 'hotel',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'How hotel discovery works here',
        body: 'When a Geoapify key is provided, BLISSTRIP fetches place data for hotels and accommodations around the searched destination and maps those results into branded property cards.',
      },
      {
        title: 'Why this is useful for frontend portfolios',
        body: 'The page shows deep layout nesting, realistic form UX, responsive grids, and an API abstraction layer that is ready for a backend handoff later.',
      },
    ],
  },
  homestays: {
    slug: 'homestays',
    title: 'Villas & Homestays',
    eyebrow: 'Private stays, scenic cottages, and villas',
    accent: 'Curated discovery for trip planners who prefer homes over hotels.',
    icon: Briefcase,
    heroImage:
      'url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80")',
    notice: 'This module uses the stays adapter with a homestay-first presentation and villa-friendly copy.',
    promoTitle: 'Private pool villas, mountain cabins, and weekend homes',
    promoCopy: 'If a dedicated villa API is unavailable, the UI still stays fully functional through the same mock-ready search contract.',
    searchFields: [
      { name: 'destination', label: 'City, Property Name Or Location', type: 'location', placeholder: 'Goa, India' },
      { name: 'checkIn', label: 'Check-In', type: 'date' },
      { name: 'checkOut', label: 'Check-Out', type: 'date' },
      { name: 'guests', label: 'Guests', type: 'select', options: ['Add Adults & Children', '2 Adults', '4 Adults'] },
      { name: 'priceBand', label: 'Price Per Night', type: 'select', options: ['₹0-₹1500, ₹1500-₹2500...', 'budget', 'value', 'premium'] },
    ],
    defaultValues: {
      destination: 'Goa',
      checkIn: '',
      checkOut: '',
      guests: 4,
      propertyType: 'villa',
      budget: 'premium',
    },
    discoverTitle: 'Top villa destinations',
    discoverType: 'villa',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Homestay API strategy',
        body: 'Homestays and villas typically require marketplace-specific APIs. This project documents where to plug one in, while still shipping a strong frontend through shared stay cards and mocked responses.',
      },
    ],
  },
  trains: {
    slug: 'trains',
    title: 'Trains',
    eyebrow: 'Intercity rail booking experience',
    accent: 'Styled after the MakeMyTrip rail flow with a frontend-only integration pattern.',
    icon: TrainFront,
    heroImage:
      'url("https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80")',
    notice: 'Indian rail APIs are rarely open and stable, so the UI supports real integration points with mock-first reliability.',
    promoTitle: 'Seat availability, class filters, and route discovery',
    promoCopy: 'When RapidAPI train access is available, this adapter can be replaced without touching the page layout.',
    searchFields: [
      { name: 'from', label: 'From', type: 'location', placeholder: 'New Delhi' },
      { name: 'to', label: 'To', type: 'location', placeholder: 'Kanpur' },
      { name: 'departDate', label: 'Travel Date', type: 'date' },
      { name: 'classType', label: 'Class', type: 'select', options: ['ALL', 'SL', '3A', '2A', '1A', 'CC'] },
    ],
    defaultValues: {
      from: 'New Delhi',
      to: 'Kanpur',
      departDate: '',
      classType: '3A',
      quota: 'general',
    },
    discoverTitle: 'Popular rail routes',
    discoverType: 'train',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Rail integration approach',
        body: 'The service layer exposes a train-search function that can hit a RapidAPI or IRCTC-compatible provider. The default mock keeps results realistic during development.',
      },
    ],
  },
  buses: {
    slug: 'buses',
    title: 'Buses',
    eyebrow: 'Sleeper, AC, and rapid intercity buses',
    accent: 'A BLISSTRIP recreation of a dense OTA bus search UI.',
    icon: Bus,
    heroImage:
      'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80")',
    notice: 'Search journeys, compare operators, and drive the results page through API or fallback data.',
    promoTitle: 'Comfortable road trips with filters that feel native',
    promoCopy: 'Operator chips, departure windows, and boarding-style cards map cleanly to a bus travel product.',
    searchFields: [
      { name: 'from', label: 'From', type: 'location', placeholder: 'Jalandhar' },
      { name: 'to', label: 'To', type: 'location', placeholder: 'Delhi' },
      { name: 'departDate', label: 'Travel Date', type: 'date' },
    ],
    defaultValues: {
      from: 'Jalandhar',
      to: 'Delhi',
      departDate: '',
      seats: 1,
      serviceType: 'AC',
    },
    discoverTitle: 'Popular bus corridors',
    discoverType: 'bus',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Bus APIs in frontend-only products',
        body: 'Open bus booking APIs are scarce, so this module ships with a structured mock contract and a clear replacement point for any operator or aggregator you onboard later.',
      },
    ],
  },
  cabs: {
    slug: 'cabs',
    title: 'Cabs',
    eyebrow: 'Airport drops and outstation rides',
    accent: 'A static but fully navigable transport page with production-style UI blocks.',
    icon: CarFront,
    heroImage:
      'url("https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80")',
    notice: 'This page is intentionally static-functional per your requirement and does not depend on external APIs.',
    promoTitle: 'Airport pickups, hourly rentals, and outstation rides',
    promoCopy: 'The cards, CTA states, and navigation are all live even though the page does not require search APIs.',
    searchFields: [
      { name: 'pickup', label: 'Pickup City', type: 'location', placeholder: 'Delhi' },
      { name: 'drop', label: 'Drop City', type: 'location', placeholder: 'Agra' },
      { name: 'pickupDate', label: 'Pickup Date', type: 'date' },
      { name: 'cabType', label: 'Cab Type', type: 'select', options: ['economy', 'sedan', 'SUV', 'premium'] },
    ],
    defaultValues: {
      pickup: 'Delhi',
      drop: 'Agra',
      pickupDate: '',
      cabType: 'sedan',
    },
    discoverTitle: 'Cab services spotlight',
    discoverType: 'cab',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Why this page is static-functional',
        body: 'You requested cabs to be navigation-ready without API dependence, so the page focuses on excellent UX, strong visuals, and reusable card sections.',
      },
    ],
  },
  attractions: {
    slug: 'attractions',
    title: 'Tours & Attractions',
    eyebrow: 'City experiences and sightseeing',
    accent: 'A visual landing page for activities, passes, and destination experiences.',
    icon: Compass,
    heroImage:
      'url("https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80")',
    notice: 'This module is static-functional by requirement but still uses dynamic promotional content in shared sections.',
    promoTitle: 'Landmarks, local guides, and curated experience passes',
    promoCopy: 'The route is fully live and can be upgraded later with OpenTripMap or a marketplace API with minimal refactoring.',
    searchFields: [
      { name: 'destination', label: 'Destination', type: 'location', placeholder: 'Jaipur' },
      { name: 'travelDate', label: 'Travel Date', type: 'date' },
      { name: 'travelers', label: 'Travellers', type: 'number', min: 1, max: 10, placeholder: '2' },
    ],
    defaultValues: {
      destination: 'Jaipur',
      travelDate: '',
      travelers: 2,
    },
    discoverTitle: 'Top attraction clusters',
    discoverType: 'attraction',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Prepared for future expansion',
        body: 'The module already includes destination cards, hero search controls, and long-form informational blocks so adding a real attractions API later is straightforward.',
      },
    ],
  },
  visa: {
    slug: 'visa',
    title: 'Visa',
    eyebrow: 'Visa assistance and processing',
    accent: 'A static-functional page inspired by the reference visa layout.',
    icon: WalletCards,
    heroImage:
      'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80")',
    notice: 'The route behaves like a real landing page without requiring a third-party visa API.',
    promoTitle: 'Most-visited countries, document guidance, and review cards',
    promoCopy: 'The page uses dynamic content cards with a static-functional search shell and FAQ accordion.',
    searchFields: [
      { name: 'destination', label: 'Destination', type: 'location', placeholder: 'Thailand' },
      { name: 'departureDate', label: 'Departure', type: 'date' },
      { name: 'returnDate', label: 'Return', type: 'date' },
      { name: 'travellers', label: 'Travellers', type: 'number', min: 1, max: 8, placeholder: '1' },
    ],
    defaultValues: {
      destination: 'Thailand',
      departureDate: '',
      returnDate: '',
      travellers: 1,
    },
    discoverTitle: 'Visa-ready destinations',
    discoverType: 'visa',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Static page with real product feel',
        body: 'Country tiles, document prompts, and FAQ disclosures create a genuine conversion page while keeping implementation frontend-only as requested.',
      },
    ],
  },
  cruise: {
    slug: 'cruise',
    title: 'Cruise',
    eyebrow: 'Sail away with curated cruise itineraries',
    accent: 'A visually rich, static-functional page with BLISSTRIP branding.',
    icon: ShipWheel,
    heroImage:
      'url("https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80")',
    notice: 'Inspired by the reference cruise landing page, minus any assistant widget.',
    promoTitle: 'Cruise destinations, featured lines, and FAQs',
    promoCopy: 'This route prioritizes premium imagery, destination cards, and a conversion-ready search shell.',
    searchFields: [
      { name: 'destination', label: 'CRUISE DESTINATION', type: 'location', placeholder: 'Select Destination' },
      { name: 'month', label: 'CRUISE MONTH (Optional)', type: 'select', options: ['Select Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
    ],
    defaultValues: {
      destination: '',
      month: 'Select Month',
    },
    discoverTitle: 'Most-booked cruise destinations',
    discoverType: 'cruise',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Cruise page behavior',
        body: 'This page keeps navigation, accordions, destination cards, and CTA interactions functional even without a dedicated cruise search API.',
      },
    ],
  },
  forex: {
    slug: 'forex',
    title: 'Forex Card & Currency',
    eyebrow: 'Multi-currency card and rate conversion',
    accent: 'This module uses a real exchange-rate API and retains the floating booking shell visual language.',
    icon: CreditCard,
    heroImage:
      'url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80")',
    notice: 'Search triggers a real conversion quote through the Frankfurter exchange-rate service.',
    promoTitle: 'Rate cards, benefits, and exchange conversion flows',
    promoCopy: 'The forex module is fully functional without a backend and includes real currency conversion support.',
    searchFields: [
      { name: 'deliverAt', label: 'Deliver At', type: 'location', placeholder: 'Delhi' },
      { name: 'baseCurrency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'AED', 'SGD', 'AUD'] },
      { name: 'buyType', label: 'Buy', type: 'select', options: ['card', 'cash'] },
      { name: 'forexAmount', label: 'Forex Amount', type: 'number', min: 1, max: 1000000, placeholder: '1000' },
    ],
    defaultValues: {
      deliverAt: 'Delhi',
      baseCurrency: 'USD',
      buyType: 'card',
      forexAmount: 1000,
    },
    discoverTitle: 'Top currency corridors',
    discoverType: 'forex',
    faqItems: [
      ...baseFaqs,
      {
        q: 'Does the forex quote use a live API?',
        a: 'Yes. The default implementation uses the Frankfurter exchange-rate API to convert from the selected base currency into INR in real time.',
      },
    ],
    seoSections: [
      {
        title: 'Forex card experience',
        body: 'The UI reproduces a travel-finance landing page with rate highlights, offering cards, a converter shell, and expandable FAQ blocks.',
      },
    ],
  },
  insurance: {
    slug: 'insurance',
    title: 'Travel Insurance',
    eyebrow: 'Trip protection and policy highlights',
    accent: 'A static-functional insurance page with a polished conversion flow.',
    icon: Shield,
    heroImage:
      'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80")',
    notice: 'The page is functional, navigable, and API-free as requested.',
    promoTitle: 'Medical cover, baggage support, and protection plans',
    promoCopy: 'The layout mirrors an enterprise travel insurance landing flow without relying on a backend.',
    searchFields: [
      { name: 'origin', label: 'Origin', type: 'location', placeholder: 'New Delhi' },
      { name: 'destination', label: 'Destination', type: 'location', placeholder: 'Goa' },
      { name: 'departureDate', label: 'Departure', type: 'date' },
      { name: 'returnDate', label: 'Return', type: 'date' },
      { name: 'travellers', label: 'Travellers', type: 'number', min: 1, max: 10, placeholder: '1' },
    ],
    defaultValues: {
      origin: 'New Delhi',
      destination: 'Goa',
      departureDate: '',
      returnDate: '',
      travellers: 1,
    },
    discoverTitle: 'Insurance benefit highlights',
    discoverType: 'insurance',
    faqItems: baseFaqs,
    seoSections: [
      {
        title: 'Insurance UX structure',
        body: 'The flow emphasizes reassurance: stat strips, plan cards, informational content, and FAQs, all in a familiar OTA-style visual hierarchy.',
      },
    ],
  },
};

export function getModuleConfig(slug) {
  return moduleConfigs[slug] || moduleConfigs.flights;
}
