import axios from 'axios'
import * as cheerio from 'cheerio'
// Enhanced realistic project data for different cities
const projectDatabase = {
  hyderabad: [
    {
      id: 1,
      name: "Aparna Sarovar Zenith",
      location: "Nallagandla, Hyderabad",
      priceRange: "₹1.2 - 2.8 Cr",
      builder: "Aparna Constructions",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1200 - 2500 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 17.4399, lng: 78.3908 }
    },
    {
      id: 2,
      name: "Prestige Lakeside Habitat",
      location: "Gachibowli, Hyderabad",
      priceRange: "₹95 L - 1.8 Cr",
      builder: "Prestige Group",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      bhk: "1, 2, 3 BHK",
      area: "650 - 1800 sq ft",
      status: "Under Construction",
      coordinates: { lat: 17.4239, lng: 78.3428 }
    },
    {
      id: 3,
      name: "Godrej Reflections",
      location: "Kokapet, Hyderabad",
      priceRange: "₹1.5 - 3.2 Cr",
      builder: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1100 - 2800 sq ft",
      status: "New Launch",
      coordinates: { lat: 17.4065, lng: 78.3452 }
    },
    {
      id: 4,
      name: "Sobha Dream Acres",
      location: "Balagere, Hyderabad",
      priceRange: "₹85 L - 1.5 Cr",
      builder: "Sobha Limited",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      bhk: "1, 2, 3 BHK",
      area: "600 - 1600 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 17.3616, lng: 78.4747 }
    },
    {
      id: 5,
      name: "Brigade Citrine",
      location: "Budigere Cross, Hyderabad",
      priceRange: "₹1.1 - 2.4 Cr",
      builder: "Brigade Group",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1000 - 2200 sq ft",
      status: "Under Construction",
      coordinates: { lat: 17.4217, lng: 78.4518 }
    },
    {
      id: 6,
      name: "Salarpuria Sattva Laurel Heights",
      location: "Mallasandra, Hyderabad",
      priceRange: "₹2.1 - 4.5 Cr",
      builder: "Salarpuria Sattva",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      bhk: "3, 4, 5 BHK",
      area: "1800 - 4000 sq ft",
      status: "New Launch",
      coordinates: { lat: 17.3850, lng: 78.4867 }
    }
  ],
  bangalore: [
    {
      id: 7,
      name: "Brigade Cornerstone Utopia",
      location: "Varthur, Bangalore",
      priceRange: "₹1.2 - 2.8 Cr",
      builder: "Brigade Group",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1200 - 2500 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 12.9648, lng: 77.7540 }
    },
    {
      id: 8,
      name: "Godrej Woodscapes",
      location: "Budigere Cross, Bangalore",
      priceRange: "₹1.1 - 2.2 Cr",
      builder: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      bhk: "1, 2, 3 BHK",
      area: "800 - 1800 sq ft",
      status: "Under Construction",
      coordinates: { lat: 13.0827, lng: 77.7735 }
    },
    {
      id: 9,
      name: "Sobha Neopolis",
      location: "Panathur, Bangalore",
      priceRange: "₹1.3 - 2.8 Cr",
      builder: "Sobha Limited",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1100 - 2400 sq ft",
      status: "New Launch",
      coordinates: { lat: 12.9279, lng: 77.6946 }
    },
    {
      id: 10,
      name: "Purva Weaves",
      location: "Bellandur, Bangalore",
      priceRange: "₹1.5 - 3.2 Cr",
      builder: "Puravankara Limited",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1200 - 2800 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 12.9279, lng: 77.6946 }
    }
  ],
  mumbai: [
    {
      id: 11,
      name: "Lodha Amara",
      location: "Thane, Mumbai",
      priceRange: "₹1.8 - 4.2 Cr",
      builder: "Lodha Group",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1000 - 2200 sq ft",
      status: "Under Construction",
      coordinates: { lat: 19.2183, lng: 72.9781 }
    },
    {
      id: 12,
      name: "Godrej Emerald",
      location: "Thane, Mumbai",
      priceRange: "₹1.2 - 2.8 Cr",
      builder: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      bhk: "1, 2, 3 BHK",
      area: "650 - 1500 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 19.2969, lng: 72.9714 }
    },
    {
      id: 13,
      name: "Mahindra Lifespace Roots",
      location: "Kandivali, Mumbai",
      priceRange: "₹2.1 - 4.8 Cr",
      builder: "Mahindra Lifespace",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1200 - 2800 sq ft",
      status: "New Launch",
      coordinates: { lat: 19.2095, lng: 72.8526 }
    }
  ],
  delhi: [
    {
      id: 14,
      name: "DLF Privana",
      location: "Sector 76, Gurgaon",
      priceRange: "₹2.5 - 5.2 Cr",
      builder: "DLF Limited",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1400 - 3000 sq ft",
      status: "Under Construction",
      coordinates: { lat: 28.3852, lng: 77.0735 }
    },
    {
      id: 15,
      name: "Godrej Nurture",
      location: "Sector 33, Gurgaon",
      priceRange: "₹1.8 - 3.5 Cr",
      builder: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
      bhk: "2, 3 BHK",
      area: "1100 - 2000 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 28.4089, lng: 77.0507 }
    }
  ],
  pune: [
    {
      id: 16,
      name: "Godrej River Greens",
      location: "Warje, Pune",
      priceRange: "₹85 L - 1.8 Cr",
      builder: "Godrej Properties",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      bhk: "1, 2, 3 BHK",
      area: "650 - 1600 sq ft",
      status: "Under Construction",
      coordinates: { lat: 18.4804, lng: 73.8076 }
    },
    {
      id: 17,
      name: "Sobha Dream Gardens",
      location: "Thanisandra, Pune",
      priceRange: "₹1.2 - 2.4 Cr",
      builder: "Sobha Limited",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      bhk: "2, 3, 4 BHK",
      area: "1000 - 2200 sq ft",
      status: "Ready to Move",
      coordinates: { lat: 18.6186, lng: 73.7527 }
    }
  ]
}

const apiKey = 'd483d4a520bf0a261cf698b677493fed';
// Enhanced geocoding with multiple fallback options
async function getCoordinates(city) {
  // First try with Nominatim (OpenStreetMap)
  try {
    const response = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${city}, India`, {
      headers: {
        'User-Agent': 'RealEstateApp/1.0',
      },
      timeout: 5000
    })
    // console.log('Response', response.data);
    if (response.data && response.data.data.length > 0) {
      return {
        lat: parseFloat(response.data.data[0].latitude),
        lng: parseFloat(response.data.data[0].longitude)
      }
    }
  } catch (error) {
    console.warn('Nominatim geocoding failed:', error.message)
  }
}

// Advanced scraping function with multiple strategies
async function scrapeWithRetry(city) {
  const cityKey = city.toLowerCase()
  let projects = projectDatabase[cityKey] || []
  
  // If no predefined data, generate some realistic projects
  if (projects.length === 0) {
    const builders = ['Prestige Group', 'Godrej Properties', 'Sobha Limited', 'Brigade Group', 'Puravankara', 'Aparna Constructions']
    const areas = ['Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Kondapur', 'Madhapur', 'Kukatpally']
    
    projects = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      name: `${builders[i % builders.length]} ${['Heights', 'Towers', 'Residency', 'Gardens', 'Plaza', 'Homes'][i % 6]}`,
      location: `${areas[i % areas.length]}, ${city}`,
      priceRange: `₹${(Math.random() * 2 + 0.8).toFixed(1)} - ${(Math.random() * 3 + 2).toFixed(1)} Cr`,
      builder: builders[i % builders.length],
      image: `https://images.unsplash.com/photo-${1545324418000 + i}?w=400&h=300&fit=crop`,
      bhk: `${Math.floor(Math.random() * 3) + 1}, ${Math.floor(Math.random() * 3) + 2}, ${Math.floor(Math.random() * 3) + 3} BHK`,
      area: `${Math.floor(Math.random() * 1000) + 800} - ${Math.floor(Math.random() * 1500) + 1800} sq ft`,
      status: ['Ready to Move', 'Under Construction', 'New Launch'][i % 3],
      coordinates: getCoordinates(areas[i % areas.length], city)
    }))
  }

  return projects
}

export async function GET(req,res) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  // Set headers for streaming
  // res.setHeader('Content-Type', 'text/plain')
  // res.setHeader('Cache-Control', 'no-cache')
  // res.setHeader('Connection', 'keep-alive')
  // res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    console.log(`Starting scrape for city: ${city}`)
    const url = `https://www.magicbricks.com/new-projects-${city}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let coordinates = {lat:28.199,lang:17.833};
    // try {
    //   coordinates =  await getCoordinates(city);
    // } catch (error) {
    //   console.error("error on getting coordinated")
    // }
    const projects = [];
    $('.projdis__prjcard .projdis__prjcard__leftcont').each((index, element) => {
      const name = $(element).find('.mghome__prjblk__prjname').text().trim();
      const location = $(element).find('.mghome__prjblk__locname').text().trim();
      const priceRange = $(element).find('.mghome__prjblk__price').text().trim();
      const builder = $(element).find('.mghome__prjblk__prjname').text().trim();
      const bhk = $(element).find('.mghome__prjblk__bhk').text().trim();
      const image = $(element).find('.mghome__prjblk__imgsec img').attr('src');
      const status = $(element).find('.mghome__prjblk__status').text().trim();
      // console.log('Project', name, location, priceRange, builder, bhk, image, status);
     
      // const coordinates = { lat: 20.5937, lng: 78.9629 }
      projects.push({
        id: Date.now() + index,
        name,
        location,
        priceRange,
        builder,
        bhk,
        image,
        status,
        coordinates
      });
    });
    const totalProjects = projects.length;
    return new Response(JSON.stringify({
      type: 'total',
      total: totalProjects,
      projects: projects
    }) + '\n')

    // return new Response(JSON.stringify({
    //   type: 'total',
    //   total: totalProjects,
    //   projects: projects
    // }) + '\n')

    // res.end()
  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(JSON.stringify({
      type: 'error',
      message: error.message || 'Failed to scrape projects',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}