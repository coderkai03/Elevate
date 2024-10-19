import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";


export default function Page() {
    return (
        <div className="flex h-screen bg-purple-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
            <Dashboard />
        </main>
        </div>
    )
}