import Image from "next/image";
import Link from "next/link";
import bg from "./img/background1.png";
import element from "./img/element.png";
import logo from "./img/logo.png";
// import { Nav } from "@/components/Nav";

export default function Home() {
    return (
        <div 
            className="w-screen h-screen overflow-hidden"  
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
        
        {/* <Nav/> */}

        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Image src={logo} alt="logo" className="w-8 h-8 rounded-md" />
                <span className="text-2xl font-bold">Elevate</span>

                <nav className="hidden md:flex space-x-6 pl-8">
                    <Link className="text-gray-600 hover:text-gray-900" href="#">
                        About
                    </Link>
                    <Link className="text-gray-600 hover:text-gray-900" href="#">
                        Features
                    </Link>
                    <Link className="text-gray-600 hover:text-gray-900" href="#">
                        Pricing
                    </Link>
                    <Link className="text-[#9687EC] hover:text-[#3D364B]" href="#">
                        Cases
                    </Link>
                </nav>
            </div>

            <div className="flex items-center space-x-4">
                <button className="hidden md:block text-gray-600 hover:text-gray-900">Log In</button>
                <button className="bg-[#9687EC] text-white px-4 py-2 rounded-md hover:bg-[#3D364B] transition duration-300">
                    Sign In
                </button>
            </div>
        </header>

        <main className="mx-auto h-full flex flex-col md:flex-row items-center px-0 pl-11">
            <div className="md:w-1/2 mb-8 md:mb-0 mt-[-100px]">
                <h1 className="text-6xl md:text-6xl font-bold mb-4">
                    <span className="text-[#9687EC]">Empowering</span>
                    <br />
                    <span className="text-[#9687EC]">Homelessness</span>
                </h1>
                <h2 className="text-3xl md:text-6xl font-bold mb-6">
                    Through Community
                    <br />
                    Crowdfunding
                </h2>
                <div className="flex space-x-4">
                    <Link href="/demo">
                        <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-100">
                            Try demo
                        </button>
                    </Link>
                    <button className="bg-[#9687EC] text-white px-6 py-3 rounded-md hover:bg-[#3D364B] transition duration-300 flex items-center">
                        Start now 
                        <span className="ml-2">›</span>
                    </button>
                </div>
                <div className="pt-4">
                    <Link href="/AllyView">
                        <p className="text-black hover:text-[#9687EC]">Sign in as Ally</p>
                    </Link>
                </div>
            </div>

            <div className="md:w-1/2 flex justify-end items-center h-full mt-[-100px]">
                <Image src={element} alt="element" className="rounded-md object-contain align-right" />
            </div>
        </main>
        </div>
    );
}
