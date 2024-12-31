export default function AdvisorRegister() {
    return (
        <main className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-8 py-12 bg-white text-black rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Plnnr. | Register as advisor</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full name*</label>
                        <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone number*</label>
                        <input type="tel" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Staff ID*</label>
                        <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password*</label>
                        <input type="password" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">University email*</label>
                        <input type="email" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Confirm password*</label>
                        <input type="password" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Institute*</label>
                        <input type="text" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    </div>
                </form>
                <p className="text-xs text-red-600 mt-4">*required</p>
                <div className="mt-6">
                    <button className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-blue-700 hover:text-white transition">
                        Register
                    </button>
                </div>
            </div>
        </main>
    );
}
