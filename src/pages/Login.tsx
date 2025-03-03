import { useState,useEffect } from "react";
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
  const { setUserEmail,setUser,user } = useAuth();

  const showSuccessToast = (title: string, description: string) => {
    addToast({
      title,
      description,
      variant: "flat", 
      color: "success", 
    });
  };
  
  const showErrorToast = (title: string, description: string) => {
    addToast({
      title,
      description,
      variant: "solid", 
      color: "danger", 
    });
  };
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (login === "login") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setUserEmail(email);
        navigate("/dashboard");
      } else {
        if (password !== confirm) {
          showErrorToast("Error", "Passwords do not match!");
          setIsLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setLogin("login"); 
        showSuccessToast("Success", "Account created! Please log in.");
      }
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email already exists! Try logging in.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format!";
          break;
        case "auth/invalid-credential":
          message= "Incorrect email or password";
          break;
        case "auth/user-not-found":
          message = "User not found! Please sign up.";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;
      }
      showErrorToast("", message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true }); 
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1728] p-6">
      <ToastProvider
        toastProps={{
          radius: "sm",
          color: "secondary",
          variant: "bordered",
          timeout: 3000,
          classNames: {
            closeButton: "opacity-5 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
        placement="top-center"
        toastOffset={60}
      />

      <div className="w-[420px] h-auto flex flex-col rounded-xl shadow-xl bg-white/10 backdrop-blur-lg p-8 border border-white/20 transition-all duration-300 ease-in-out hover:shadow-2xl">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          {login === "login" ? `Welcome Back ${fname || ""}` : "Create an Account"}
        </h1>

        <Form className="flex flex-col gap-4 flex-1 justify-center" onSubmit={handleAuth}>
          {login === "signup" && (
            <div className="flex gap-4">
              <Input placeholder="First name" isRequired radius="none" type="text" value={fname} onChange={(e) => setFName(e.target.value)} />
              <Input placeholder="Last name" isRequired radius="none" type="text" value={lname} onChange={(e) => setLName(e.target.value)} />
            </div>
          )}
          <Input placeholder="Email" type="email" isRequired radius="none" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Enter your password" isRequired radius="none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {login === "signup" && (
            <Input placeholder="Re-type your password" isRequired radius="none" type="password" value={confirm} onChange={(e) => setConfirmPassword(e.target.value)} />
          )}
          <Loadingbtn isLoading={isLoading} className="w-full mx-auto rounded-none" type="submit" disabled={isLoading || (login === "signup" && password !== confirm)}>
            {login === "login" ? "Login" : "Signup"}
          </Loadingbtn>
        </Form>

        <p className="text-sm text-center text-gray-400 mt-4">
          {login === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-purple-400 underline focus:outline-none"
                onClick={() => {
                  setLogin("signup");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Have an account?{" "}
              <button
                className="text-purple-400 underline focus:outline-none"
                onClick={() => {
                  setLogin("login");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
