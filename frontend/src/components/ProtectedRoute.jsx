import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until auth state loads
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-zinc-900 animate-spin" />
        <p className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
          Authenticating...
        </p>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;