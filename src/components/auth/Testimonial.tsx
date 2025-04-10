
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  authorTitle?: string;
}

export function Testimonial({ quote, author, authorTitle }: TestimonialProps) {
  return (
    <div className="flex flex-col justify-end h-full p-10 text-white">
      <blockquote className="mb-4 text-2xl font-medium leading-relaxed">
        "{quote}"
      </blockquote>
      <footer className="mt-2">
        <p className="text-lg font-medium">{author}</p>
        {authorTitle && <p className="text-sm opacity-80">{authorTitle}</p>}
      </footer>
    </div>
  );
}
