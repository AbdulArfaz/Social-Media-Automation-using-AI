import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import socialmedia from "../assets/socialmedia.jpg";
import { useAuth } from '../context/AuthContext.jsx';
import api from "../api/axios.js";
import { toast } from 'sonner'

export default function Login() {
  const [loginState, setLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login, user} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`/api/users/${loginState ? 'login' : 'register'}`,
        {name, email,password})

       const userData = response.data.data.user;

      login(userData)
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong during authentication'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
   if(user){
    navigate('/dashboard')
   }
  },[user])

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${socialmedia})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-md z-10 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10 text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase text-white mb-2">
            {loginState ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            {loginState
              ? "Sign in with email address"
              : "Create your account to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {!loginState && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
                Name
              </label>
              <div className="relative">
                <User2Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:bg-slate-950 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl outline-none transition-all duration-200 text-white placeholder:text-slate-500 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <MailIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Yourname@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:bg-slate-950 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl outline-none transition-all duration-200 text-white placeholder:text-slate-500 font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <LockIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:bg-slate-950 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl outline-none transition-all duration-200 text-white placeholder:text-slate-500 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-4 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-red-600/30 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>{loginState ? "Sign In" : "Sign Up"}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-950">
            Or continue with
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => alert("Google login clicked")}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => alert("Facebook login clicked")}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Facebook
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-300">
          {loginState ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setLoginState(false)}
                className="text-red-400 font-bold hover:text-red-300 transition-colors cursor-pointer ml-1"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setLoginState(true)}
                className="text-red-400 font-bold hover:text-red-300 transition-colors cursor-pointer ml-1"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500 font-medium">
          By registering you agree to our Terms and Conditions
        </p>
      </div>
    </div>
  );
}
