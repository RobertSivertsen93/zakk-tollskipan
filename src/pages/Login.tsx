
import React from 'react';
import { Card } from '@/components/ui/card';
import { Testimonial } from '@/components/auth/Testimonial';
import { LoginForm } from '@/components/auth/LoginForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Login() {
  const { translations, language } = useLanguage();
  const t = translations[language].auth || {};
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-custom-blue-50 to-custom-blue-100">
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-6xl overflow-hidden rounded-xl shadow-xl flex flex-col lg:flex-row">
          {/* Left Column - Testimonial */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-custom-blue-500 to-custom-blue-700">
            <Testimonial 
              quote="This system has saved me countless hours of work and helped me process customs declarations faster than ever before."
              author="Sofia Davis"
              authorTitle="Customs Specialist"
            />
          </div>
          
          {/* Right Column - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
            <LoginForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
