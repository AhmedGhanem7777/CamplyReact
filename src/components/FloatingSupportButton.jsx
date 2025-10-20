
// // src/components/FloatingSupportButton.jsx
// import React from "react";

// export default function FloatingSupportButton() {
//   // رقم الواتساب المطلوب
//   const waNumber = "01559434566";

//   return (
//     // زر عائم: أسفل يمين مع هامش (غير ملاصق للحواف)
//     <div className="fixed bottom-6 right-6 z-50">
//       <a
//         aria-label="واتساب"
//         href={`https://wa.me/${waNumber}`}
//         target="_blank"
//         rel="noreferrer"
//         // خلفية خضراء + أيقونة/نص أبيض + شكل دائري + ظل + تأثير تحويم
//         className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 active:bg-green-800 transition"
//         title="تواصل عبر واتساب"
//       >
//         {/* أيقونة واتساب بيضاء */}
//         <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
//           <path
//             fill="currentColor"
//             d="M16 3a13 13 0 00-11 19.8L4 29l6.4-1.7A13 13 0 1016 3zm7.5 20.5A10.6 10.6 0 116.9 6.9 10.6 10.6 0 0123.5 23.5z"
//           />
//           <path
//             fill="currentColor"
//             d="M21 18.5c-.2-.1-1.2-.6-1.4-.7s-.4-.1-.5.1-.6.7-.7.8-.3.1-.5 0-1-.4-1.9-1.3-1.4-1.8-1.5-2-.1-.4.1-.6l.4-.5c.1-.2.1-.3.2-.5s0-.3-.1-.5-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-.8.8-.8 2 .9 2.5 1 2.7 1.9 2.6 4.5 3.8c.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.5-.6 1.7-1.2s.2-1 .1-1.1-.2-.2-.5-.3z"
//           />
//         </svg>
//       </a>
//     </div>
//   );
// }























// import React from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

// const FloatingSupportButton = () => {
//   const WhatsAppIcon = () => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//     </svg>
//   );

//   return (
//     <motion.div
//       initial={{ scale: 0, y: 100 }}
//       animate={{ scale: 1, y: 0 }}
//       transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
//       className="fixed bottom-6 right-6 z-50"
//     >
//       <Button asChild size="lg" className="rounded-full shadow-lg !py-6 !px-6 bg-green-500 hover:bg-green-600 text-white">
//         <a
//           href="https://wa.me/96878066874"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-3"
//         >
//           <WhatsAppIcon />
//           <span className="font-semibold">الدعم الفني</span>
//         </a>
//       </Button>
//     </motion.div>
//   );
// };

// export default FloatingSupportButton;



















import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const FloatingSupportButton = () => {
  const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );

  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button asChild size="lg" className="rounded-full shadow-lg !py-6 !px-6 bg-green-500 hover:bg-green-600 text-white">
        <a
          href="https://wa.me/96878066874"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <WhatsAppIcon />
          <span className="font-semibold">الدعم الفني</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default FloatingSupportButton;