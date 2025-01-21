import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

export default function StudentRegister() {

    const [formData, setFormData] = useState({
        fullName:'', levelStudy:'', studentID:'', institute:'', email:'', password:'', phoneNo:'', confirmPassword:''
    })

    const [errorMessage, setErrorMessage] = useState(""); //Sets error message at the bottom of the form

    const [isLoading, setIsLoading] = useState(false);    //Checks if registration is in process so the 
                                                          //Register button can signify process is ongoing

    console.log(formData)

    //Replaces empty strings with user inputs
    function handleChange(event){
        setFormData((prevFormData)=>{
            return {...prevFormData, [event.target.name]: event.target.value}
        })
    }

    // Handling submission and adds user to Supabase
    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

    try {
    // Checking if passwords match or not
    if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return; // Stop the function if passwords don't match
    }

    // Clear error message if validation passes
    setErrorMessage("");

    // Minimum password length
    if (formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        return;
    }

    // Password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
    }
    // Checks if all fields are filled
            const { data: authData, error: authError } = await supabase.auth.signUp(
                {
                  email: formData.email,
                  password: formData.password,
                  options: {
                    data: {
                      full_name: formData.fullName,
                      student_id: formData.studentID,
                      level_study: formData.levelStudy,
                      institute: formData.institute,
                      phone_no: formData.phoneNo,
                      confirm_password: formData.confirmPassword,
                      role: 'Student'
                    }
                  }
                }
              );

              if (authError) throw authError;

        // Insert user data into the 'users' table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([
                {
                    id: authData.user.id, // Use the user ID from the auth response
                    full_name: formData.fullName,
                    student_id: formData.studentID,
                    level_study: formData.levelStudy,
                    institute: formData.institute,
                    email: formData.email,
                    phone_no: formData.phoneNo,
                    role: 'Student'
                }
            ]);

        if (userError) throw userError;

        // Log the inserted user data
        console.log("Inserted user data:", userData);

              setIsLoading(false)
              alert("Check your email for a verification link")

        } catch (error) {
            setErrorMessage(error.message);  // Handles the error
            console.error(error);            // Optionally log the error for debugging
            
        }   finally {
            setIsLoading(false) // Always reset loading state
        }  
    }


    return (
        <main className="flex items-center justify-center h-screen bg-white-900 text-white">
            <div className="max-w-4xl mx-auto px-8 py-12 bg-white text-black rounded-lg shadow-lg">
                <h1 className="absolute top-4 left-4 text-2xl font-bold mb-6">Plnnr. | Register as student</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full name*</label>
                        <input name="fullName" 
                        type="text" 
                        className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md"
                        onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Level of study</label>
                        <input name="levelStudy"
                         type="text" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md"
                         onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Student ID*</label>
                        <input name="studentID"
                         type="text" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md" 
                         onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Institute*</label>
                        <input name="institute"
                         type="text" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md"
                         onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">University email*</label>
                        <input name="email"
                         type="email" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md" 
                         onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password*</label>
                        <input name="password"
                         type="password" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md" 
                         onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone number*</label>
                        <input name="phoneNo"
                         type="tel" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md" 
                         onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Confirm password*</label>
                        <input name="confirmPassword"
                         type="password" 
                         className="bg-white w-full border border-gray-300 px-4 py-2 rounded-md"
                        onChange={handleChange}/>
                    </div>
            
                <p className="text-xs text-red-600 mt-4">*required</p>


                {/* Text Section */}
                <div className="flex flex-col justify-center">
                        <p className="text-sm font-regular mt-6">Ensure all information entered is correct.</p>
                    </div>

                    <div className="mt-6 flex gap-4">
                    <Link to="/register" className="bg-gray-400 text-black py-2 px-6 rounded-md hover:bg-gray-300 hover:text-black transition">
                        Back
                    </Link>
                    <button type='submit' disabled={isLoading}  className="bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-500 hover:text-white transition">
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>

                {/* Displaying error message at the bottom */}
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                </form>
            </div>
        </main>
    );
}
