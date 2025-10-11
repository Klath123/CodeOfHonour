import { useChatStore } from "../context/useChatStore";
import { useState, useEffect } from "react";
import axios from "axios";
import { Users, MessageCircle, Shield, Search, X, LogOut, Cpu, Lock, Network } from "lucide-react";

export default function ChatSidebar({ onSelectUser }) {
  const setPeer = useChatStore((state) => state.setPeer);
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  function base64ToUint8Array(base64) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  }

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get("/api/v1/user/connections", { withCredentials: true });
        setConnections(res.data); // expects [{ user_id, username }]
      } catch (err) {
        console.error("Failed to fetch connections", err);
      }
    };
    fetchConnections();
  }, []);

  const handleSelectUser = async (user) => {
    try {
      const userWithKeys = {
        ...user,
      };
      
      setSelectedUserId(user.user_id);
      setPeer(userWithKeys);
      onSelectUser(userWithKeys);
    } catch (err) {
      console.error("Failed to fetch user's keys", err);
    }
  };

  const filteredConnections = connections.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-green-500/20 h-full flex flex-col relative overflow-hidden shadow-2xl">
      {/* Cyber background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-500/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Scanning line effect */}
        {/* <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan shadow-lg shadow-green-400/50"></div> */}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-green-500/20 bg-white/5 backdrop-blur-lg">
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-green-500/20">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent text-glow">
              Secure Channels
            </h2>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-green-300 group-focus-within:text-emerald-300 transition-colors" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search secure connections..."
            className="w-full pl-9 pr-9 py-2.5 bg-white/10 backdrop-blur-md border border-green-500/30 rounded-xl text-white placeholder-green-300/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 shadow-lg"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-300/60 hover:text-emerald-300 transition-all duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Connections Count */}
      <div className="relative z-10 px-4 py-3 border-b border-green-500/20 bg-white/5 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-green-300">
            <Network className="w-4 h-4" />
            <span className="font-medium bg-white/5 px-2 py-1 rounded-lg border border-green-500/20">
              {filteredConnections.length} active connection{filteredConnections.length !== 1 ? 's' : ''}
            </span>
          </div>
          {searchTerm && (
            <span className="text-emerald-300 text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              filtering: "{searchTerm}"
            </span>
          )}
        </div>
      </div>

      {/* Connections List */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        {filteredConnections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            {searchTerm ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/30">
                  <Search className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-300 text-sm mb-2 font-medium">No secure channels found</p>
                <p className="text-white/60 text-xs">
                  No active connections match your search
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/30">
                  <Cpu className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-300 text-sm mb-2 font-medium">Secure network ready</p>
                <p className="text-white/60 text-xs">
                  Establish connections to begin encrypted communication
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="p-3">
            {filteredConnections.map((user, index) => (
              <div
                key={user.user_id}
                className={`group cursor-pointer p-3 rounded-xl transition-all duration-300 mb-2 backdrop-blur-md border-2 ${
                  selectedUserId === user.user_id
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-lg shadow-green-500/20'
                    : 'bg-white/5 border-green-500/20 hover:bg-white/10 hover:border-green-400/40 hover:shadow-md'
                }`}
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with cyber effect */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base transition-all duration-300 shadow-lg relative overflow-hidden ${
                      selectedUserId === user.user_id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/50'
                        : 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 group-hover:from-green-500/90 group-hover:to-emerald-500/90'
                    }`}>
                      {user.username.charAt(0).toUpperCase()}
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
                    </div>
                    {/* Secure Connection Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 border-2 border-white/20 rounded-full shadow-lg animate-pulse">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold truncate text-sm transition-all duration-300 ${
                        selectedUserId === user.user_id 
                          ? 'text-white text-glow' 
                          : 'text-white/90 group-hover:text-white'
                      }`}>
                        {user.username}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-300 font-mono">
                          live
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-400 animate-pulse" />
                      <p className="text-xs text-white/70 truncate font-medium">
                        AES-256 encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 p-3 border-t border-green-500/20 bg-white/5 backdrop-blur-lg">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-green-300 bg-white/5 px-2 py-1.5 rounded-lg border border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="font-bold">SECURE NETWORK</span>
          </div>
          <button className="flex items-center gap-1.5 text-white/70 hover:text-green-300 transition-all duration-200 hover:bg-white/10 px-2 py-1.5 rounded-lg border border-transparent hover:border-green-500/30 group">
            <LogOut className="w-3 h-3 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Disconnect</span>
          </button>
        </div>
      </div>

      {/* Custom cyber scrollbar and animations */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(400px);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        /* Cyber scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 2px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #34d399, #10b981);
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}