// Sidebar.tsx
"use client";

import {
    Home as HomeIcon,
    User,
    ClipboardList,
    PlusCircle,
    Settings,
    LogOut,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './img/logo.png';

interface SidebarProps {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

export default function Sidebar({ activeLink, setActiveLink }: SidebarProps) {
    return (
        <aside className="relative w-64 p-6 shadow-lg h-screen" >
        <div className="flex items-center mb-8">
            <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-md"
            />
            <h1 className="text-2xl font-bold ml-2">Elevate</h1>
        </div>

        <nav className="space-y-4">
            <NavItem
            label="Dashboard"
            icon={<HomeIcon size={20} />}
            href="/dashboard"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
            <NavItem
            label="Profiles"
            icon={<User size={20} />}
            href="/profiles"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
            <NavItem
            label="Task Manager"
            icon={<ClipboardList size={20} />}
            href="/task-manager"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
            <NavItem
            label="New Case"
            icon={<PlusCircle size={20} />}
            href="/new-case"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
        </nav>

        {/* Bottom Navigation */}
        <div className="absolute bottom-6 space-y-4">
            <NavItem
            label="Settings"
            icon={<Settings size={20} />}
            href="/settings"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
            <NavItem
            label="Log Out"
            icon={<LogOut size={20} />}
            href="/logout"
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            />
        </div>
        </aside>
    );
}

interface NavItemProps {
    label: string;
    icon: React.ReactNode;
    href: string;
    activeLink: string;
    setActiveLink: (link: string) => void;
}

function NavItem({ label, icon, href, activeLink, setActiveLink }: NavItemProps) {
    const isActive = activeLink === label;

    return (
        <div className="group">
        <div
            className={`p-[2px] rounded-md ${
            isActive ? 'bg-gradient-to-r from-[#4984EE] to-[#9747FF]' : ''
            }`}
        >
            <button
            onClick={() => setActiveLink(label)}
            className={`flex items-center space-x-2 p-2 rounded-md w-full text-left ${
                isActive
                ? 'bg-white text-[#9687EC]'
                : 'text-gray-600 hover:text-purple-900'
            }`}
            >
            {icon}
            <span>{label}</span>
            </button>
        </div>
        </div>
    );
}
