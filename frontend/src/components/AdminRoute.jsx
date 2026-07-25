import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-zinc-900 animate-spin" />
        <p className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;