import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineKey } from "react-icons/hi";
import { Button } from "@/components/ui/button";

export default function Playground() {
  const [connected, setConnected] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [kyberCiphertext, setKyberCiphertext] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);

  // Step 3 & 4 states
  const [message, setMessage] = useState("Hello");
  const [mixing, setMixing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [encryptedMessage, setEncryptedMessage] = useState(null);
  const [iv, setIv] = useState(null);
// Add these state variables with the existing ones
const [signing, setSigning] = useState(false);
const [signatureProcessing, setSignatureProcessing] = useState(false);
const [signature, setSignature] = useState(null);

// Add this function with the existing functions
// Step 5: Dilithium Signing
async function handleSignMessage() {
  if (!message) {
    alert("Please enter a message to sign.");
    return;
  }
  
  setSignature(null);
  setSigning(true);
  setSignatureProcessing(false);

  // Animation: Move message and private key to center
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Signing stage
  await new Promise(resolve => setTimeout(resolve, 900));
  setSigning(false);

  // Signature creation
  setSignatureProcessing(true);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Produce mocked signature
  setSignature(mockHex("dilithium-signature", 32));
  setSignatureProcessing(false);
}
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

  function mockHex(label, length = 16) {
    const random = () => Math.floor(Math.random() * 16).toString(16).toUpperCase();
    return `${label}-0x` + Array.from({ length }).map(random).join("");
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

  // Step 3 & 4: Message mixing and AES-GCM encryption
  async function handleMixAndEncrypt() {
    if (!sharedSecret) {
      alert("First complete key exchange to get shared secret.");
      return;
    }
    
    // Reset previous outputs
    setEncryptedMessage(null);
    setIv(null);
    setMixing(true);
    setProcessing(false);

    // Animation: Move message and shared secret to center
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Mixing stage
    await new Promise(resolve => setTimeout(resolve, 900));
    setMixing(false);

    // Step 4: AES-GCM processing
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Produce mocked encrypted message and IV
    setIv(mockHex("iv", 8));
    setEncryptedMessage(mockHex("enc-msg", 20));
    setProcessing(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 p-8 flex flex-col gap-8">
      <header className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-3xl font-bold tracking-tight">Post-Quantum Chat — Visual Playground</h1>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Step 1 & 2: Key Exchange */}
        <div className="w-full max-w-6xl relative mb-14">
            {/* <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-2xl"> */}
          <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100">Step 1 & 2: Key Exchange</h2>
              <p className="text-slate-300 mt-2">Decaptulation of the public key to shared secreat and cipher text</p>
            </div>
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
                    className="absolute right-[14.5%] top-1/2 -translate-y-1/2"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: "-344%", opacity: 1 }}
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
          {/* </div> */}
        </div>
        </div>

        {/* Step 3 & 4: Message Mixing & AES-GCM Encryption */}
        <div className="w-full max-w-4xl mt-16">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100">Step 3 & 4: Message Encryption</h2>
              <p className="text-slate-300 mt-2">Mix message with shared secret and encrypt using AES-GCM</p>
            </div>

            {/* Input Section */}
            <div className="flex gap-4 items-center justify-center mb-8">
              <div className="flex-1 max-w-md">
                <label className="block text-sm text-slate-400 mb-2">Enter Message to Encrypt:</label>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700 px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Type your message here..."
                />
              </div>
              <Button 
                onClick={handleMixAndEncrypt} 
                disabled={!sharedSecret || mixing || processing}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                {mixing ? "Mixing..." : processing ? "Encrypting..." : "Mix & Encrypt (AES-GCM)"}
              </Button>
            </div>

            {/* Animation Section */}
            <div className="relative h-48 flex items-center justify-center">
              {/* Connection Line */}
              <div className="absolute left-[10%] right-[10%] top-1/2 h-0.5 bg-slate-700/40 rounded" />

              {/* Shared Secret (Left) */}
              <motion.div
                className="absolute left-[12%] top-1/2 -translate-y-1/2"
                animate={mixing ? { x: 180, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">Shared Secret</div>
                  <div className="px-4 py-3 bg-emerald-700/20 border border-emerald-500/30 rounded-lg font-mono text-sm">
                    {sharedSecret ?? "-- waiting --"}
                  </div>
                </div>
              </motion.div>

              {/* Message (Right) */}
              <motion.div
                className="absolute right-[12%] top-1/2 -translate-y-1/2"
                animate={mixing ? { x: -180, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">Plaintext Message</div>
                  <div className="px-4 py-3 bg-sky-700/20 border border-sky-500/30 rounded-lg font-mono text-sm max-w-xs break-words">
                    {message}
                  </div>
                </div>
              </motion.div>

              {/* Mixing Vessel (Center) */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-48 h-20 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-slate-600 flex items-center justify-center"
                  animate={mixing ? { 
                    scale: [1, 1.08, 1],
                    rotate: [0, 1, -1, 0],
                    borderColor: ["#475569", "#0ea5e9", "#10b981", "#475569"]
                  } : processing ? {
                    scale: 1,
                    borderColor: "#f59e0b"
                  } : {
                    scale: 1,
                    borderColor: "#475569"
                  }}
                  transition={{ duration: mixing ? 1.6 : 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-sm text-slate-300 font-medium">Mixing Vessel</div>
                    <div className="text-xs text-slate-400 mt-1">AES-GCM Encryption</div>
                  </div>
                </motion.div>

                {/* Processing Animation */}
                <AnimatePresence>
                  {processing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-400/30 flex items-center justify-center animate-spin">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="1.5"></path>
                        </svg>
                      </div>
                      <span className="text-amber-300 text-sm font-medium">AES-GCM Processing...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Results */}
                {!processing && encryptedMessage && iv && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                  >
                    <div className="text-xs text-slate-400">Encryption Complete!</div>
                    <div className="flex gap-4 text-xs font-mono">
                      <div>
                        <span className="text-emerald-400">encrypted_message:</span>
                        <div className="text-slate-200 mt-1">{encryptedMessage}</div>
                      </div>
                      <div>
                        <span className="text-amber-400">iv:</span>
                        <div className="text-slate-200 mt-1">{iv}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Output Display */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-400 mb-2">Encrypted Message</div>
                <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${encryptedMessage ? 'border-emerald-500/40' : 'border-slate-700 opacity-40'}`}>
                  {encryptedMessage ?? "-- waiting for encryption --"}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Initialization Vector (IV)</div>
                <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${iv ? 'border-amber-500/40' : 'border-slate-700 opacity-40'}`}>
                  {iv ?? "-- waiting for encryption --"}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
              <p>
                <span className="text-emerald-400">Step 3:</span> Message and shared secret mix together → 
                <span className="text-amber-400"> Step 4:</span> AES-GCM encryption produces encrypted_message and IV
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: Dilithium Signing */}
        <div className="w-full max-w-4xl mt-16">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100">Step 5: Digital Signature (Dilithium)</h2>
              <p className="text-slate-300 mt-2">Sign the message with Dilithium private key to create digital signature</p>
            </div>

            {/* Signing Control */}
            <div className="flex gap-4 items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ready to Sign:</div>
                <div className="text-emerald-300 font-medium">Message + Dilithium Private Key</div>
              </div>
              <Button 
                onClick={handleSignMessage} 
                disabled={!message || signing || signatureProcessing}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                {signing ? "Signing..." : signatureProcessing ? "Creating Signature..." : "Sign Message (Dilithium)"}
              </Button>
            </div>

            {/* Signing Animation Section */}
            <div className="relative h-48 flex items-center justify-center">
              {/* Connection Line */}
              <div className="absolute left-[10%] right-[10%] top-1/2 h-0.5 bg-slate-700/40 rounded" />

              {/* Message (Left) */}
              <motion.div
                className="absolute left-[12%] top-1/2 -translate-y-1/2"
                animate={signing ? { x: 160, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">Original Message</div>
                  <div className="px-4 py-3 bg-sky-700/20 border border-sky-500/30 rounded-lg font-mono text-sm max-w-xs break-words">
                    {message}
                  </div>
                </div>
              </motion.div>

              {/* Dilithium Private Key (Right) */}
              <motion.div
                className="absolute right-[12%] top-1/2 -translate-y-1/2"
                animate={signing ? { x: -160, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-2">Dilithium Private Key</div>
                  <div className="px-4 py-3 bg-purple-700/20 border border-purple-500/30 rounded-lg font-mono text-sm">
                    {sender.dilithiumPrivate}
                  </div>
                </div>
              </motion.div>

              {/* Signing Vessel (Center) */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-48 h-20 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-slate-600 flex items-center justify-center"
                  animate={signing ? { 
                    scale: [1, 1.08, 1],
                    rotate: [0, -1, 1, 0],
                    borderColor: ["#475569", "#8b5cf6", "#a855f7", "#475569"]
                  } : signatureProcessing ? {
                    scale: 1,
                    borderColor: "#f59e0b"
                  } : {
                    scale: 1,
                    borderColor: "#475569"
                  }}
                  transition={{ duration: signing ? 1.6 : 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-sm text-slate-300 font-medium">Signing Vessel</div>
                    <div className="text-xs text-slate-400 mt-1">Dilithium Signature</div>
                  </div>
                </motion.div>

                {/* Signature Processing Animation */}
                <AnimatePresence>
                  {signatureProcessing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-400/30 flex items-center justify-center animate-spin">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="1.5"></path>
                        </svg>
                      </div>
                      <span className="text-amber-300 text-sm font-medium">Dilithium Signing...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Signature Results */}
                {!signatureProcessing && signature && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                  >
                    <div className="text-xs text-slate-400">Signature Created!</div>
                    <div className="text-xs font-mono">
                      <span className="text-purple-400">signature:</span>
                      <div className="text-slate-200 mt-1 max-w-xs break-words">{signature}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Output Display */}
            <div className="mt-8">
              <div className="text-sm text-slate-400 mb-2">Digital Signature</div>
              <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${signature ? 'border-purple-500/40' : 'border-slate-700 opacity-40'}`}>
                {signature ?? "-- waiting for signing --"}
              </div>
            </div>

            {/* Final Package Display */}
            {(encryptedMessage && iv && signature) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-slate-900/40 border border-emerald-500/30 rounded-xl"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-emerald-300">🎉 Complete Transmission Package Ready!</h3>
                  <p className="text-slate-400 text-sm mt-1">All components for secure transmission are generated</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-amber-400 mb-1">Kyber Ciphertext</div>
                    <div className="font-mono bg-slate-800/60 p-2 rounded">{kyberCiphertext}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 mb-1">Encrypted Message</div>
                    <div className="font-mono bg-slate-800/60 p-2 rounded">{encryptedMessage}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 mb-1">Digital Signature</div>
                    <div className="font-mono bg-slate-800/60 p-2 rounded break-all">{signature}</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <div className="text-amber-400 mb-1">Initialization Vector (IV)</div>
                  <div className="font-mono bg-slate-800/60 p-2 rounded inline-block">{iv}</div>
                </div>
              </motion.div>
            )}

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
              <p>
                <span className="text-sky-400">Step 5:</span> Message + Dilithium private key → 
                <span className="text-purple-400"> Digital Signature</span> created for message authentication
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto text-xs text-slate-500 text-center">
        Tip: Complete key exchange first, then enter your message and click "Mix & Encrypt (AES-GCM)".
      </footer>
    </div>
  );
}