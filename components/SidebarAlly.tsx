"use client";

import {
    User,
    ClipboardList,
    PlusCircle,
    Settings,
    LogOut,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/pic/logo.png';
import { useState, useEffect } from 'react';

interface SidebarProps {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

export default function Sidebar({ activeLink, setActiveLink }: SidebarProps) {
    // Automatically set "Profiles" as the default active link when the sidebar loads
    useEffect(() => {
        if (!activeLink) {
            setActiveLink('Profiles');
        }
    }, [activeLink, setActiveLink]);

    return (
        <aside className="relative w-64 p-6 shadow-lg h-screen">
            <div className="flex items-center mb-8">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md"
                    />
                </Link>
                <Link href="/">
                    <h1 className="text-2xl font-bold ml-2">Elevate</h1>
                </Link>
            </div>

            <nav className="space-y-4">
                <NavItem
                    label="Profiles"
                    icon={<User size={20} />}
                    href="/profiles"
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                />
                {/* <NavItem
                    label="Task Manager"
                    icon={<ClipboardList size={20} />}
                    href="/task-manager"
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                /> */}
                <NavItem
                    label="New Case"
                    icon={<PlusCircle size={20} />}
                    href="/new-case"
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                />
            </nav>

            <div className="absolute bottom-6 space-y-4">
                <NavItem
                    label="Settings"
                    icon={<Settings size={20} />}
                    href="#"
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                />
                <NavItem
                    label="Log Out"
                    icon={<LogOut size={20} />}
                    href="#"
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
    const isSpecial = label === 'Settings' || label === 'Log Out';

    return (
        <div className="group">
            <div
                className={`relative p-[2px] rounded-md ${
                    isActive && !isSpecial ? 'bg-gradient-to-r from-[#4984EE] to-[#9747FF]' : ''
                }`}
            >
                {/* Inner container for the gradient and fill effect */}
                <div
                    onClick={() => {
                        setActiveLink(label);
                    }}
                    className={`flex items-center space-x-2 p-2 rounded-md w-full text-left ${
                        isActive && !isSpecial
                            ? 'bg-[#F7F7F7] text-[#9687EC]' // Background is now #F7F7F7 for active link
                            : 'text-gray-600 hover:text-purple-900'
                    } cursor-pointer`}
                >
                    {icon}
                    <span>{label}</span>
                </div>
            </div>
        </div>
    );
}
