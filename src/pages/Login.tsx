import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Form } from "@heroui/react";
import { auth } from "./firebase";
import Loadingbtn from "../components/LoadingButton";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../services/AuthContext";
import { addToast, ToastProvider } from "@heroui/react";

const Login: React.FC = () => {
  const [login, setLogin] = useState<"login" | "signup">("login");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserEmail } = useAuth();

  const showToast = (title: string, description: string) => {
    addToast({ title, description, variant: "bordered" });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let errorMessage = "Incorrect email or password!";

    try {
      if (login === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        setUserEmail(email);
        navigate("/dashboard");
      } else {
        if (password !== confirm) {
          showToast("", "Passwords do not match!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setUserEmail(email);
        navigate("/dashboard");
      }
    } catch (error: any) {
      showToast("", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1728] p-6">
      <ToastProvider placement="top-center" toastOffset={60} />

      <div className="w-[420px] h-[420px] flex flex-col rounded-xl shadow-xl bg-white/10 backdrop-blur-lg p-8 border border-white/20 transition-all duration-300 ease-in-out hover:shadow-2xl">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          {login === "login" ? `Welcome Back ${fname || ""}` : "Create an Account"}
        </h1>

        <Form className="flex flex-col gap-4 flex-1 justify-center" onSubmit={handleAuth}>
          {login === "signup" && (
            <div className="flex gap-4">
              <Input placeholder="First name" radius="none" type="text" value={fname} onChange={(e) => setFName(e.target.value)} />
              <Input placeholder="Last name" radius="none" type="text" value={lname} onChange={(e) => setLName(e.target.value)} />
            </div>
          )}
          <Input placeholder="Email" type="email" radius="none" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Enter your password" radius="none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {login === "signup" && (
            <Input placeholder="Re-type your password" radius="none" type="password" value={confirm} onChange={(e) => setConfirmPassword(e.target.value)} />
          )}
          <Loadingbtn isLoading={isLoading} className="w-full mx-auto rounded-none" type="submit" disabled={isLoading}>
            {login === "login" ? "Login" : "Signup"}
          </Loadingbtn>
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
