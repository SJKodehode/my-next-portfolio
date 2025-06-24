// components/contactMe.js
'use client';

import { useTheme } from './themeProvider';

export default function ContactMe() {
  const { colors } = useTheme();
  const bg = colors[0];    // secondary
  const text = colors[1];  // background (tekstfarge)
  const accent = colors[3];

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center h-[60vh] px-4 sm:px-16"
      style={{ backgroundColor: bg, color: text }}
    >
      <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
      <form
        className="flex flex-col gap-6 w-full max-w-xl p-6 rounded-2xl"
        style={{
            backgroundColor: accent
        }}
        onSubmit={(e) => {
          e.preventDefault();
          // implementer e-post eller webhook her
          alert('Message sent (not really)');
        }}
      >
        <input
          type="text"
          placeholder="Name"
          className="p-4 rounded-lg bg-transparent border border-current placeholder:text-current focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-4 rounded-lg bg-transparent border border-current placeholder:text-current focus:outline-none"
          required
        />
        <textarea
          placeholder="Your message"
          className="p-4 h-40 rounded-lg bg-transparent border border-current placeholder:text-current focus:outline-none resize-none"
          required
        />
        <button
          type="submit"
          className="self-end px-6 py-3 rounded-xl font-semibold border border-current hover:scale-105 transition-all duration-200"
        >
          Send
        </button>
      </form>
    </section>
  );
}
