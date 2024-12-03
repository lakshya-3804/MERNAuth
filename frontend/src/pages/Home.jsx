import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Home() {
    const isLoggedIn = useSelector(state => state.checkAuth.isLoggedIn);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleHome = async () => {
        try {
            const response = await fetch('http://localhost:1234/api/v1/user/',{
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("something went wrong in fetching home data");
            }
            const data = await response.json();
            setUsername(data.data.username || "not found");
            setEmail(data.data.email || "not found");
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error,
                icon: "error"
            });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            handleHome();
        }
        else{
            setEmail("");
            setUsername("");
        }
    }, [isLoggedIn]);

    return (
        <div className="text-center mx-auto mt-10">
            <h1 className="text-5xl">Home</h1>
            <p className="text-white text-2xl my-3">Username : {username}</p>
            <p className="text-white text-2xl">Email : {email}</p>
        </div>
    );
}
