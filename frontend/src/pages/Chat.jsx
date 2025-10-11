import { useState, useEffect } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import WebSocketChatBox from '../components/WebSocketChatBox';
import PlayGround from '@/components/PlayGround';
import { useAuthStore } from '../context/useAuthStore';
import { useChatStore } from '../context/useChatStore';
import { MessageCircle, Sparkles, Users, Shield, Lock, Cpu } from 'lucide-react';

export default function ChatPage() {
  const { user } = useAuthStore();
  const { peer } = useChatStore(); // default peer from invite code connection
  const [selectedUser, setSelectedUser] = useState(null);

  // Pre-select the user connected via invite code if present
  useEffect(() => {
    if (peer && !selectedUser) {
      setSelectedUser(peer);
    }
  }, [peer, selectedUser]);

  console.log("Current peer from store:", peer);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Initializing secure session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30"></div>

      {/* Main content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar with glass effect */}
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-green-500/20 shadow-2xl">
          <ChatSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full">
          {selectedUser ? (
            <div className="h-full bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-tl-2xl m-4 overflow-hidden shadow-2xl">
              <WebSocketChatBox peer={selectedUser} />
              {/* <PlayGround /> */}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md mx-auto">
                {/* Floating icons animation */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-20 h-20 text-green-400/20 animate-pulse" />
                  </div>
                  <div className="absolute top-0 left-8 animate-float">
                    <Lock className="w-8 h-8 text-green-300/60" />
                  </div>
                  <div className="absolute bottom-0 right-8 animate-float-delayed">
                    <Cpu className="w-8 h-8 text-emerald-300/60" />
                  </div>
                  <div className="absolute top-8 right-0 animate-float-delayed-2">
                    <Sparkles className="w-6 h-6 text-teal-300/60" />
                  </div>
                </div>

                {/* Welcome message */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20 shadow-2xl relative overflow-hidden">
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-400/30 to-green-500/0 animate-border-glow"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                      Secure Channel Active
                    </h2>
                    <p className="text-white/80 text-lg mb-6 leading-relaxed font-light">
                      Connection encrypted and secured. Select a contact to establish a private communication channel.
                    </p>
                    
                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center text-white/80 bg-white/5 rounded-xl p-4 border border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse shadow-lg shadow-green-400/50"></div>
                        <span className="font-medium">Military-grade encryption</span>
                      </div>
                      <div className="flex items-center text-white/80 bg-white/5 rounded-xl p-4 border border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full mr-4 animate-pulse shadow-lg shadow-emerald-400/50 delay-200"></div>
                        <span className="font-medium">Zero-knowledge protocol</span>
                      </div>
                      <div className="flex items-center text-white/80 bg-white/5 rounded-xl p-4 border border-green-500/10 hover:border-green-500/30 transition-all duration-300">
                        <div className="w-3 h-3 bg-teal-400 rounded-full mr-4 animate-pulse shadow-lg shadow-teal-400/50 delay-400"></div>
                        <span className="font-medium">Real-time secure messaging</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="mt-8 flex justify-center items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-green-300 text-sm font-medium">SYSTEM ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50 delay-300"></div>
                    <span className="text-emerald-300 text-sm font-medium">ENCRYPTION ACTIVE</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="mt-8 flex justify-center space-x-3">
                  <div className="w-3 h-3 bg-green-400/50 rounded-full animate-pulse shadow-lg"></div>
                  <div className="w-3 h-3 bg-emerald-400/50 rounded-full animate-pulse shadow-lg delay-200"></div>
                  <div className="w-3 h-3 bg-teal-400/50 rounded-full animate-pulse shadow-lg delay-400"></div>
                  <div className="w-3 h-3 bg-green-400/50 rounded-full animate-pulse shadow-lg delay-600"></div>
                  <div className="w-3 h-3 bg-emerald-400/50 rounded-full animate-pulse shadow-lg delay-800"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-8px) translateX(5px);
          }
        }

        @keyframes border-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 2s;
        }

        .animate-float-delayed-2 {
          animation: float-delayed-2 5s ease-in-out infinite 1s;
        }

        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }

        /* Cyber scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #34d399, #10b981);
        }

        /* Text glow effect */
        .text-glow {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
}