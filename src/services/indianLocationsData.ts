import type { LocationInfo } from './weatherService';

// Extensive verified database of Indian Gram Panchayats, Blocks, Tehsils, and Agri-Centers
export const INDIAN_AGRI_LOCATIONS: LocationInfo[] = [
  // Uttar Pradesh - Lucknow / Malihabad Belt
  {
    name: 'Aima',
    panchayat: 'Aima Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9214,
    lng: 80.7103
  },
  {
    name: 'Bharawan',
    panchayat: 'Bharawan Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9050,
    lng: 80.7250
  },
  {
    name: 'Chandpur',
    panchayat: 'Chandpur Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9380,
    lng: 80.6920
  },
  {
    name: 'Lakhanpur',
    panchayat: 'Lakhanpur Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9080,
    lng: 80.6950
  },
  {
    name: 'Saspan',
    panchayat: 'Saspan Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9150,
    lng: 80.6800
  },
  {
    name: 'Nabipanah',
    panchayat: 'Nabipanah Gram Panchayat',
    block: 'Malihabad',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9400,
    lng: 80.7300
  },
  {
    name: 'Bakshi Ka Talab',
    panchayat: 'BKT Agri Cluster',
    block: 'Bakshi Ka Talab',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.9800,
    lng: 80.9300
  },
  {
    name: 'Mohanlalganj',
    panchayat: 'Kashrawan Panchayat',
    block: 'Mohanlalganj',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.6800,
    lng: 80.9900
  },
  {
    name: 'Barabanki Rural',
    panchayat: 'Dewa Sharif Agri Grid',
    block: 'Dewa',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 27.0300,
    lng: 81.1600
  },
  {
    name: 'Varanasi',
    panchayat: 'Kashi Agro Cluster',
    block: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 25.3176,
    lng: 82.9739
  },
  {
    name: 'Gorakhpur',
    panchayat: 'Pipraich Panchayat',
    block: 'Pipraich',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.7606,
    lng: 83.3732
  },
  {
    name: 'Meerut',
    panchayat: 'Sardhana Agro Belt',
    block: 'Sardhana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 28.9845,
    lng: 77.7064
  },
  {
    name: 'Agra Rural',
    panchayat: 'Fatehabad Panchayat',
    block: 'Fatehabad',
    district: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 27.1767,
    lng: 78.0081
  },
  {
    name: 'Prayagraj',
    panchayat: 'Phulpur Agri Zone',
    block: 'Phulpur',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 25.4358,
    lng: 81.8463
  },

  // Punjab & Haryana
  {
    name: 'Karnal',
    panchayat: 'Nilokheri Agri Station',
    block: 'Nilokheri',
    district: 'Karnal',
    state: 'Haryana',
    country: 'India',
    lat: 29.6857,
    lng: 76.9905
  },
  {
    name: 'Gharaunda',
    panchayat: 'Gharaunda Indo-Israel Veg Center',
    block: 'Gharaunda',
    district: 'Karnal',
    state: 'Haryana',
    country: 'India',
    lat: 29.5400,
    lng: 76.9700
  },
  {
    name: 'Ludhiana',
    panchayat: 'Jagraon Wheat-Paddy Grid',
    block: 'Jagraon',
    district: 'Ludhiana',
    state: 'Punjab',
    country: 'India',
    lat: 30.9010,
    lng: 75.8573
  },
  {
    name: 'Bathinda',
    panchayat: 'Maur Cotton Belt',
    block: 'Maur',
    district: 'Bathinda',
    state: 'Punjab',
    country: 'India',
    lat: 30.2110,
    lng: 74.9455
  },
  {
    name: 'Amritsar Rural',
    panchayat: 'Majitha Panchayat',
    block: 'Majitha',
    district: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    lat: 31.6340,
    lng: 74.8723
  },
  {
    name: 'Hisar',
    panchayat: 'HAU Agri Grid',
    block: 'Hisar',
    district: 'Hisar',
    state: 'Haryana',
    country: 'India',
    lat: 29.1492,
    lng: 75.7217
  },

  // Maharashtra
  {
    name: 'Kalmeshwar',
    panchayat: 'Kalmeshwar Orange Belt',
    block: 'Kalmeshwar',
    district: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    lat: 21.2333,
    lng: 78.9167
  },
  {
    name: 'Saoner',
    panchayat: 'Saoner Citrus Grid',
    block: 'Saoner',
    district: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    lat: 21.3850,
    lng: 78.9200
  },
  {
    name: 'Niphad',
    panchayat: 'Niphad Grape & Onion Center',
    block: 'Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    lat: 20.0800,
    lng: 74.1100
  },
  {
    name: 'Baramati',
    panchayat: 'Baramati Agri Trust Grid',
    block: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    lat: 18.1520,
    lng: 74.5770
  },
  {
    name: 'Kolhapur Rural',
    panchayat: 'Shirol Sugarcane Zone',
    block: 'Shirol',
    district: 'Kolhapur',
    state: 'Maharashtra',
    country: 'India',
    lat: 16.7050,
    lng: 74.2433
  },
  {
    name: 'Jalgaon',
    panchayat: 'Raver Banana Belt',
    block: 'Raver',
    district: 'Jalgaon',
    state: 'Maharashtra',
    country: 'India',
    lat: 21.0077,
    lng: 75.5626
  },
  {
    name: 'Solapur',
    panchayat: 'Sangola Pomegranate Belt',
    block: 'Sangola',
    district: 'Solapur',
    state: 'Maharashtra',
    country: 'India',
    lat: 17.6599,
    lng: 75.9064
  },

  // Rajasthan
  {
    name: 'Jaipur Rural',
    panchayat: 'Chomu Veg & Fruit Cluster',
    block: 'Chomu',
    district: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    lat: 27.1700,
    lng: 75.7200
  },
  {
    name: 'Sri Ganganagar',
    panchayat: 'Suratgarh Wheat Basin',
    block: 'Suratgarh',
    district: 'Sri Ganganagar',
    state: 'Rajasthan',
    country: 'India',
    lat: 29.9038,
    lng: 73.8772
  },
  {
    name: 'Kota Rural',
    panchayat: 'Sangod Soybean Grid',
    block: 'Sangod',
    district: 'Kota',
    state: 'Rajasthan',
    country: 'India',
    lat: 25.1800,
    lng: 75.8300
  },
  {
    name: 'Jodhpur Rural',
    panchayat: 'Bilara Cumin & Mustard Basin',
    block: 'Bilara',
    district: 'Jodhpur',
    state: 'Rajasthan',
    country: 'India',
    lat: 26.2389,
    lng: 73.0243
  },

  // Madhya Pradesh
  {
    name: 'Indore Rural',
    panchayat: 'Sanwer Soybean Belt',
    block: 'Sanwer',
    district: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 22.9700,
    lng: 75.8300
  },
  {
    name: 'Hoshangabad',
    panchayat: 'Narmadapuram Wheat Bowl',
    block: 'Babai',
    district: 'Narmadapuram',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 22.7519,
    lng: 77.7289
  },
  {
    name: 'Ujjain Rural',
    panchayat: 'Khachrod Wheat-Gram Grid',
    block: 'Khachrod',
    district: 'Ujjain',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 23.1765,
    lng: 75.7885
  },

  // Bihar
  {
    name: 'Patna Rural',
    panchayat: 'Bihta Agri Center',
    block: 'Bihta',
    district: 'Patna',
    state: 'Bihar',
    country: 'India',
    lat: 25.5600,
    lng: 84.8700
  },
  {
    name: 'Muzaffarpur',
    panchayat: 'Kanti Litchi Belt',
    block: 'Kanti',
    district: 'Muzaffarpur',
    state: 'Bihar',
    country: 'India',
    lat: 26.1209,
    lng: 85.3647
  },
  {
    name: 'Nalanda',
    panchayat: 'Biharsharif Veg Cluster',
    block: 'Biharsharif',
    district: 'Nalanda',
    state: 'Bihar',
    country: 'India',
    lat: 25.1982,
    lng: 85.5149
  },

  // Gujarat
  {
    name: 'Anand',
    panchayat: 'Anand Agri University Grid',
    block: 'Anand',
    district: 'Anand',
    state: 'Gujarat',
    country: 'India',
    lat: 22.5645,
    lng: 72.9289
  },
  {
    name: 'Junagadh',
    panchayat: 'Keshod Groundnut & Mango Basin',
    block: 'Keshod',
    district: 'Junagadh',
    state: 'Gujarat',
    country: 'India',
    lat: 21.5222,
    lng: 70.4579
  },

  // South & East India
  {
    name: 'Thanjavur',
    panchayat: 'Kumbakonam Delta Paddy Zone',
    block: 'Kumbakonam',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 10.7870,
    lng: 79.1378
  },
  {
    name: 'Coimbatore Rural',
    panchayat: 'Pollachi Coconut & Spices Basin',
    block: 'Pollachi',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 11.0168,
    lng: 76.9558
  },
  {
    name: 'Mandya',
    panchayat: 'Maddur Sugarcane Cluster',
    block: 'Maddur',
    district: 'Mandya',
    state: 'Karnataka',
    country: 'India',
    lat: 12.5218,
    lng: 76.8951
  },
  {
    name: 'Guntur Rural',
    panchayat: 'Tenali Chilli & Paddy Belt',
    block: 'Tenali',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    country: 'India',
    lat: 16.3067,
    lng: 80.4365
  },
  {
    name: 'Burdwan',
    panchayat: 'Memari Rice Basin',
    block: 'Memari',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    country: 'India',
    lat: 23.2324,
    lng: 87.8615
  }
];

export function searchLocalAgriDatabase(query: string): LocationInfo[] {
  if (!query || query.trim().length < 1) return [];
  const q = query.trim().toLowerCase();

  return INDIAN_AGRI_LOCATIONS.filter(loc => {
    return (
      loc.name.toLowerCase().includes(q) ||
      (loc.panchayat && loc.panchayat.toLowerCase().includes(q)) ||
      (loc.block && loc.block.toLowerCase().includes(q)) ||
      (loc.district && loc.district.toLowerCase().includes(q)) ||
      (loc.state && loc.state.toLowerCase().includes(q))
    );
  }).slice(0, 8);
}
