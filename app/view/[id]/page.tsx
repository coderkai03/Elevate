// "use client";
// import { useState } from 'react';
// import { Home, Users, ClipboardList, PlusCircle, Settings, LogOut } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Sidebar from '@/components/SidebarDemo';
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Shadcn Popover
// import { Input } from '@/components/ui/input'; // Example input
// import { Button } from "@/components/ui/button"; // Button component

// interface ProfileOverviewProps {
//     id: string;
// }

// // Progress bar component
// interface ProgressBarProps {
//     label: string;
//     progress: number;
//     color: string;
// }

// const ProgressBar = ({ label, progress, color }: ProgressBarProps) => (
//     <div className="mb-4">
//         <div className="flex justify-between mb-1">
//             <span className="text-sm font-medium text-gray-700">{label}</span>
//             <span className="text-sm font-medium text-gray-700">{progress}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//                 className={`h-2.5 rounded-full ${color}`}
//                 style={{ width: `${progress}%` }}
//             ></div>
//         </div>
//     </div>
// );

// // Payment form (for the popover)
// const PaymentForm = () => {
//     return (
//         <div className="space-y-4">
//             <h4 className="text-lg font-bold">Payment Method</h4>
//             <p className="text-gray-500 text-sm">Add a new payment method to your account.</p>

//             {/* Payment Method Buttons */}
//             <div className="flex space-x-4 mb-4">
//                 <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-200 focus:ring-2 ring-gray-300">
//                     <span className="block text-center">Card</span>
//                 </button>
//                 <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-200 focus:ring-2 ring-gray-300">
//                     <span className="block text-center">Paypal</span>
//                 </button>
//                 <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-200 focus:ring-2 ring-gray-300">
//                     <span className="block text-center">Apple</span>
//                 </button>
//             </div>

//             {/* Input fields for payment details */}
//             <Input placeholder="Name" className="w-full" />
//             <Input placeholder="City" className="w-full" />
//             <Input placeholder="Card number" className="w-full" />

//             {/* Expiry Date, Year, CVC in a row */}
//             <div className="flex space-x-4">
//                 <div className="w-1/3">
//                     <Input placeholder="Expires" className="w-full" />
//                 </div>
//                 <div className="w-1/3">
//                     <Input placeholder="Year" className="w-full" />
//                 </div>
//                 <div className="w-1/3">
//                     <Input placeholder="CVC" className="w-full" />
//                 </div>
//             </div>

//             <Button className="bg-[#9687EC] w-full">Continue</Button>
//         </div>
//     );
// };

// // Main component
// export default function ProfileOverview({ id }: { id: string }) {
//     const [profile, setProfile] = useState({
//         name: 'Name',
//         gender: 'Male',
//         age: 32,
//         about: `Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi pellentesque cubilia integer est tortor metus sociosqu nam. Donec enim in tellus; dictum nibh nisi. Tristique ad sociosqu massa pharetra ultricies felis curae dignissim accumsan. Sollicitudin aenean rhoncus platea ante imperdiet cubilia primis rutrum iaculis. Nunc curae suspendisse in potenti metus praesent.

//     Facilisis maecenas dis efficitur gravida taciti aliquam sapien. Blandit aliquam finibus aliquet fermentum bibendum. Etiam tellus quisque ultrices id sollicitudin amet ultrices eros nibh. Massa sem ipsum condimentum faucibus magna faucibus tellus; id neque. Duis mauris ligula et ridiculus tempor fringilla. Gravida facilisi turpis dui dignissim posuere posuere.

//     Nisi blandit odio donec mollis tortor nostra fames parturient vestibulum. Efficitur euismod nisi vivamus tempor pellentesque semper sagittis curae. Sagittis ultricies himenaeos convallis litora fringilla; at maecenas. Sagittis purus sollicitudin fermentum euismod malesuada maximus. Facilisi vehicula urna eget sociosqu, curae auctor nisi. Himenaeos dolor conubia commodo ullamcorper et quam. Nostra nostra habitant adipiscing justo nulla mauris cras phasellus. Ridiculus hac eros purus elementum volutpat convallis netus. Vehicula sociosqu dis natoque vestibulum lacinia et. Nunc adipiscing etiam morbi nullam tellus suscipit varius egestas fames.`, // Truncated for brevity
//     });

//     const [overallProgress, setOverallProgress] = useState(75);
//     const [donationProgress, setDonationProgress] = useState(60);

//     return (
//         <div className="flex h-screen bg-purple-50">
//             <Sidebar activeLink="overview" setActiveLink={() => {}} />
//             <main className="flex-1 p-8 overflow-auto">
//                 <div className="flex justify-between items-start mb-8">
//                     <h2 className="text-4xl font-bold text-[#9687EC]">Overview</h2>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                     {/* Updated container */}
//                     <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center justify-between">
//                         {/* Left side: Profile image and info */}
//                         <div className="flex items-center space-x-6">
//                             <Image
//                                 src="/placeholder.svg?height=128&width=128"
//                                 width={128}
//                                 height={128}
//                                 alt={profile.name}
//                                 className="rounded-full"
//                             />
//                             <div>
//                                 <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
//                                 <div className="flex space-x-4 mb-2">
//                                     <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
//                                         Gender: {profile.gender}
//                                     </span>
//                                     <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
//                                         Age: {profile.age}
//                                     </span>
//                                 </div>
//                                 <div className="space-x-4">
//                                     {/* Payment Popover Trigger */}
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button className="bg-[#9687EC] text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
//                                                 Donate
//                                             </button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-96 p-4">
//                                             <PaymentForm />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Right side: Progress bars */}
//                         <div className="w-64">
//                             <ProgressBar
//                                 label="Overall Progress"
//                                 progress={overallProgress}
//                                 color="bg-[#9687EC]"
//                             />
//                             <ProgressBar
//                                 label="Donation Progress"
//                                 progress={donationProgress}
//                                 color="bg-[#9687EC]"
//                             />
//                         </div>
//                     </div>
//                     <div className="p-6">
//                         <h4 className="text-xl font-semibold mb-4">About</h4>
//                         <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

"use client";
import { useState } from 'react';
import { Home, Users, ClipboardList, PlusCircle, Settings, LogOut, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/SidebarDemo';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label'; // Add the Label component
import { PaymentPopupComponent } from '@/components/payment-popup';

interface ProfileOverviewProps {
    id: string;
}

// Progress bar component
interface ProgressBarProps {
    label: string;
    progress: number;
    color: string;
}

const ProgressBar = ({ label, progress, color }: ProgressBarProps) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${color}`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);

// Payment dialog (replacing the popover)
const PaymentPopup = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name on card</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="number">Card number</Label>
                        <div className="relative">
                            <Input id="number" placeholder="1234 5678 9012 3456" />
                            <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Pay Now
                </Button>
            </DialogContent>
        </Dialog>
    );
};

// Main component
export default function ProfileOverview({ id }: { id: string }) {
    const [profile, setProfile] = useState({
        name: 'Name',
        gender: 'Male',
        age: 32,
        about: `Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi pellentesque cubilia integer est tortor metus sociosqu nam. Donec enim in tellus; dictum nibh nisi. Tristique ad sociosqu massa pharetra ultricies felis curae dignissim accumsan. Sollicitudin aenean rhoncus platea ante imperdiet cubilia primis rutrum iaculis. Nunc curae suspendisse in potenti metus praesent.

    Facilisis maecenas dis efficitur gravida taciti aliquam sapien. Blandit aliquam finibus aliquet fermentum bibendum. Etiam tellus quisque ultrices id sollicitudin amet ultrices eros nibh. Massa sem ipsum condimentum faucibus magna faucibus tellus; id neque. Duis mauris ligula et ridiculus tempor fringilla. Gravida facilisi turpis dui dignissim posuere posuere.

    Nisi blandit odio donec mollis tortor nostra fames parturient vestibulum. Efficitur euismod nisi vivamus tempor pellentesque semper sagittis curae. Sagittis ultricies himenaeos convallis litora fringilla; at maecenas. Sagittis purus sollicitudin fermentum euismod malesuada maximus. Facilisi vehicula urna eget sociosqu, curae auctor nisi. Himenaeos dolor conubia commodo ullamcorper et quam. Nostra nostra habitant adipiscing justo nulla mauris cras phasellus. Ridiculus hac eros purus elementum volutpat convallis netus. Vehicula sociosqu dis natoque vestibulum lacinia et. Nunc adipiscing etiam morbi nullam tellus suscipit varius egestas fames.`, // Truncated for brevity
    });

    const [overallProgress, setOverallProgress] = useState(75);
    const [donationProgress, setDonationProgress] = useState(60);

    const [isPaymentOpen, setIsPaymentOpen] = useState(false); // State for payment dialog

    return (
        <div className="flex h-screen bg-purple-50">
            <Sidebar activeLink="overview" setActiveLink={() => {}} />
            <main className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-bold text-[#9687EC]">Overview</h2>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Updated container */}
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center justify-between">
                        {/* Left side: Profile image and info */}
                        <div className="flex items-center space-x-6">
                            <Image
                                src="/placeholder.svg?height=128&width=128"
                                width={128}
                                height={128}
                                alt={profile.name}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
                                <div className="flex space-x-4 mb-2">
                                    <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
                                        Gender: {profile.gender}
                                    </span>
                                    <span className="bg-purple-200 text-[#9687EC] px-3 py-1 rounded-full text-sm">
                                        Age: {profile.age}
                                    </span>
                                </div>
                                <div className="space-x-4">
                                    {/* Payment Dialog Trigger */}
                                    <PaymentPopupComponent/>
                                    {/* <Button onClick={() => setIsPaymentOpen(true)} className="bg-[#9687EC] text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                                        Donate
                                    </Button> */}
                                    <PaymentPopup isOpen={isPaymentOpen} setIsOpen={setIsPaymentOpen} />
                                </div>
                            </div>
                        </div>
                        {/* Right side: Progress bars */}
                        <div className="w-64">
                            <ProgressBar
                                label="Overall Progress"
                                progress={overallProgress}
                                color="bg-[#9687EC]"
                            />
                            <ProgressBar
                                label="Donation Progress"
                                progress={donationProgress}
                                color="bg-[#9687EC]"
                            />
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-semibold mb-4">About</h4>
                        <p className="text-gray-700 whitespace-pre-line">{profile.about}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
