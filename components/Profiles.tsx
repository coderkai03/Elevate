import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ProfileCard from './ProfileCard';

export const profiles = [
    { 
        id: 1, 
        name: 'John Doe', 
        title: 'Designer', 
        amount: 1000.22, 
        joinDate: 'December 2021', 
        status: 'Completed', 
        progress: null, 
        avatarUrl: '/pic/p1.jpeg', 
        age: 30,
        gender: 'Male',
        about: 'John is a passionate designer with a keen eye for detail. He specializes in user interface design and has a knack for creating intuitive, user-friendly layouts.'
    },
    { 
        id: 2, 
        name: 'Michael Brown', 
        title: 'Developer', 
        amount: 1200.45, 
        joinDate: 'January 2022', 
        status: 'In Progress', 
        progress: 78.6, 
        avatarUrl: '/pic/p2.jpeg', 
        age: 28,
        gender: 'Male',
        about: 'Michael is a full-stack developer with a passion for building scalable web applications. He\'s always eager to learn new technologies and improve his coding skills.'
    },
    { 
        id: 3, 
        name: 'Jane Smith', 
        title: 'Project Manager', 
        amount: 1300.50, 
        joinDate: 'February 2022', 
        status: 'Completed', 
        progress: null, 
        avatarUrl: '/pic/p3.jpg', 
        age: 35,
        gender: 'Female',
        about: 'Jane is an experienced project manager with a track record of delivering complex projects on time and within budget. She excels at team coordination and stakeholder management.'
    },
    { 
        id: 4, 
        name: 'Chris Lee', 
        title: 'Tester', 
        amount: 1400.80, 
        joinDate: 'March 2022', 
        status: 'In Progress', 
        progress: 52.3, 
        avatarUrl: '/pic/p4.jpeg', 
        age: 26,
        gender: 'Non-binary',
        about: 'Chris is a meticulous tester with a sharp eye for identifying bugs and inconsistencies. They are passionate about ensuring top-notch quality in all software products.'
    },
    { 
        id: 5, 
        name: 'Sarah Johnson', 
        title: 'Designer', 
        amount: 1100.10, 
        joinDate: 'April 2022', 
        status: 'Completed', 
        progress: null, 
        avatarUrl: '/pic/p5.jpg', 
        age: 32,
        gender: 'Female',
        about: 'Sarah is a creative designer specializing in brand identity and packaging design. She has a unique ability to translate client visions into stunning visual concepts.'
    },
    { 
        id: 6, 
        name: 'Emma Davis', 
        title: 'Developer', 
        amount: 1050.75, 
        joinDate: 'May 2022', 
        status: 'Completed', 
        progress: null, 
        avatarUrl: '/pic/p6.jpg', 
        age: 29,
        gender: 'Female',
        about: 'Emma is a backend developer with expertise in database design and API development. She\'s known for writing clean, efficient code and solving complex algorithmic challenges.'
    },
    { 
        id: 7, 
        name: 'James Wilson', 
        title: 'Tester', 
        amount: 1150.30, 
        joinDate: 'June 2022', 
        status: 'In Progress', 
        progress: 67.8, 
        avatarUrl: '/pic/p7.jpeg', 
        age: 31,
        gender: 'Male',
        about: 'James is a QA specialist with a background in automated testing. He\'s dedicated to improving test coverage and implementing efficient testing processes.'
    },
    { 
        id: 8, 
        name: 'Sophia Martinez', 
        title: 'Project Manager', 
        amount: 1250.90, 
        joinDate: 'July 2022', 
        status: 'Completed', 
        progress: null, 
        avatarUrl: '/pic/p8.jpg', 
        age: 34,
        gender: 'Female',
        about: 'Sophia is a dynamic project manager with a focus on Agile methodologies. She excels at fostering team collaboration and driving projects to successful completion.'
    },
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
