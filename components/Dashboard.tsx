// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -33.866, lng: 151.196 },
//       zoom: 15,
//     });
//     const request = {
//       placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
//       fields: ["name", "formatted_address", "place_id", "geometry"],
//     };
//     const infowindow = new google.maps.InfoWindow();
//     const service = new google.maps.places.PlacesService(map);
  
//     service.getDetails(request, (place, status) => {
//       if (
//         status === google.maps.places.PlacesServiceStatus.OK &&
//         place &&
//         place.geometry &&
//         place.geometry.location
//       ) {
//         const marker = new google.maps.Marker({
//           map,
//           position: place.geometry.location,
//         });
  
//         google.maps.event.addListener(marker, "click", () => {
//           const content = document.createElement("div");
//           const nameElement = document.createElement("h2");
  
//           nameElement.textContent = place.name;
//           content.appendChild(nameElement);
  
//           const placeIdElement = document.createElement("p");
  
//           placeIdElement.textContent = place.place_id;
//           content.appendChild(placeIdElement);
  
//           const placeAddressElement = document.createElement("p");
  
//           placeAddressElement.textContent = place.formatted_address;
//           content.appendChild(placeAddressElement);
//           infowindow.setContent(content);
//           infowindow.open(map, marker);
//         });
//       }
//     });
//   }
  
//   window.initMap = initMap;

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ProfileCard from './ProfileCard';

export const profiles = [
    { id: 1, name: 'John Doe', title: 'Designer', amount: 1000.22, joinDate: 'December 2021', status: 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80', age: 30 },
    { id: 2, name: 'Jane Smith', title: 'Developer', amount: 1200.45, joinDate: 'January 2022', status: 'In Progress', progress: 78.6, avatarUrl: '/placeholder.svg?height=80&width=80', age: 28 },
    { id: 3, name: 'Michael Brown', title: 'Project Manager', amount: 1300.50, joinDate: 'February 2022', status: 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80', age: 35 },
    { id: 4, name: 'Sarah Johnson', title: 'Tester', amount: 1400.80, joinDate: 'March 2022', status: 'In Progress', progress: 52.3, avatarUrl: '/placeholder.svg?height=80&width=80', age: 26 },
    { id: 5, name: 'Chris Lee', title: 'Designer', amount: 1100.10, joinDate: 'April 2022', status: 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80', age: 32 },
    { id: 6, name: 'Emma Davis', title: 'Developer', amount: 1050.75, joinDate: 'May 2022', status: 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80', age: 29 },
    { id: 7, name: 'James Wilson', title: 'Tester', amount: 1150.30, joinDate: 'June 2022', status: 'In Progress', progress: 67.8, avatarUrl: '/placeholder.svg?height=80&width=80', age: 31 },
    { id: 8, name: 'Sophia Martinez', title: 'Project Manager', amount: 1250.90, joinDate: 'July 2022', status: 'Completed', progress: null, avatarUrl: '/placeholder.svg?height=80&width=80', age: 34 },
];

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [filterOpen, setFilterOpen] = useState(false); // To toggle filter dropdown visibility

    // Function to handle profile search and filter
    const filteredProfiles = profiles.filter((profile) => {
        const matchesSearch =
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || profile.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col h-screen">
        {/* Header, Search, and Filter */}
        <h2 className="text-4xl font-bold text-[#9687EC] mb-6">Profiles</h2>
        <div className="flex justify-between mb-6 relative">
            <div className="relative flex-1 mr-4">
            <input
                type="text"
                placeholder="Search by name, category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#BDB3F2]-100 focus:outline-none focus:ring-2 focus:ring-[#9687EC]"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
            <button
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md"
                onClick={() => setFilterOpen(!filterOpen)}
            >
                <span>Filter: {filter === 'All' ? 'None' : filter}</span>
                <ChevronDown size={20} />
            </button>

            {filterOpen && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md z-10">
                <ul className="flex flex-col">
                    <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        setFilter('All');
                        setFilterOpen(false); // Close dropdown after selection
                    }}
                    >
                    All
                    </li>
                    <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        setFilter('Completed');
                        setFilterOpen(false); // Close dropdown after selection
                    }}
                    >
                    Completed
                    </li>
                    <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        setFilter('In Progress');
                        setFilterOpen(false); // Close dropdown after selection
                    }}
                    >
                    In Progress
                    </li>
                </ul>
                </div>
            )}
            </div>
        </div>

        {/* Scrollable Profile Cards */}
        <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile, index) => (
                <ProfileCard key={index} {...profile} />
                ))
            ) : (
                <p className="text-center">No profiles found.</p>
            )}
            </div>
        </div>
        </div>
    );
}
