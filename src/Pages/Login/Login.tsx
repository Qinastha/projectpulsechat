import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PulseForm } from "@Qinastha/pulse_library";
import { LOGIN_REQUIRED_INPUTS } from "../../core";
import "./Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  interface LoginFormData {
    email: string;
    password: string;
  }

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const requiredInputs = LOGIN_REQUIRED_INPUTS;
  const inputValues = [loginForm.email, loginForm.password];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginForm,
      );
      if (response?.data?.value) {
        localStorage.setItem("token", response.data.value);
        navigate("/");
        setLoginForm({ email: "", password: "" });
      }
    } catch (err) {
      console.error(err);
      setLoginForm({ email: "", password: "" });
    }
  };

  return (
    <div className="pageWrapper">
      <div className="loginForm-container">
        <PulseForm
          requiredInputs={requiredInputs}
          inputValues={inputValues}
          formTitle={"Login to your account"}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
