import { useSelector } from "react-redux"
import { Navigate } from "react-router";





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
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-cyan-500/20"></div>
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
        </div>

        <p className="mt-6 text-xl font-semibold text-white animate-pulse">
          Loading...
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Please wait a moment
        </p>
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