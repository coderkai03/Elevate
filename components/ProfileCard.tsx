import Image from 'next/image'

type ProfileCardProps = {
    name: string
    title: string
    progress: number | null
    joinDate: string
    status: 'Completed' | 'In Progress'
    avatarUrl: string
}

export default function ProfileCard({ name, title, progress, joinDate, status, avatarUrl }: ProfileCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
        <Image src={avatarUrl} alt={name} width={80} height={80} className="rounded-full" />
        <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-gray-600">{title}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm ${
                status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
                {status}
            </span>
            </div>
            <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
                ></div>
            </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Joined {joinDate}
            </div>
        </div>
        </div>
    )
}