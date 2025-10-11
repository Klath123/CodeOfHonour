import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineKey } from "react-icons/hi";
import { Button } from "@/components/ui/button";

// Playground.jsx
// Step 1 & 2 visualization using Tailwind CSS + shadcn/ui

export default function Playground() {
  const [connected, setConnected] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [kyberCiphertext, setKyberCiphertext] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);

  const sender = {
    name: "Sender",
    kyberPublic: "kyb-pub-0xA1B2...F3",
    dilithiumPublic: "dil-pub-0xC4D5...E6",
    kyberPrivate: "kyb-priv-0x11AA...22",
    dilithiumPrivate: "dil-priv-0x3344...55",
  };

  const receiver = {
    name: "Receiver",
    kyberPublic: "kyb-pub-0x9F8E...01",
    dilithiumPublic: "dil-pub-0x7B6C...2A",
    kyberPrivate: "kyb-priv-0x99EE...AA",
    dilithiumPrivate: "dil-priv-0x1234...56",
  };

  function mockHex(label) {
    const random = () => Math.floor(Math.random() * 16).toString(16).toUpperCase();
    return `${label}-0x` + Array.from({ length: 16 }).map(random).join("");
  }

  function handleConnect() {
    if (animating) return;
    setConnected(false);
    setKyberCiphertext(null);
    setSharedSecret(null);
    setAnimating(true);

    setTimeout(() => setConnected(true), 900);
    setTimeout(() => setKyberCiphertext(mockHex("kyber-ciphertext")), 1700);
    setTimeout(() => {
      setSharedSecret(mockHex("shared-secret"));
      setAnimating(false);
    }, 2400);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 p-8 flex flex-col gap-8">
      <header className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight">Post-Quantum Chat — Visual Playground</h1>
        <p className="mt-2 text-slate-300">Step 1 & 2: Key cards and animated Kyber key exchange (mocked values for visualization)</p>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72">
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-slate-700/40">
                  <HiOutlineKey size={28} />
                </div>
                <div>
                  <div className="text-lg font-semibold">{sender.name}</div>
                  <div className="text-xs text-slate-400">(encryption + signing)</div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <div className="text-slate-400">Kyber Public</div>
                  <div className="font-mono text-xs mt-1 break-words">{sender.kyberPublic}</div>
                </div>
                <div>
                  <div className="text-slate-400">Kyber Private</div>
                  <div className="font-mono text-xs mt-1">{sender.kyberPrivate}</div>
                </div>
                <div>
                  <div className="text-slate-400">Dilithium Private</div>
                  <div className="font-mono text-xs mt-1">{sender.dilithiumPrivate}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72">
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl text-right">
              <div className="flex items-center gap-3 justify-end">
                <div>
                  <div className="text-lg font-semibold">{receiver.name}</div>
                  <div className="text-xs text-slate-400">(decryption + verification)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/40">
                  <HiOutlineKey size={28} />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <div className="text-slate-400">Kyber Public</div>
                  <div className="font-mono text-xs mt-1">{receiver.kyberPublic}</div>
                </div>
                <div>
                  <div className="text-slate-400">Kyber Private</div>
                  <div className="font-mono text-xs mt-1">{receiver.kyberPrivate}</div>
                </div>
                <div>
                  <div className="text-slate-400">Dilithium Public</div>
                  <div className="font-mono text-xs mt-1">{receiver.dilithiumPublic}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="mb-6 flex items-center gap-4">
              <Button
                onClick={handleConnect}
                className={`${animating ? 'bg-amber-500/80' : 'bg-emerald-500'} px-5 py-2 rounded-full font-medium shadow-md transition-transform active:scale-95`}
              >
                {animating ? "Connecting..." : "Connect & Exchange Public Keys"}
              </Button>

              <div className="text-sm text-slate-400">{connected ? "Connected" : "Not connected"}</div>
            </div>

            <div className="relative w-full h-40 flex items-center justify-center">
              <div className="absolute left-[14.5%] right-[14.5%] h-0.5 bg-slate-700/40 rounded" />

              <AnimatePresence>
                {animating && (
                  <motion.div
                    className="absolute left-[14.5%] top-1/2 -translate-y-1/2"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: "74%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-amber-400/20 border border-amber-300/30">
                        <HiOutlineKey size={22} className="text-amber-300" />
                      </div>
                      <div className="text-xs font-mono text-amber-200">kyber-public</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {animating && (
                  <motion.div
                    className="absolute right-[14.5%] top-1/2 -translate-y-1/2"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: "-74%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0, delay: 0.35, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-mono text-sky-200">kyber-public</div>
                      <div className="p-2 rounded-full bg-sky-400/10 border border-sky-300/20">
                        <HiOutlineKey size={18} className="text-sky-300" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%]">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex gap-4 justify-center items-center">
                  <div className="w-1/3 text-center">
                    <div className="text-xs text-slate-400">Kyber Ciphertext</div>
                    <div className={`mt-2 font-mono text-sm p-2 rounded bg-slate-900/60 ${kyberCiphertext ? 'border border-amber-400/40' : 'opacity-40'}`}>
                      {kyberCiphertext ?? "-- waiting --"}
                    </div>
                  </div>

                  <div className="w-1/3 text-center">
                    <div className="text-xs text-slate-400">Shared Secret</div>
                    <div className={`mt-2 font-mono text-sm p-2 rounded bg-slate-900/60 ${sharedSecret ? 'border border-emerald-400/40' : 'opacity-40'}`}>
                      {sharedSecret ?? "-- waiting --"}
                    </div>
                  </div>

                  <div className="w-1/3 text-center">
                    <div className="text-xs text-slate-400">Status</div>
                    <div className="mt-2 text-sm font-medium">
                      {animating ? (
                        <span className="text-amber-300">Performing encapsulation...</span>
                      ) : connected ? (
                        <span className="text-emerald-300">Keys exchanged</span>
                      ) : (
                        <span className="text-slate-400">idle</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center text-xs text-slate-400">(Mock values shown for clarity)</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto text-xs text-slate-500 text-center">
        Tip: Click <span className="font-medium text-slate-200">Connect & Exchange Public Keys</span> to start the animation.
      </footer>
    </div>
  );
}