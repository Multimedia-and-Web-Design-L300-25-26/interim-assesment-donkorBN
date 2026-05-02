import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

const Profile = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center text-white">Loading...</div>;

  if (!user) return <Navigate to="/signin" />;

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-[#16181C] border border-[#23262B] rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#0052FF] flex items-center justify-center text-3xl font-bold text-white mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-[#8A919E]">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#1E2025] rounded-xl border border-[#2C2F36]">
              <p className="text-xs font-semibold text-[#5B616E] uppercase tracking-wider mb-1">Account Status</p>
              <p className="text-white font-medium">Verified</p>
            </div>
            <div className="p-4 bg-[#1E2025] rounded-xl border border-[#2C2F36]">
              <p className="text-xs font-semibold text-[#5B616E] uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full mt-8 h-14 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
