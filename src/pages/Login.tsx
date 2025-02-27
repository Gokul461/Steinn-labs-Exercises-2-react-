import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "@heroui/react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [login, setLogin] = useState("login");
  const [email, setEmail] = useState("");
  const [fname, setFiName] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (login === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      } else {
        if (password !== confirm) {
          alert("Passwords do not match!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("SignUp Completed!");
      }
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1728] p-6">
      <div className="flex w-[400px] h-[450px] flex-col rounded-2xl shadow-xl bg-[#2E2B3F] p-8">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          {login === "login" ? `Welcome Back ${fname || ""}` : "Create an Account"}
        </h1>
        <Form className="flex flex-col gap-4 flex-1 justify-center" onSubmit={handleLogin}>
          {login === "signup" && (
            <div className="flex gap-4">
              <Input placeholder="First name" type="text" radius="none" onChange={(e) => setFiName(e.target.value)} />
              <Input placeholder="Last name" type="text" radius="none" />
            </div>
          )}
          <Input placeholder="Email" type="email" radius="none" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Enter your password" type="password" radius="none" onChange={(e) => setPassword(e.target.value)} />
          {login === "signup" && (
            <Input placeholder="Re-type your password" type="password" radius="none" onChange={(e) => setConfirmPassword(e.target.value)} />
          )}
          <Button type="submit" color="primary" radius="none" className="w-full bg-[#ad98ff] hover:bg-[#6A48E0]" variant="solid">
            {login === "login" ? "Login" : "Signup"}
          </Button>
        </Form>
        <p className="text-sm text-center text-gray-400 mt-4">
          {login === "login" ? (
            <>Don't have an account? <a href="#" className="text-purple-400" onClick={() => setLogin("signup")}>Sign up</a></>
          ) : (
            <>Have an account? <a href="#" className="text-purple-400" onClick={() => setLogin("login")}>Login</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
