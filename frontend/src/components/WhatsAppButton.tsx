import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/23566845732"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-bounce"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export { WhatsAppButton };
