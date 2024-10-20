"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import { getCaseAndTasks } from '@/app/test/actions/caseActions'; 
import { fetchUserData } from '@/app/test/page';

interface ProfileCardProps {
    name: string;
    title: string;
    progress: number;
    status: string;
    joinDate: string;
    avatarUrl: string;
}

// Profile card component
const ProfileCard = ({
    name,
    title,
    progress,
    status,
    joinDate,
    avatarUrl,
    }: ProfileCardProps) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center space-x-4">
        <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
        />
        <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{title}</p>
        </div>
        <span
            className={`ml-auto px-2 py-1 rounded-full text-xs ${
            status === 'Completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
        >
            {status}
        </span>
        </div>
        <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
            className="bg-purple-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
            ></div>
        </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Joined {joinDate}</p>
    </div>
);

declare global {
    interface Window {
        google: any;
    }
}

function addMarkerFromLatLng(map: any, lat: number, lng: number, title: string = '') {
  const location = new window.google.maps.LatLng((lat), lng);
  console.log("Adding marker at:", lat, lng);
  
  const marker = new window.google.maps.Marker({
    map: map,
    position: location,
    title: title,
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 10
    }
  });

  console.log("Marker created:", marker);
  return marker;
}

const addMarkerFromAddress = (map: any, address: string) => {
  console.log("Geocoding address:", address);
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results: any, status: any) => {
    if (status === 'OK' && results && results[0]) {
      const location = results[0].geometry.location;
      console.log("Geocoded location:", location.lat(), location.lng());
      const marker = new window.google.maps.Marker({
        map: map,
        position: location,
        title: address,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 10
        }
      });
      console.log("Marker created from address:", marker);
    } else {
      console.error("Geocoding failed:", status);
    }
  });
}

export default function Dashboard(): JSX.Element {
    const [profiles, setProfiles] = useState<ProfileCardProps[]>([]);

    const [filter, setFilter] = useState<string>('All');
    const [filterOpen, setFilterOpen] = useState<boolean>(false);

    const filteredProfiles =
        filter === 'All'
        ? profiles
        : profiles.filter((profile) => profile.status === filter);

    const mapRef = useRef<HTMLDivElement>(null);

    const initMap = async () => {
        if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 15,
        });

        // Fetch cases locations
        const { cases, casesResult, tasksMap } = await fetchUserData();
        if (casesResult) {
            console.log(casesResult.cases?.map((c: { location: string }) => c.location));
        } else {
            console.log('Error fetching cases and tasks');
        }

        casesResult?.cases?.forEach((c: any) => {
            setProfiles((prevProfiles) => [...prevProfiles, {
                name: c.name,
                title: c.title ?? "",
                progress: c.progress ?? 0,
                status: c.status ?? "",
                joinDate: c.joinDate ?? "",
                avatarUrl: '/placeholder.svg?height=48&width=48',
            }]);
        });

        const request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'formatted_address', 'place_id', 'geometry'],
        };

        const infowindow = new window.google.maps.InfoWindow();
        const service = new window.google.maps.places.PlacesService(map);

        service.getDetails(request, (place: any, status: any) => {
            console.log(status === window.google.maps.places.PlacesServiceStatus.OK, place, place.geometry, place.geometry.location);
            if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
            ) {
                console.log("adding: ", casesResult?.cases);
                casesResult?.cases?.forEach((c: { location: string }) => {
                console.log("adding marker for", c.location);
                console.log(JSON.parse(c.location).lat, JSON.parse(c.location).lon);
                const marker = addMarkerFromLatLng(map, JSON.parse(c.location).lat, JSON.parse(c.location).lon);

                window.google.maps.event.addListener(marker, 'click', () => {
                console.log("adding marker");
                    const content = document.createElement('div');
                    const nameElement = document.createElement('h2');

                    nameElement.textContent = place.name;
                    content.appendChild(nameElement);

                    const placeIdElement = document.createElement('p');
                    placeIdElement.textContent = `Place ID: ${place.place_id}`;
                    content.appendChild(placeIdElement);

                    const placeAddressElement = document.createElement('p');
                    placeAddressElement.textContent = place.formatted_address;
                    content.appendChild(placeAddressElement);

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            });
            }
        });
        }
    };

    // Optional: Close dropdown when clicking outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setFilterOpen(false);
        }
        };

        if (filterOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterOpen]);

    return (
        <>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="afterInteractive"
            onLoad={initMap}
        />


        <div className="flex h-screen">
            <main className="flex-1 flex">
            <div className="flex-1 mr-4">
                <div
                ref={mapRef}
                className="w-full h-full rounded-lg"
                style={{ minHeight: '350px' }}
                />
            </div>
            <div className="w-80">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#9687EC]">Profiles</h2>
                <div ref={dropdownRef} className="relative inline-block text-left">
                    <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                    <span>{filter}</span>
                    <ChevronDown size={16} />
                    </button>
                    {filterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                            setFilter('All');
                            setFilterOpen(false);
                            }}
                        >
                            All
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                            setFilter('Completed');
                            setFilterOpen(false);
                            }}
                        >
                            Completed
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                            setFilter('In Progress');
                            setFilterOpen(false);
                            }}
                        >
                            In Progress
                        </li>
                        </ul>
                    </div>
                    )}
                </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-8rem)]">
                {filteredProfiles.map((profile, index) => (
                    <ProfileCard key={index} {...profile} />
                ))}
                </div>
            </div>
            </main>
        </div>
        </>
    );
}
