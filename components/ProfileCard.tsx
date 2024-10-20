"use client"
import Image from 'next/image';
import Link from 'next/link';

type ProfileCardProps = {
    name: string;
    title: string;
    progress: number | null;
    joinDate: string;
    status: string;
    avatarUrl: string;
    amount: number;
    id: number;
};

export default function ProfileCard({ name, title, progress, joinDate, status, avatarUrl, amount, id }: ProfileCardProps) {
    const totalAmount = 10000; 

    return (
        <Link href={`/profiles/${id}`}>
            <div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4 relative cursor-pointer"
        >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-lg">
                <div
                    className="h-1 bg-purple-600 rounded-t-lg"
                    style={{ width: `${progress}%` }} 
                    ></div>
            </div>

            <div className="flex items-start space-x-4">
                <Image src={avatarUrl} alt={name} width={80} height={80} className="rounded-full" />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg">{name}</h3>
                            <p className="text-gray-600">{title}</p>
                        </div>
                        <span
                            className={`px-2 py-1 rounded-full text-sm ${
                                status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                            >
                            {status}
                        </span>
                    </div>

                    <div className="mb-2">
                        <p className="text-sm text-gray-500 mb-1">
                            ${amount.toFixed(2)} of ${totalAmount.toFixed(2)}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${(amount / totalAmount) * 100}%` }} // Percentage of total collected
                                ></div>
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                        </svg>
                        Joined {joinDate}
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
}
