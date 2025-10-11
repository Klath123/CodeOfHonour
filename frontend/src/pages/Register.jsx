import React, { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";
import { toast } from "react-toastify";
import { Shield, User, Mail } from "lucide-react";
import { generateAndReturnPQKeys } from "../utils/crypto"; // your PQ keygen util

const API_URL = "https://localhost:8000/api/v1/auth"; // adjust backend URL

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      toast.error("Please fill in both username and email.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Request WebAuthn registration options
      toast.info("Preparing secure registration...");
      const beginRes = await axios.post(`${API_URL}/register-begin`, {
        username,
        email,
      });

      // Step 2: Prompt user’s authenticator (Windows Hello, etc.)
      toast.info("Touch your authenticator or use Face/Touch ID...");
      const attResp = await startRegistration(beginRes.data);

      // Step 3: Send attestation response for verification
      const completeRes = await axios.post(`${API_URL}/register-complete`, {
        username,
        registration_response: attResp,
      });

      if (!completeRes.data.verified) {
        toast.error("WebAuthn verification failed.");
        setIsLoading(false);
        return;
      }

      // Step 4: Generate Post-Quantum keys
      toast.info("Generating post-quantum keys...");
      const pqKeys = await generateAndReturnPQKeys();

      // Store private keys locally (browser only)
      localStorage.setItem("kyberPrivate", pqKeys.kyber.privateKey);
      localStorage.setItem("dilithiumPrivate", pqKeys.dilithium.privateKey);

      // Step 5: Send PQ public keys to backend (register user + email)
      const regRes = await axios.post(`${API_URL}/register`, {
        username,
        email,
        kyberPublicKey: pqKeys.kyber.publicKey,
        dilithiumPublicKey: pqKeys.dilithium.publicKey,
      });

      toast.success(regRes.data.msg || "Registration complete!");
      if (regRes.data.invite_code) {
        toast.info(`Invite code: ${regRes.data.invite_code}`, { autoClose: 10000 });
      }

      toast.success("🎉 Welcome email sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = username && email && validateEmail(email);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create Your Secure Account
          </h1>
          <p className="text-gray-500 text-sm">
            Passwordless + Quantum-Safe Authentication
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="e.g., neo_the_one"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={isLoading}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="e.g., neo@matrix.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={isLoading}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-2 mt-4 rounded-md font-semibold text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-yellow-700 text-xs leading-relaxed">
            <strong>Note:</strong> Your private keys are stored securely in your
            browser and never sent to the server.
          </p>
        </div>
      </div>
    </div>
  );
}
