// src/components/PlayGround.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAndReturnPQKeys, encryptAndSignMessage, decryptAndVerifyMessage } from '../utils/crypto';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shield, 
  Lock, 
  Key, 
  MessageSquare, 
  Send, 
  Download, 
  CheckCircle, 
  XCircle,
  Zap,
  Cpu,
  Network,
  FileKey,
  Signature,
  Mail
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const PlayGround = () => {
  const [currentPhase, setCurrentPhase] = useState('idle'); // 'idle', 'keygen', 'sender', 'transmission', 'receiver', 'complete'
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [message, setMessage] = useState('Hello Quantum World! 🌍');
  
  const [demoData, setDemoData] = useState({
    // Keys
    senderKeys: null,
    receiverKeys: null,
    
    // Sender side
    recipientPublicKey: null,
    sharedSecret: null,
    kyberCiphertext: null,
    encryptedMessage: null,
    iv: null,
    signature: null,
    
    // Transmission
    transmissionPackage: null,
    
    // Receiver side
    recoveredSecret: null,
    decryptedMessage: null,
    signatureValid: null
  });

  const steps = [
    // Key Generation Phase
    { phase: 'keygen', title: 'Generate Key Pairs', description: 'Creating Kyber and Dilithium keys for both parties' },
    
    // Sender Side
    { phase: 'sender', title: 'Kyber Encapsulation', description: 'Using recipient\'s public key to generate shared secret' },
    { phase: 'sender', title: 'AES-GCM Encryption', description: 'Encrypting message with shared secret' },
    { phase: 'sender', title: 'Dilithium Signing', description: 'Creating digital signature' },
    { phase: 'sender', title: 'Package Assembly', description: 'Preparing transmission package' },
    
    // Transmission
    { phase: 'transmission', title: 'Secure Transmission', description: 'Sending encrypted data over network' },
    
    // Receiver Side
    { phase: 'receiver', title: 'Kyber Decapsulation', description: 'Recovering shared secret with private key' },
    { phase: 'receiver', title: 'AES-GCM Decryption', description: 'Decrypting message with shared secret' },
    { phase: 'receiver', title: 'Signature Verification', description: 'Verifying message authenticity' },
    
    // Complete
    { phase: 'complete', title: 'Complete', description: 'Secure communication established' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const simulateWorkflow = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentPhase('keygen');
    setCurrentStep(0);
    
    try {
      // Phase 1: Key Generation
      setDemoData(prev => ({ ...prev, 
        senderKeys: null,
        receiverKeys: null 
      }));
      
      await new Promise(resolve => setTimeout(resolve, 1500 / animationSpeed));
      const senderKeys = await generateAndReturnPQKeys();
      const receiverKeys = await generateAndReturnPQKeys();
      
      setDemoData(prev => ({ ...prev, 
        senderKeys,
        receiverKeys,
        recipientPublicKey: receiverKeys.kyber.publicKey
      }));
      setCurrentStep(1);

      // Phase 2: Sender Side - Kyber Encapsulation
      setCurrentPhase('sender');
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(2);

      // Sender Side - AES-GCM Encryption
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(3);

      // Sender Side - Dilithium Signing
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(4);

      // Actually perform encryption and signing
      const encryptedData = await encryptAndSignMessage(
        receiverKeys.kyber.publicKey,
        message,
        senderKeys.dilithium.privateKey
      );

      setDemoData(prev => ({
        ...prev,
        sharedSecret: "***", // In real implementation, this wouldn't be exposed
        kyberCiphertext: encryptedData.kyberCiphertext,
        encryptedMessage: encryptedData.encryptedMessage,
        iv: encryptedData.iv,
        signature: encryptedData.signature,
        transmissionPackage: {
          kyberCiphertext: encryptedData.kyberCiphertext,
          encryptedMessage: encryptedData.encryptedMessage,
          iv: encryptedData.iv,
          signature: encryptedData.signature
        }
      }));

      // Sender Side - Package Assembly
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(5);

      // Phase 3: Transmission
      setCurrentPhase('transmission');
      await new Promise(resolve => setTimeout(resolve, 2000 / animationSpeed));
      setCurrentStep(6);

      // Phase 4: Receiver Side - Kyber Decapsulation
      setCurrentPhase('receiver');
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(7);

      // Receiver Side - AES-GCM Decryption
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(8);

      // Actually perform decryption and verification
      const decryptionResult = await decryptAndVerifyMessage({
        kyberPrivateKeyBase64: receiverKeys.kyber.privateKey,
        kyberCiphertextBase64: encryptedData.kyberCiphertext,
        encryptedMessageBase64: encryptedData.encryptedMessage,
        ivBase64: encryptedData.iv,
        signature: encryptedData.signature,
        dilithiumPublicKeyBase64: senderKeys.dilithium.publicKey
      });

      setDemoData(prev => ({
        ...prev,
        recoveredSecret: "***", // Same as shared secret
        decryptedMessage: decryptionResult.message,
        signatureValid: decryptionResult.signatureValid
      }));

      // Receiver Side - Signature Verification
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(9);

      // Phase 5: Complete
      setCurrentPhase('complete');
      await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
      setCurrentStep(10);

    } catch (error) {
      console.error('Demo failed:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentPhase('idle');
    setCurrentStep(0);
    setDemoData({
      senderKeys: null,
      receiverKeys: null,
      recipientPublicKey: null,
      sharedSecret: null,
      kyberCiphertext: null,
      encryptedMessage: null,
      iv: null,
      signature: null,
      transmissionPackage: null,
      recoveredSecret: null,
      decryptedMessage: null,
      signatureValid: null
    });
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const formatData = (data, maxLength = 40) => {
    if (!data) return 'Waiting...';
    if (data === '***') return '••••••••';
    return data.length > maxLength ? `${data.substring(0, maxLength)}...` : data;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🚀 Post-Quantum Cryptography Visualizer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step-by-step visualization of quantum-resistant encryption, from sender to receiver
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Encrypt:
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter your secret message..."
                disabled={isPlaying}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed: {animationSpeed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full"
                disabled={isPlaying}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={simulateWorkflow}
                disabled={isPlaying}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Demo
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetDemo}
                variant="outline"
                size="lg"
                disabled={isPlaying}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Process Flow */}
          <div className="xl:col-span-2 space-y-6">
            {/* Process Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Process Flow
                </CardTitle>
                <CardDescription>
                  Follow the step-by-step encryption and decryption process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={{
                        scale: getStepStatus(index) === 'active' ? 1.02 : 1,
                        borderColor: getStepStatus(index) === 'active' ? '#3b82f6' : 
                                   getStepStatus(index) === 'completed' ? '#10b981' : '#e5e7eb'
                      }}
                      className={`p-4 rounded-xl border-2 bg-white transition-all duration-300 ${
                        getStepStatus(index) === 'active' ? 'shadow-lg ring-2 ring-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          getStepStatus(index) === 'completed' ? 'bg-green-500 text-white' :
                          getStepStatus(index) === 'active' ? 'bg-blue-500 text-white animate-pulse' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                          {getStepStatus(index) === 'completed' ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-800">{step.title}</h3>
                            <Badge variant={
                              step.phase === 'keygen' ? 'default' :
                              step.phase === 'sender' ? 'secondary' :
                              step.phase === 'transmission' ? 'outline' :
                              step.phase === 'receiver' ? 'destructive' : 'default'
                            }>
                              {step.phase}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                          
                          {/* Step-specific data */}
                          {getStepStatus(index) === 'active' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 p-3 bg-gray-50 rounded-lg"
                            >
                              {renderStepData(index)}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transmission Animation */}
            {currentPhase === 'transmission' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Secure Transmission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-8">
                    <div className="text-center">
                      <motion.div
                        animate={pulseAnimation}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto"
                      >
                        <Send className="w-6 h-6" />
                      </motion.div>
                      <span className="font-semibold text-green-600">Sender</span>
                    </div>
                    
                    <motion.div
                      animate={{
                        x: [0, 100, 0],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="mx-8"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <Mail className="w-6 h-6" />
                      </div>
                    </motion.div>
                    
                    <div className="text-center">
                      <motion.div
                        animate={pulseAnimation}
                        className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto"
                      >
                        <Download className="w-6 h-6" />
                      </motion.div>
                      <span className="font-semibold text-purple-600">Receiver</span>
                    </div>
                  </div>
                  
                  <Progress value={45} className="w-full" />
                  <div className="text-center mt-2 text-sm text-gray-600">
                    Transmitting encrypted package...
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Live Data */}
          <div className="space-y-6">
            {/* Original Message */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Original Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="text-green-800 font-mono text-lg text-center">
                    {message}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Keys Display */}
            {(demoData.senderKeys || demoData.receiverKeys) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Generated Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        <FileKey className="w-4 h-4" />
                        Sender's Keys
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>Kyber Public: {formatData(demoData.senderKeys?.kyber.publicKey)}</div>
                        <div>Dilithium Public: {formatData(demoData.senderKeys?.dilithium.publicKey)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <FileKey className="w-4 h-4" />
                        Receiver's Keys
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>Kyber Public: {formatData(demoData.receiverKeys?.kyber.publicKey)}</div>
                        <div>Dilithium Public: {formatData(demoData.receiverKeys?.dilithium.publicKey)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Encryption Package */}
            {demoData.transmissionPackage && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Transmission Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <div className="font-medium text-red-800 text-sm">Kyber Ciphertext</div>
                      <div className="font-mono text-xs break-all">{formatData(demoData.kyberCiphertext)}</div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="font-medium text-blue-800 text-sm">Encrypted Message</div>
                      <div className="font-mono text-xs break-all">{formatData(demoData.encryptedMessage)}</div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="font-medium text-green-800 text-sm">Initialization Vector (IV)</div>
                      <div className="font-mono text-xs break-all">{formatData(demoData.iv)}</div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border border-purple-200">
                      <div className="font-medium text-purple-800 text-sm">Digital Signature</div>
                      <div className="font-mono text-xs break-all">{formatData(demoData.signature)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Decryption Result */}
            {demoData.decryptedMessage && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Decryption Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <p className="text-blue-800 font-mono text-lg text-center">
                        {demoData.decryptedMessage}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 ${
                      demoData.signatureValid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        {demoData.signatureValid ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <div>
                          <div className="font-semibold">
                            Signature {demoData.signatureValid ? 'Verified' : 'Invalid'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {demoData.signatureValid 
                              ? 'Message authenticity confirmed'
                              : 'Warning: Message may have been tampered with'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderStepData(stepIndex) {
    switch(stepIndex) {
      case 0: // Key Generation
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Kyber Key Pairs:</span>
              <Badge variant="outline">Generated</Badge>
            </div>
            <div className="flex justify-between">
              <span>Dilithium Key Pairs:</span>
              <Badge variant="outline">Generated</Badge>
            </div>
          </div>
        );
      
      case 1: // Kyber Encapsulation
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Recipient's Public Key</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Shared Secret + Ciphertext</span>
            </div>
          </div>
        );
      
      case 2: // AES-GCM Encryption
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Shared Secret + Message</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Encrypted Message + IV</span>
            </div>
          </div>
        );
      
      case 3: // Dilithium Signing
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Message + Sender Private Key</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Digital Signature</span>
            </div>
          </div>
        );
      
      case 6: // Kyber Decapsulation
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Ciphertext + Receiver Private Key</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Shared Secret</span>
            </div>
          </div>
        );
      
      case 7: // AES-GCM Decryption
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Encrypted Message + IV + Shared Secret</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Original Message</span>
            </div>
          </div>
        );
      
      case 8: // Signature Verification
        return (
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Input:</span>
              <span>Message + Signature + Sender Public Key</span>
            </div>
            <div className="flex justify-between">
              <span>Output:</span>
              <span>Verification Result</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  }
};

export default PlayGround;