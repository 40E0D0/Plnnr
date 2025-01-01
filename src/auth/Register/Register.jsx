import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <main className="flex items-center justify-center h-screen bg-white-900 text-white">
            <div className="max-w-xl mx-auto px-8 py-12 bg-white text-black rounded-lg shadow-lg text-center">
                <h1 className="absolute top-4 left-4 text-2xl font-bold mb-6">Plnnr. | Registration Page</h1>
                <p className="text-lg mb-6">I am a...</p>
                <div className="flex flex-col gap-4">
                    {/* Link for Student Registration */}
                    <Link 
                        to="/register/student" 
                        className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-blue-700 hover:text-white transition">
                        Student (advisee)
                    </Link>

                    {/* Link for Advisor Registration */}
                    <Link 
                        to="/register/advisor" 
                        className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-blue-700 hover:text-white transition">
                        Lecturer (advisor)
                    </Link>
                </div>
            </div>
        </main>
    );
}
