import LoginImage from '../../assets/Auth/Login/plnnr-login-image.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function Login({ setToken }) {

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '', password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    console.log(formData);

    // Replaces empty strings with user inputs
    function handleChange(event) {
        setFormData((prevFormData) => {
            return { ...prevFormData, [event.target.name]: event.target.value }
        });
    }

    // Handling submission and adds user to Supabase
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Login the user
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            setIsLoading(false);

            if (error) throw error;
            console.log('Logged in user:', data.user); // Check if login worked
            console.log(data);
            setToken(data);

            // Fetch user role
            const user = data.user;
            const { data: userData, error: roleError } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (roleError) {
                console.error("Error fetching user role:", roleError);
                alert("Failed to fetch user role.");
            } else if (userData) {
                // Redirect based on user role
                if (userData.role === "Student") {
                    navigate("/dashboard/planner"); // Redirect to Student UI
                } else if (userData.role === "Advisor") {
                    navigate("dashboard/advisor-planner"); // Redirect to Advisor UI
                }
            }

            console.log("Fetched role:", userData.role); // Verify the fetched role

        } catch (error) {
            console.error("Error during login:", error.message);
            alert(error);
        } finally {
            setIsLoading(false); // Always reset loading state
        }
    }

    return (
        <main className="flex items-center justify-center bg-white h-screen animate-fade-in max-w-[1800px] mx-auto px-10">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-10 justify-center items-center h-full">
                    <img src={LoginImage} alt="Login" className="w-44 lg:w-96" />

                    {/* Vertical Bar */}
                    <div className="h-1/3 w-[2px] bg-gray-400 hidden lg:block"></div>

                    {/* Login form */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl">Your Email</h1>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your Email"
                                className="bg-white w-full py-2 pl-4 pr-10 rounded-md font-bold outline-none focus:outline-none focus:ring-2 focus:ring-opacity-100 ring-opacity-0 transition-all duration-250 z-10 border-2 border-gray-400"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl">Your Password</h1>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                className="bg-white w-full py-2 pl-4 pr-10 rounded-md font-bold outline-none focus:outline-none focus:ring-2 focus:ring-opacity-100 ring-opacity-0 transition-all duration-250 z-10 border-2 border-gray-400"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <Link to="/i-forgot" className="text-sm text-blue-600 hover:text-blue-700 underline self-start">
                            Forgot your password?
                        </Link>

                        {/* Login Button */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className="mt-5 bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300 font-bold"
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Link to register page */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm">
                <p>
                    No account? Click{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 underline">
                        here
                    </Link>{' '}
                    to register.
                </p>
            </div>
        </main>
    );
}
