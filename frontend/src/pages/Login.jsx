import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../context/useAuthStore';
import { Shield, User, Loader2 } from 'lucide-react';
// These helper functions are essential for converting between the server's format (Base64URL)
// and the browser's required format (ArrayBuffer).
import { base64urlToBuffer, bufferToBase64url } from '../utils/base64';

export default function Login() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error('Please enter your username.');
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Get the challenge and options from the backend
      const beginToast = toast.info('Requesting secure challenge...');
      const beginRes = await axios.post(
        '/api/v1/auth/login-begin',
        { username: username.trim().toLowerCase() }, // Send normalized username
        { withCredentials: true }
      );
      const options = beginRes.data;

      // Step 2: Prepare options for the browser's WebAuthn API
      // The browser needs binary data as ArrayBuffers, not strings.
      options.challenge = base64urlToBuffer(options.challenge);
      if (options.allowCredentials) {
        options.allowCredentials = options.allowCredentials.map((cred) => ({
          ...cred,
          id: base64urlToBuffer(cred.id),
        }));
      }

      // Step 3: Trigger the browser's authenticator (e.g., Windows Hello)
      toast.update(beginToast, { render: 'Please use your authenticator (e.g., PIN, fingerprint)...' });
      const credential = await navigator.credentials.get({ publicKey: options });

      // Step 4: Prepare the authenticator's response to be sent to the backend
      // The backend expects binary data as Base64URL strings in a JSON object.
      const authResponse = {
        id: credential.id,
        rawId: bufferToBase64url(credential.rawId),
        type: credential.type,
        response: {
          authenticatorData: bufferToBase64url(credential.response.authenticatorData),
          clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
          signature: bufferToBase64url(credential.response.signature),
          userHandle: credential.response.userHandle
            ? bufferToBase64url(credential.response.userHandle)
            : null,
        },
      };

      // Step 5: Send the signed response to the backend for verification
      toast.update(beginToast, { render: 'Verifying your identity...', type: 'info', isLoading: true });
      const verifyRes = await axios.post(
        '/api/v1/auth/login-complete',
        {
          username: username.trim().toLowerCase(),
          authentication_response: authResponse,
        },
        { withCredentials: true }
      );

      // Use the user object directly from the login response, removing any extra API calls.
      if (verifyRes.data?.success && verifyRes.data?.user) {
        toast.update(beginToast, { render: 'Login successful! Welcome back.', type: 'success', isLoading: false, autoClose: 3000 });
        setUser(verifyRes.data.user); // Set the global auth state with the returned user object
        navigate('/chat'); // Redirect to the main application
      } else {
        // This case handles logical failures where the backend reports success: false
        throw new Error(verifyRes.data?.msg || 'Authentication failed.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      // This handles both network errors and HTTP error statuses from the backend
      let errorMessage = err.response?.data?.detail || err.message || 'An unknown error occurred.';
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Authentication was cancelled. Please try again.';
      }
      toast.dismiss(); // Dismiss any loading toasts
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-2 shadow-md">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Secure Login</h1>
          <p className="text-gray-500 text-sm">
            Sign in with your registered device.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!username || isLoading}
            className="w-full py-2.5 mt-4 rounded-md font-semibold text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Login with Secure Key'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Create one now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

