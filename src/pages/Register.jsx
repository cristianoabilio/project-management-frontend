import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
                password_confirmation
            });

            const token = response.data.data.token;
            localStorage.setItem('token', token);

            toast.success(response.data.message);

            navigate('/login');

        } catch (error) {

            toast.error('Something went wrong');

            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div class="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                <input
                    id="name"
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    id="email"
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    id="password"
                    className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    id="password_confirmation"
                    className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Password Confirmation"
                    required
                />

                <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
                    {loading ? "Submitting..." : "Create Account"}
                </button>
                {message && (
                    <p>{message}</p>
                )}
                <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link></p>
            </form>
        </div>
    );
};