import React, {useEffect, useState} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const Login:React.FC = () => {
    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState( {
        email: "",
        password: "",
    })

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', loginForm);
            localStorage.setItem("token", response.data.value);
            setLoginForm({email: "", password: ""});
        } catch (err) {
            console.error(err);
            setLoginForm({email: "", password: ""});
        }
    }

    return (
        <div className="loginForm-container">
            <form>
                <input
                    className="loginForm-container__input"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Username"
                />
                <input
                    className="loginForm-container__input"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Password"
                />
                <button type="button" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login;