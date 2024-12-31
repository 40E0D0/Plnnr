import LoginImage from '../../assets/Auth/Login/plnnr-login-image.svg';
import InputFieldCOMP from '../../components/InputFieldCOMP';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <main className="flex items-center justify-center h-screen animate-fade-in max-w-[1500px] mx-auto px-10">
            <div className="flex flex-col lg:flex-row gap-10 justify-center items-center h-full">
                <img src={LoginImage} alt="Login" className="w-44 lg:w-96" />
                
                {/* Vertical Bar */}
                <div className="h-1/3 w-[2px] bg-gray-400 hidden lg:block"></div>
                
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl">Your ID</h1>
                        <InputFieldCOMP placeholder="Enter your ID" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl">Password</h1>
                        <InputFieldCOMP placeholder="Enter your password" type="password" />
                    </div>
                    
                    {/* Forgot Password Link */}
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 underline self-start">
                        Forgot your password?
                    </a>

                    {/* Login Button */}
                    <button className="mt-5 bg-zinc-300 text-black py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-bold">
                        Log in
                    </button>
                </div>
            </div>

            {/* "No account? Click here to register" - Positioned at the bottom */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm">
                <p>
                    No account? Click{' '}
                    <a href="/register" className="text-blue-600 hover:text-blue-700 underline">
                        here
                    </a>{' '}
                    to register.
                </p>
            </div>
        </main>
    );
}
