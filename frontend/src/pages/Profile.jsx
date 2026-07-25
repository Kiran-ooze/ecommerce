import { useEffect, useState } from "react";
import { User, CheckCircle2, AlertCircle, Save, Loader2, Shield } from "lucide-react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get("/auth/profile");

      setProfile({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      await API.put("/auth/profile", profile);

      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-2xs space-y-4 animate-pulse">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 mx-auto"></div>
          <div className="h-6 bg-zinc-100 rounded-lg w-1/2 mx-auto"></div>
          <div className="space-y-3 pt-4">
            <div className="h-10 bg-zinc-100 rounded-xl w-full"></div>
            <div className="h-10 bg-zinc-100 rounded-xl w-full"></div>
            <div className="h-10 bg-zinc-100 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        
        {/* Profile Avatar Header */}
        <div className="text-center space-y-3 pb-2 border-b border-zinc-100">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-xs border border-zinc-800">
            {profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Account Settings
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Manage your personal information and account preferences
            </p>
          </div>
        </div>

        {/* Success Alert Banner */}
        {message && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Editable Name Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
              required
            />
          </div>

          {/* Disabled Email Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Email Address
              </label>
              <span className="text-[10px] text-zinc-400 font-medium">Read Only</span>
            </div>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="
                w-full
                bg-zinc-100/70
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-500
                cursor-not-allowed
              "
            />
          </div>

          {/* Disabled Role Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Account Role
              </label>
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <input
              type="text"
              value={user?.role || "user"}
              disabled
              className="
                w-full
                bg-zinc-100/70
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                font-semibold
                text-zinc-700
                capitalize
                cursor-not-allowed
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="
              w-full
              mt-2
              bg-zinc-900
              hover:bg-zinc-800
              disabled:opacity-50
              text-white
              font-semibold
              text-xs
              py-3
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
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Profile
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Profile;