import { useState } from "react";
import { Input, Button, Form } from "@heroui/react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [login, setLogin] = useState("login");
  const [email, setEmail] = useState("");
  const [fname, setFiName] = useState("");
  // const [lname, setLaName] = useState("");
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
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2E2B3F] p-6">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden bg-[#1A1728]">
        {/* Left Side */}
        <div
          className="hidden md:flex flex-1 flex-col justify-center items-center h-[500px] text-white p-8 text-center"
          style={{ backgroundImage: `url('src/assets/se.jpeg')`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
        </div>

        {/* Right Side */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center">
          <div className="w-[380px] h-[420px] bg-[#2E2B3F] p-6 rounded-xl shadow-md"> 
            <h1 className="text-2xl font-semibold text-center text-white mb-6">
              {login === "login" ? `Welcome Back ${fname || ""}` : "Create an Account"}
            </h1>
            <Form className="flex flex-col gap-5" onSubmit={handleLogin}>
              {login === "signup" && (
                <div className="flex gap-4 flex-row">
                  <Input
                    className="max-w-[220px] "
                    placeholder="First name"
                    type="text"
                    radius="none"
                    onChange={(e) => setFiName(e.target.value)}
                  />
                  <Input
                    className="max-w-[220px] rounded-none "
                    placeholder="Last name"
                    type="text"
                    radius="none"
                  />
                </div>
              )}
              <Input
                placeholder="Email"
                type="email"
                radius="none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter your password"
                type="password"
                radius="none"
                onChange={(e) => setPassword(e.target.value)}
              />

              {login === "signup" && (
                <Input
                  placeholder="Re-type your password"
                  type="password"
                  radius="none"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}

              <Button type="submit" color="primary" radius="none" className="w-full  bg-[#7C5CFC] hover:bg-[#6A48E0]" variant="solid">
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
      </div>
    </div>
  );
};

export default Login;
