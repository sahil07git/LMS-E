import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [previewImage, setPreviewImage] = useState("");

    const [loginData, setLoginData] = useState({
       email: "",
       password: "",
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(event) {
        event.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        // dispatch create account action
        const response = await dispatch(login(loginData));

            if (response?.payload?.success) {
                toast.success("Logged in successfully!");
                navigate("/");
            } else {
                toast.error(response?.payload?.message || "Login failed!");
    }

        setLoginData({
            email: "",
            password: "",
        });
    }

    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input 
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold"> Password </label>
                        <input 
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer">
                        Login
                    </button>

                    <p className="text-center">
                        Don't have an account ? <Link to="/signup" className="link text-accent cursor-pointer">Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );

}

export default Signup;