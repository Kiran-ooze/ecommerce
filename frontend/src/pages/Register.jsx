import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import useAuth from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) {
      return "Name is required";
    }

    if (!formData.email) {
      return "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Enter a valid email address";
    }

    if (!formData.password) {
      return "Password is required";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-xs">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white mx-auto flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Create an account
          </h1>
          <p className="text-xs text-zinc-500">
            Join ShopEasy today to start shopping effortlessly
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-sm
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-sm
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="
                  w-full
                  bg-zinc-50
                  border
                  border-zinc-200
                  rounded-xl
                  px-3.5
                  py-2.5
                  pr-10
                  text-sm
                  text-zinc-900
                  placeholder:text-zinc-400
                  focus:outline-none
                  focus:bg-white
                  focus:border-zinc-900
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  hover:text-zinc-700
                  transition-colors
                "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="
                  w-full
                  bg-zinc-50
                  border
                  border-zinc-200
                  rounded-xl
                  px-3.5
                  py-2.5
                  pr-10
                  text-sm
                  text-zinc-900
                  placeholder:text-zinc-400
                  focus:outline-none
                  focus:bg-white
                  focus:border-zinc-900
                  transition-all
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  hover:text-zinc-700
                  transition-colors
                "
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-2
              bg-zinc-900
              hover:bg-zinc-800
              disabled:opacity-50
              text-white
              font-semibold
              text-sm
              py-2.5
              px-4
              rounded-xl
              shadow-xs
              transition-all
              duration-150
              active:scale-[0.98]
              inline-flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-6 text-xs text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-zinc-900 font-bold hover:underline underline-offset-2"
          >
            Log in here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;