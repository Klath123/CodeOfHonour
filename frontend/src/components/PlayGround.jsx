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
// Add these state variables with the existing ones
const [transmitting, setTransmitting] = useState(false);
const [transmitted, setTransmitted] = useState(false);
// Add these state variables with the existing ones
const [decapsulating, setDecapsulating] = useState(false);
const [decryptedMessage, setDecryptedMessage] = useState(null);
const [verifying, setVerifying] = useState(false);
const [verificationResult, setVerificationResult] = useState(null);

// Add these functions with the existing functions
// Step 7 & 8: Decapsulation
async function handleDecapsulate() {
  if (!kyberCiphertext) {
    alert("No ciphertext received for decapsulation.");
    return;
  }
  
  setDecapsulating(true);
  setSharedSecret(null);

  // Animation: Move ciphertext and private key to center
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Decapsulation stage
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Produce shared secret via decapsulation
  setSharedSecret(mockHex("shared-secret-recovered", 16));
  setDecapsulating(false);
}

// Step 9: AES-GCM Decryption
async function handleDecryptMessage() {
  if (!sharedSecret || !encryptedMessage || !iv) {
    alert("Need shared secret, encrypted message, and IV for decryption.");
    return;
  }
  
  setDecryptedMessage(null);
  setProcessing(true);

  // Animation: Move shared secret, encrypted message, and IV to center
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Decryption processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Produce decrypted message
  setDecryptedMessage(message); // In real scenario, this would be actual decryption
  setProcessing(false);
}

// Step 10: Signature Verification
async function handleVerifySignature() {
  if (!decryptedMessage || !signature) {
    alert("Need decrypted message and signature for verification.");
    return;
  }
  
  setVerifying(true);
  setVerificationResult(null);

  // Animation: Move message, signature, and public key to center
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Verification processing
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Mock verification result (always true in this demo)
  setVerificationResult(true);
  setVerifying(false);
}
// Add this function with the existing functions
// Step 6: Transmission
async function handleTransmit() {
  if (!kyberCiphertext || !encryptedMessage || !iv || !signature) {
    alert("Please complete all previous steps first.");
    return;
  }
  
  setTransmitting(true);
  setTransmitted(false);

  // Simulate transmission time
  await new Promise(resolve => setTimeout(resolve, 3000));

  setTransmitting(false);
  setTransmitted(true);
}

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
    // <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 p-8 flex flex-col gap-8">
    <div className="min-h-screen bg-black text-slate-100 p-8 flex flex-col gap-8">
      <header className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-3xl font-bold tracking-tight">Post-Quantum Chat — Visual Playground</h1>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Step 1 & 2: Key Exchange */}
        <div className="w-full max-w-6xl relative mb-14">
            {/* <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-8 shadow-2xl"> */}
          <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100">Step 1 & 2: Key Exchange</h2>
              <p className="text-slate-300 mt-2">Decaptulation of the public key to shared secreat and cipher text</p>
            </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72">
            <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
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
            <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl text-right">
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
                    animate={{ x: "-300%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0, delay: 0.35, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2 bg-slate-700 backdrop-blur-md p-2 rounded-lg border border-slate-600 shadow-lg">
                      <div className="text-xs font-mono text-sky-200">kyber-public</div>
                      <div className="p-2 rounded-full bg-sky-900 border border-sky-300">
                        <HiOutlineKey size={18} className="text-sky-300" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%]">
                <div className="bg-slate-800/50 border border-[#00ff99] rounded-xl p-4 flex gap-4 justify-center items-center">
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
          <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
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
                  className="w-full bg-slate-900/60 border border-[#00ff99] px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${encryptedMessage ? 'border-emerald-500/40' : 'border-[#00ff99] opacity-40'}`}>
                  {encryptedMessage ?? "-- waiting for encryption --"}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">Initialization Vector (IV)</div>
                <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${iv ? 'border-amber-500/40' : 'border-[#00ff99] opacity-40'}`}>
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
          <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
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
              <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${signature ? 'border-purple-500/40' : 'border-[#00ff99] opacity-40'}`}>
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

        {/* Step 6: Transmission to Receiver */}
        <div className="w-full max-w-4xl mt-16">
          <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-100">Step 6: Secure Transmission</h2>
              <p className="text-slate-300 mt-2">Send encrypted package to receiver through secure channel</p>
            </div>

            {/* Transmission Control */}
            <div className="flex gap-4 items-center justify-center mb-8">
            <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ready to Transmit:</div>
                <div className="text-emerald-300 font-medium">All 4 Components Generated</div>
            </div>
            <Button 
                onClick={handleTransmit} 
                disabled={!kyberCiphertext || !encryptedMessage || !iv || !signature || transmitting}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {transmitting ? "Transmitting..." : "Transmit Package"}
            </Button>
            </div>

            {/* Transmission Animation Section */}
            <div className="relative min-h-96 flex flex-col items-center justify-between py-8">
            {/* Sender Section */}
            <div className="w-full max-w-2xl mb-6">
                <div className="flex items-center justify-center gap-8 mb-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                    <HiOutlineKey size={24} />
                    </div>
                    <div className="text-lg font-semibold text-blue-400">Sender</div>
                </div>
                </div>

                {/* Package Components Display */}
                <div className="bg-slate-800/40 border border-slate-600 rounded-xl p-4">
                <div className="text-center text-sm text-slate-300 mb-3">Transmission Package</div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Kyber Ciphertext */}
                    <motion.div
                    className="text-center"
                    animate={transmitting ? { opacity: 0.6, scale: 0.95 } : { opacity: 1, scale: 1 }}
                    >
                    <div className="text-xs text-amber-400 mb-2 font-semibold">Kyber Ciphertext</div>
                    <div className="px-3 py-2 bg-amber-700/20 border border-amber-500/30 rounded-lg font-mono text-xs min-h-12 flex items-center justify-center">
                        {kyberCiphertext ?? "-- waiting --"}
                    </div>
                    </motion.div>

                    {/* Encrypted Message */}
                    <motion.div
                    className="text-center"
                    animate={transmitting ? { opacity: 0.6, scale: 0.95 } : { opacity: 1, scale: 1 }}
                    >
                    <div className="text-xs text-emerald-400 mb-2 font-semibold">Encrypted Message</div>
                    <div className="px-3 py-2 bg-emerald-700/20 border border-emerald-500/30 rounded-lg font-mono text-xs min-h-12 flex items-center justify-center">
                        {encryptedMessage ?? "-- waiting --"}
                    </div>
                    </motion.div>

                    {/* IV */}
                    <motion.div
                    className="text-center"
                    animate={transmitting ? { opacity: 0.6, scale: 0.95 } : { opacity: 1, scale: 1 }}
                    >
                    <div className="text-xs text-amber-400 mb-2 font-semibold">IV</div>
                    <div className="px-3 py-2 bg-amber-700/20 border border-amber-500/30 rounded-lg font-mono text-xs min-h-12 flex items-center justify-center">
                        {iv ?? "-- waiting --"}
                    </div>
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                    className="text-center"
                    animate={transmitting ? { opacity: 0.6, scale: 0.95 } : { opacity: 1, scale: 1 }}
                    >
                    <div className="text-xs text-purple-400 mb-2 font-semibold">Signature</div>
                    <div className="px-3 py-2 bg-purple-700/20 border border-purple-500/30 rounded-lg font-mono text-xs min-h-12 flex items-center justify-center break-all">
                        {signature ?? "-- waiting --"}
                    </div>
                    </motion.div>
                </div>
                </div>
            </div>

            {/* Transmission Path & Animations */}
            <div className="relative w-full max-w-md flex-1 flex flex-col items-center justify-center my-6">
                {/* Transmission Line */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-green-500 rounded-full shadow-lg"></div>
                
                {/* Transmission Animations */}
                <div className="relative w-full h-48 flex items-center justify-center">
                <AnimatePresence>
                    {transmitting && (
                    <>
                        {/* Kyber Ciphertext Transmission */}
                        <motion.div
                        key="kyber-transmit"
                        className="absolute"
                        initial={{ top: "0%", opacity: 0, scale: 0.8 }}
                        animate={{ top: "80%", opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.1 }}
                        >
                        <div className="flex items-center gap-2 bg-amber-500/30 px-4 py-2 rounded-full border-2 border-amber-400/50 shadow-lg backdrop-blur-sm">
                            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-amber-200">kyber_ciphertext</span>
                        </div>
                        </motion.div>

                        {/* Encrypted Message Transmission */}
                        <motion.div
                        key="encrypted-transmit"
                        className="absolute"
                        initial={{ top: "0%", opacity: 0, scale: 0.8 }}
                        animate={{ top: "80%", opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                        >
                        <div className="flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-full border-2 border-emerald-400/50 shadow-lg backdrop-blur-sm">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-emerald-200">encrypted_message</span>
                        </div>
                        </motion.div>

                        {/* IV Transmission */}
                        <motion.div
                        key="iv-transmit"
                        className="absolute"
                        initial={{ top: "0%", opacity: 0, scale: 0.8 }}
                        animate={{ top: "80%", opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        >
                        <div className="flex items-center gap-2 bg-amber-500/30 px-4 py-2 rounded-full border-2 border-amber-400/50 shadow-lg backdrop-blur-sm">
                            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-amber-200">iv</span>
                        </div>
                        </motion.div>

                        {/* Signature Transmission */}
                        <motion.div
                        key="signature-transmit"
                        className="absolute"
                        initial={{ top: "0%", opacity: 0, scale: 0.8 }}
                        animate={{ top: "80%", opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 1.0 }}
                        >
                        <div className="flex items-center gap-2 bg-purple-500/30 px-4 py-2 rounded-full border-2 border-purple-400/50 shadow-lg backdrop-blur-sm">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-purple-200">signature</span>
                        </div>
                        </motion.div>
                    </>
                    )}
                </AnimatePresence>

                {/* Transmission Status */}
                <AnimatePresence>
                    {transmitting && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                    >
                        <div className="flex items-center gap-3 bg-indigo-600/20 px-4 py-3 rounded-xl border border-indigo-400/30 backdrop-blur-sm">
                        <div className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse"></div>
                        <span className="text-indigo-200 font-medium">Secure transmission in progress...</span>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>

            {/* Receiver Section */}
            <div className="w-full max-w-2xl mt-6">
                <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                    <HiOutlineKey size={24} />
                    </div>
                    <div className="text-lg font-semibold text-green-400">Receiver</div>
                </div>
                </div>

                {/* Received Package Display */}
                <AnimatePresence>
                {transmitted && (
                    <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mt-4"
                    >
                    <div className="bg-green-900/30 border-2 border-green-500/40 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                        <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-3 mx-auto">
                            <span className="text-xl">✓</span>
                        </div>
                        <h4 className="text-green-400 font-bold text-lg mb-2">📦 Package Received!</h4>
                        <p className="text-green-300 text-sm">All components successfully delivered and verified</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-amber-300">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>Kyber Ciphertext</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-300">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span>Encrypted Message</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-300">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>IV</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-300">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span>Digital Signature</span>
                        </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-800/20 rounded-lg border border-green-600/30">
                        <div className="text-center text-green-300 text-xs">
                            Ready for decryption and verification
                        </div>
                        </div>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Waiting for Transmission */}
                {!transmitted && (
                <div className="mt-4 bg-slate-800/40 border border-slate-600 rounded-xl p-6 text-center">
                    <div className="text-slate-400 text-sm">Waiting for secure transmission...</div>
                    <div className="text-slate-500 text-xs mt-2">Package will appear here after transmission</div>
                </div>
                )}
            </div>
            </div>

            {/* Transmission Summary */}
            <div className="mt-8 p-4 bg-slate-900/40 rounded-lg">
              <div className="text-center text-sm text-slate-300 mb-3">
                Transmission Package Contains:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="text-center">
                  <div className="text-amber-400 font-semibold">Kyber Ciphertext</div>
                  <div className="text-slate-400 mt-1">For key exchange</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-400 font-semibold">Encrypted Message</div>
                  <div className="text-slate-400 mt-1">AES-GCM encrypted</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 font-semibold">IV</div>
                  <div className="text-slate-400 mt-1">Initialization vector</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-semibold">Signature</div>
                  <div className="text-slate-400 mt-1">Dilithium signed</div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
              <p>
                <span className="text-indigo-400">Step 6:</span> All 4 components transmitted securely → 
                <span className="text-green-400"> Ready for decryption</span>
              </p>
            </div>
          </div>
        </div>

        {/* Step 7 & 8: Decapsulation */}
        <div className="w-full max-w-4xl mt-16">
        <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Step 7 & 8: Key Decapsulation</h2>
            <p className="text-slate-300 mt-2">Recover shared secret using Kyber ciphertext and recipient's private key</p>
            </div>

            {/* Decapsulation Control */}
            <div className="flex gap-4 items-center justify-center mb-8">
            <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ready for Decapsulation:</div>
                <div className="text-emerald-300 font-medium">Ciphertext + Private Key → Shared Secret</div>
            </div>
            <Button 
                onClick={handleDecapsulate} 
                disabled={!kyberCiphertext || decapsulating}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {decapsulating ? "Decapsulating..." : "Decapsulate (Kyber)"}
            </Button>
            </div>

            {/* Decapsulation Animation Section */}
            <div className="relative h-48 flex items-center justify-center">
            {/* Connection Line */}
            <div className="absolute left-[10%] right-[10%] top-1/2 h-0.5 bg-slate-700/40 rounded" />

            {/* Kyber Ciphertext (Left) */}
            <motion.div
                className="absolute left-[12%] top-1/2 -translate-y-1/2"
                animate={decapsulating ? { x: 120, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            >
                <div className="text-center">
                <div className="text-xs text-slate-400 mb-2">Kyber Ciphertext</div>
                <div className="px-4 py-3 bg-amber-700/20 border border-amber-500/30 rounded-lg font-mono text-sm max-w-xs break-words">
                    {kyberCiphertext ?? "-- waiting --"}
                </div>
                </div>
            </motion.div>

            {/* Receiver Private Key (Right) */}
            <motion.div
                className="absolute right-[12%] top-1/2 -translate-y-1/2"
                animate={decapsulating ? { x: -120, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            >
                <div className="text-center">
                <div className="text-xs text-slate-400 mb-2">Receiver Private Key</div>
                <div className="px-4 py-3 bg-emerald-700/20 border border-emerald-500/30 rounded-lg font-mono text-sm">
                    {receiver.kyberPrivate}
                </div>
                </div>
            </motion.div>

            {/* Decapsulation Vessel (Center) */}
            <div className="flex flex-col items-center gap-4">
                <motion.div
                className="w-48 h-20 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-slate-600 flex items-center justify-center"
                animate={decapsulating ? { 
                    scale: [1, 1.08, 1],
                    rotate: [0, 1, -1, 0],
                    borderColor: ["#475569", "#f59e0b", "#10b981", "#475569"]
                } : {
                    scale: 1,
                    borderColor: "#475569"
                }}
                transition={{ duration: decapsulating ? 1.6 : 0.6 }}
                >
                <div className="text-center">
                    <div className="text-sm text-slate-300 font-medium">Decapsulation</div>
                    <div className="text-xs text-slate-400 mt-1">Kyber Decryption</div>
                </div>
                </motion.div>

                {/* Results */}
                {sharedSecret && !decapsulating && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <div className="text-xs text-slate-400">Shared Secret Recovered!</div>
                    <div className="text-xs font-mono">
                    <span className="text-emerald-400">shared_secret:</span>
                    <div className="text-slate-200 mt-1">{sharedSecret}</div>
                    </div>
                </motion.div>
                )}
            </div>
            </div>

            {/* Output Display */}
            <div className="mt-8">
            <div className="text-sm text-slate-400 mb-2">Recovered Shared Secret</div>
            <div className={`font-mono text-sm p-3 rounded-lg bg-slate-900/60 border ${sharedSecret ? 'border-emerald-500/40' : 'border-[#00ff99] opacity-40'}`}>
                {sharedSecret ?? "-- waiting for decapsulation --"}
            </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
            <p>
                <span className="text-amber-400">Step 7 & 8:</span> Kyber ciphertext + Receiver private key → 
                <span className="text-emerald-400"> Shared Secret</span> recovered via decapsulation
            </p>
            </div>
        </div>
        </div>

        {/* Step 9: AES-GCM Decryption */}
        <div className="w-full max-w-4xl mt-16">
        <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Step 9: Message Decryption</h2>
            <p className="text-slate-300 mt-2">Decrypt the message using shared secret, encrypted message, and IV</p>
            </div>

            {/* Decryption Control */}
            <div className="flex gap-4 items-center justify-center mb-8">
            <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ready for Decryption:</div>
                <div className="text-emerald-300 font-medium">Shared Secret + Encrypted Message + IV</div>
            </div>
            <Button 
                onClick={handleDecryptMessage} 
                disabled={!sharedSecret || !encryptedMessage || !iv || processing}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {processing ? "Decrypting..." : "Decrypt Message (AES-GCM)"}
            </Button>
            </div>

            {/* Decryption Animation Section */}
            <div className="relative h-56 flex items-center justify-center">
            {/* Three components arranged around center */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Shared Secret (Top) */}
                <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2"
                animate={processing ? { y: 60, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">Shared Secret</div>
                    <div className="px-4 py-3 bg-emerald-700/20 border border-emerald-500/30 rounded-lg font-mono text-sm max-w-xs">
                    {sharedSecret ?? "-- waiting --"}
                    </div>
                </div>
                </motion.div>

                {/* Encrypted Message (Left) */}
                <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2"
                animate={processing ? { x: 80, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">Encrypted Message</div>
                    <div className="px-4 py-3 bg-sky-700/20 border border-sky-500/30 rounded-lg font-mono text-sm max-w-xs">
                    {encryptedMessage ?? "-- waiting --"}
                    </div>
                </div>
                </motion.div>

                {/* IV (Right) */}
                <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2"
                animate={processing ? { x: -80, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">IV</div>
                    <div className="px-4 py-3 bg-amber-700/20 border border-amber-500/30 rounded-lg font-mono text-sm max-w-xs">
                    {iv ?? "-- waiting --"}
                    </div>
                </div>
                </motion.div>
            </div>

            {/* Decryption Vessel (Center) */}
            <div className="flex flex-col items-center gap-4">
                <motion.div
                className="w-48 h-20 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-slate-600 flex items-center justify-center"
                animate={processing ? { 
                    scale: [1, 1.08, 1],
                    borderColor: ["#475569", "#0ea5e9", "#10b981", "#475569"]
                } : {
                    scale: 1,
                    borderColor: "#475569"
                }}
                transition={{ duration: processing ? 1.6 : 0.6 }}
                >
                <div className="text-center">
                    <div className="text-sm text-slate-300 font-medium">Decryption Vessel</div>
                    <div className="text-xs text-slate-400 mt-1">AES-GCM Decryption</div>
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
                    <span className="text-amber-300 text-sm font-medium">AES-GCM Decryption...</span>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* Results */}
                {!processing && decryptedMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <div className="text-xs text-slate-400">Decryption Complete!</div>
                    <div className="text-lg font-bold text-emerald-400 bg-emerald-900/30 px-6 py-3 rounded-lg border border-emerald-500/40">
                    "{decryptedMessage}"
                    </div>
                </motion.div>
                )}
            </div>
            </div>

            {/* Output Display */}
            <div className="mt-8">
            <div className="text-sm text-slate-400 mb-2">Decrypted Message</div>
            <div className={`font-mono text-lg p-4 rounded-lg bg-slate-900/60 border text-center ${decryptedMessage ? 'border-emerald-500/40 text-emerald-300' : 'border-[#00ff99] opacity-40'}`}>
                {decryptedMessage ? `"${decryptedMessage}"` : "-- waiting for decryption --"}
            </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
            <p>
                <span className="text-emerald-400">Step 9:</span> Shared secret + encrypted_message + IV → 
                <span className="text-sky-400"> AES-GCM decryption</span> → Original message
            </p>
            </div>
        </div>
        </div>

        {/* Step 10: Signature Verification */}
        <div className="w-full max-w-4xl mt-16">
        <div className="bg-slate-800/60 border border-[#00ff99] rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Step 10: Signature Verification</h2>
            <p className="text-slate-300 mt-2">Verify the digital signature using message, signature, and sender's public key</p>
            </div>

            {/* Verification Control */}
            <div className="flex gap-4 items-center justify-center mb-8">
            <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ready for Verification:</div>
                <div className="text-emerald-300 font-medium">Message + Signature + Sender Public Key</div>
            </div>
            <Button 
                onClick={handleVerifySignature} 
                disabled={!decryptedMessage || !signature || verifying}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {verifying ? "Verifying..." : "Verify Signature (Dilithium)"}
            </Button>
            </div>

            {/* Verification Animation Section */}
            <div className="relative h-56 flex items-center justify-center">
            {/* Three components arranged around center */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Decrypted Message (Top) */}
                <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2"
                animate={verifying ? { y: 60, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">Decrypted Message</div>
                    <div className="px-4 py-3 bg-sky-700/20 border border-sky-500/30 rounded-lg font-mono text-sm max-w-xs">
                    {decryptedMessage ?? "-- waiting --"}
                    </div>
                </div>
                </motion.div>

                {/* Signature (Left) */}
                <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2"
                animate={verifying ? { x: 80, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">Digital Signature</div>
                    <div className="px-4 py-3 bg-purple-700/20 border border-purple-500/30 rounded-lg font-mono text-sm max-w-xs break-words">
                    {signature ?? "-- waiting --"}
                    </div>
                </div>
                </motion.div>

                {/* Sender Public Key (Right) */}
                <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2"
                animate={verifying ? { x: -80, scale: 1.05 } : { x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                <div className="text-center">
                    <div className="text-xs text-slate-400 mb-2">Sender Public Key</div>
                    <div className="px-4 py-3 bg-emerald-700/20 border border-emerald-500/30 rounded-lg font-mono text-sm max-w-xs">
                    {sender.dilithiumPublic}
                    </div>
                </div>
                </motion.div>
            </div>

            {/* Verification Vessel (Center) */}
            <div className="flex flex-col items-center gap-4">
                <motion.div
                className="w-48 h-20 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-slate-600 flex items-center justify-center"
                animate={verifying ? { 
                    scale: [1, 1.08, 1],
                    borderColor: ["#475569", "#8b5cf6", "#10b981", "#475569"]
                } : {
                    scale: 1,
                    borderColor: "#475569"
                }}
                transition={{ duration: verifying ? 1.6 : 0.6 }}
                >
                <div className="text-center">
                    <div className="text-sm text-slate-300 font-medium">Verification Vessel</div>
                    <div className="text-xs text-slate-400 mt-1">Dilithium Verification</div>
                </div>
                </motion.div>

                {/* Verification Result */}
                {!verifying && verificationResult !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <div className="text-xs text-slate-400">Verification Complete!</div>
                    <div className={`text-lg font-bold px-6 py-3 rounded-lg border ${verificationResult ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/40' : 'bg-red-900/30 text-red-400 border-red-500/40'}`}>
                    {verificationResult ? "✓ Signature Verified" : "✗ Signature Invalid"}
                    </div>
                </motion.div>
                )}
            </div>
            </div>

            {/* Output Display */}
            <div className="mt-8">
            <div className="text-sm text-slate-400 mb-2">Verification Result</div>
            <div className={`font-mono text-lg p-4 rounded-lg text-center border ${
                verificationResult === null 
                ? 'border-[#00ff99] opacity-40' 
                : verificationResult 
                    ? 'border-emerald-500/40 bg-emerald-900/20 text-emerald-300' 
                    : 'border-red-500/40 bg-red-900/20 text-red-300'
            }`}>
                {verificationResult === null 
                ? "-- waiting for verification --" 
                : verificationResult 
                    ? "✓ Signature VALID - Message authenticated" 
                    : "✗ Signature INVALID - Message tampered"}
            </div>
            </div>

            {/* Final Success Message */}
            {verificationResult && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/40 rounded-xl text-center"
            >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-2">Secure Communication Complete!</h3>
                <p className="text-emerald-200">
                Message successfully encrypted, signed, transmitted, decrypted, and verified
                </p>
                <div className="mt-4 text-sm text-emerald-300/80">
                Post-quantum cryptography protocols executed successfully
                </div>
            </motion.div>
            )}

            {/* Explanation */}
            <div className="mt-6 text-center text-xs text-slate-400">
            <p>
                <span className="text-purple-400">Step 10:</span> Message + Signature + Sender public key → 
                <span className="text-emerald-400"> Dilithium verification</span> → Authentication result
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