import { useSelector } from "react-redux"
import { Navigate } from "react-router";
import { GiArtificialHive } from "react-icons/gi";



const Protected = ({children,publicOnly=false}) =>{
    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading);

     console.log("Protected Render:", {
        user,
        loading,
        publicOnly
    });


if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="flex flex-col items-center">

        {/* Animated Logo */}
        <div className="relative flex h-20 w-20 items-center justify-center">

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-black/10 blur-xl animate-pulse" />

          {/* Rotating Ring */}
          <div className="absolute inset-0 rounded-full border border-black/10" />

          <div
            className="absolute inset-1 rounded-full border-2 border-transparent
            border-t-black border-r-black/40 animate-spin"
          />

          {/* Logo */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-xl">
            <GiArtificialHive
              size={24}
              className="text-white animate-pulse"
            />
          </div>
        </div>

        {/* Text */}
        <div className="mt-7 text-center">
          <p className="text-sm font-semibold tracking-wide text-black">
            Preparing your dashboard
          </p>

          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-black animate-bounce" />
            <span
              className="h-1.5 w-1.5 rounded-full bg-black animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-black animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

  if (publicOnly) {
    return user ? <Navigate to="/dashboard" replace /> : children;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default Protected;