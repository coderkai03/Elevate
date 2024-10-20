import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ProfileCard from './ProfileCard';

export const profiles = [
    {
        id: 0,  // Assuming this is the next available ID
        name: 'Lia Juan',
        title: 'Homeless Individual',
        amount: 150.25,
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'In Progress',
        progress: 15,
        avatarUrl: '/default-pfp.jpg',
        age: 20,
        gender: 'Female',
        about: 'Lia is a young woman experiencing homelessness due to a series of unfortunate events. At just 20 years old, she\'s determined to find stable housing and employment while addressing her immediate needs. Lia grew up in a troubled home and left at 18 to escape an abusive situation. She\'s been struggling to make ends meet ever since, often relying on temporary shelters and the kindness of strangers. Despite her challenges, Lia remains optimistic and is actively working to improve her situation. She\'s currently seeking part-time work while also looking into educational opportunities to build a better future for herself. Lia\'s immediate goals include securing a spot in a youth housing program, finding steady employment, and eventually enrolling in community college courses. She\'s particularly interested in social work, inspired by the people who have helped her along the way.',
        tasks: [
            { title: "Shelter Registration", description: "Register at local youth shelter for temporary accommodation" },
            { title: "Food Assistance", description: "Apply for SNAP benefits and locate nearby food banks" },
            { title: "Job Search", description: "Visit local library to use computers for job searching and application submissions" },
            { title: "Health Check-up", description: "Schedule appointment at free clinic for general health assessment" },
            { title: "Education Options", description: "Explore GED programs or community college courses to improve future prospects" }
        ]
    },
    { 
        id: 1, 
        name: 'John Doe', 
        title: 'Seeking Employment', 
        amount: 1000.22, 
        joinDate: 'December 2021', 
        status: 'In Progress', 
        progress: 65, 
        avatarUrl: '/pic/p1.jpeg', 
        age: 30,
        gender: 'Male',
        about: 'John is a former construction worker looking to rebuild his life. He\'s eager to find stable employment and housing.',
        tasks: [
            { title: "Attend job skills workshop", description: "Participate in a workshop on resume writing and interview skills" },
            { title: "Apply for housing assistance", description: "Submit application for local housing assistance program" },
            { title: "Schedule health check-up", description: "Book an appointment for a general health assessment" },
            { title: "Meet with career counselor", description: "Discuss job opportunities in the construction industry" },
            { title: "Obtain necessary work gear", description: "Acquire safety boots and hard hat for potential construction jobs" }
        ]
    },
    { 
        id: 2, 
        name: 'Michael Brown', 
        title: 'Recovering Addict', 
        amount: 1200.45, 
        joinDate: 'January 2022', 
        status: 'In Progress', 
        progress: 78.6, 
        avatarUrl: '/pic/p2.jpeg', 
        age: 28,
        gender: 'Male',
        about: 'Michael is working hard on his recovery from substance abuse. He\'s committed to staying sober and finding steady employment.',
        tasks: [
            { title: "Attend NA meeting", description: "Participate in daily Narcotics Anonymous meeting" },
            { title: "Meet with sponsor", description: "Weekly check-in with NA sponsor for support" },
            { title: "Job search", description: "Spend 2 hours daily searching and applying for jobs" },
            { title: "Life skills class", description: "Attend weekly life skills class at the community center" },
            { title: "Relapse prevention plan", description: "Develop a detailed relapse prevention plan with counselor" }
        ]
    },
    { 
        id: 3, 
        name: 'Jane Smith', 
        title: 'Single Mother', 
        amount: 1300.50, 
        joinDate: 'February 2022', 
        status: 'In Progress', 
        progress: 45, 
        avatarUrl: '/pic/p3.jpg', 
        age: 35,
        gender: 'Female',
        about: 'Jane is a single mother of two, determined to provide a stable home for her children. She\'s focusing on education and finding family-friendly housing.',
        tasks: [
            { title: "GED study session", description: "Study for GED exam, focusing on math and science" },
            { title: "Meet with social worker", description: "Discuss family housing options and support services" },
            { title: "Childcare arrangement", description: "Secure reliable childcare for job hunting and classes" },
            { title: "Budget planning", description: "Create a monthly budget plan with financial advisor" },
            { title: "Parenting class", description: "Attend weekly parenting class for single mothers" }
        ]
    },
    { 
        id: 4, 
        name: 'Chris Lee', 
        title: 'Veteran', 
        amount: 1400.80, 
        joinDate: 'March 2022', 
        status: 'In Progress', 
        progress: 52.3, 
        avatarUrl: '/pic/p4.jpeg', 
        age: 26,
        gender: 'Non-binary',
        about: 'Chris is a veteran struggling with PTSD. They are working on mental health recovery and transitioning to civilian life.',
        tasks: [
            { title: "VA counseling session", description: "Attend weekly PTSD counseling at VA center" },
            { title: "Job training program", description: "Participate in veteran job training program" },
            { title: "Housing application", description: "Complete application for veteran housing assistance" },
            { title: "Support group meeting", description: "Attend veteran support group meeting" },
            { title: "Mindfulness workshop", description: "Participate in mindfulness and stress reduction workshop" }
        ]
    },
    { 
        id: 5, 
        name: 'Sarah Johnson', 
        title: 'Domestic Violence Survivor', 
        amount: 1100.10, 
        joinDate: 'April 2022', 
        status: 'In Progress', 
        progress: 60, 
        avatarUrl: '/pic/p5.jpg', 
        age: 32,
        gender: 'Female',
        about: 'Sarah is rebuilding her life after escaping an abusive relationship. She\'s focused on healing and establishing independence.',
        tasks: [
            { title: "Therapy session", description: "Attend weekly trauma counseling session" },
            { title: "Legal aid meeting", description: "Meet with legal aid to discuss restraining order" },
            { title: "Job skills assessment", description: "Complete job skills assessment at employment center" },
            { title: "Self-defense class", description: "Participate in women's self-defense class" },
            { title: "Support network building", description: "Attend social event for domestic violence survivors" }
        ]
    },
    { 
        id: 6, 
        name: 'Emma Davis', 
        title: 'Youth (18-24)', 
        amount: 1050.75, 
        joinDate: 'May 2022', 
        status: 'In Progress', 
        progress: 70, 
        avatarUrl: '/pic/p6.jpg', 
        age: 20,
        gender: 'Female',
        about: 'Emma aged out of the foster care system and is working on establishing herself. She\'s interested in pursuing higher education.',
        tasks: [
            { title: "College application", description: "Work on community college application" },
            { title: "Financial aid workshop", description: "Attend workshop on applying for student financial aid" },
            { title: "Life skills training", description: "Participate in youth life skills program" },
            { title: "Meet with mentor", description: "Weekly check-in with assigned youth mentor" },
            { title: "Job shadowing", description: "Arrange job shadowing opportunity in field of interest" }
        ]
    },
    { 
        id: 7, 
        name: 'James Wilson', 
        title: 'Seeking Mental Health Support', 
        amount: 1150.30, 
        joinDate: 'June 2022', 
        status: 'In Progress', 
        progress: 67.8, 
        avatarUrl: '/pic/p7.jpeg', 
        age: 31,
        gender: 'Male',
        about: 'James is dealing with bipolar disorder and is committed to managing his mental health while finding stable housing and employment.',
        tasks: [
            { title: "Psychiatrist appointment", description: "Monthly check-in with psychiatrist for medication management" },
            { title: "Group therapy", description: "Attend weekly group therapy session" },
            { title: "Job readiness program", description: "Participate in job readiness program for individuals with mental health challenges" },
            { title: "Housing search", description: "Search for supportive housing options" },
            { title: "Wellness plan", description: "Develop a comprehensive wellness plan with therapist" }
        ]
    },
    { 
        id: 8, 
        name: 'Sophia Martinez', 
        title: 'Immigrant', 
        amount: 1250.90, 
        joinDate: 'July 2022', 
        status: 'In Progress', 
        progress: 55, 
        avatarUrl: '/pic/p8.jpg', 
        age: 34,
        gender: 'Female',
        about: 'Sophia is a recent immigrant facing language barriers and struggling to find work and housing. She\'s determined to build a new life in her adopted country.',
        tasks: [
            { title: "ESL class", description: "Attend daily English as Second Language class" },
            { title: "Meet with immigration lawyer", description: "Discuss visa status and work permit options" },
            { title: "Job search assistance", description: "Work with job counselor on finding employment opportunities" },
            { title: "Cultural orientation", description: "Attend weekly cultural orientation session" },
            { title: "Skills assessment", description: "Complete skills and qualifications assessment for job matching" }
        ]
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
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[#BDB3F2]-100 focus:outline-none focus:ring-2 focus:ring-[#9687EC] shadow-md hover:shadow-lg transition-shadow"
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
                filteredProfiles.slice(1).map((profile, index) => (
                <ProfileCard key={index + 1} {...profile} />
                ))
            ) : (
                <p className="text-center">No profiles found.</p>
            )}
            </div>
        </div>
        </div>
    );
}
