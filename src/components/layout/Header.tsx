

// // src/components/layout/Header.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, ChevronDown, LogIn, LogOut, ChevronRight, Settings, KeyRound } from 'lucide-react';
// import { Button } from '../ui/button';
// import { useToast } from '../ui/use-toast';
// import { ArabicTentIcon } from '../ui/ArabicTentIcon';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// type NavLinkItem = { title: string; path: string };

// const navLinks: NavLinkItem[] = [
//   { title: 'الرئيسية', path: '/home' },
//   { title: 'استكشف المخيمات', path: '/all-camps' }, // سيُستبدل بعنصر Dropdown في العرض
//   { title: 'من نحن', path: '/about' },
//   { title: 'انضم إلينا', path: '/join' },
//   // { title: 'باقات الاشتراك', path: '/pricing' },
//   { title: 'اتصل بنا', path: '/contact' },
//   { title: 'المفضلة', path: '/favorites' },
// ];

// const countries = ['عُمان','السعودية','الإمارات','قطر','الكويت','البحرين'];
// const campTypes = ['خيمة','نُزل','عريش','كرافان','بود','غلمبينغ'];

// // أنواع المخيمات (العربية) كما طلبت، بصياغة واضحة للمستخدم
// // const CAMP_TYPE_OPTIONS: string[] = [
// //   'مخيمات الخيام التقليدية',
// //   'مخيمات الكرفانات (RV / Caravan)',
// //   'مخيمات الغابات والجبال',
// //   'التخييم الفاخر (Glamping)',
// //   'التخييم الفندقي (Glamorous Camping)',
// //   'خيام سفاري / قبة / فقاعة',
// //   'مخيمات بيئية',
// //   'مخيمات المزارع',
// //   'مخيمات الشواطئ',
// //   'مخيمات الصحراء',
// //   'مخيمات المغامرات',
// //   'مخيمات الفلك والنجوم',
// //   'مخيمات اليوغا والعافية',
// // ];

// // أنواع المخيمات (عربي موحّد)
// const CAMP_TYPE_OPTIONS: string[] = [
//   "مخيمات الخيام التقليدية",
//   "مخيمات الكرفانات (RV / Caravan)",
//   "مخيمات الغابات والجبال",
//   "التخييم الفاخر (Glamping)",
//   "التخييم الفندقي (Glamorous Camping)",
//   "خيام سفاري / قبة / فقاعة",
//   "مخيمات بيئية",
//   "مخيمات المزارع",
//   "مخيمات الشواطئ",
//   "مخيمات الصحراء",
//   "مخيمات المغامرات",
//   "مخيمات الفلك والنجوم",
//   "مخيمات اليوغا والعافية",
// ];


// function ExploreMenu({ open }: { open: boolean }) {
//   if (!open) return null;
//   return (
//     <div className="absolute mt-3 right-0 rounded-xl border bg-popover p-6 shadow-xl grid grid-cols-2 gap-10 min-w-[520px] animate-scale-in">
//       <div>
//         <h4 className="font-semibold mb-3">الوجهات</h4>
//         <ul className="space-y-2">
//           {countries.map((c) => (
//             <li key={c}>
//               <Link to={`/search?country=${encodeURIComponent(c)}`} className="hover:underline">{c}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h4 className="font-semibold mb-3">أنواع المخيمات</h4>
//         <ul className="space-y-2">
//           {campTypes.map((t) => (
//             <li key={t}>
//               <Link to={`/search?type=${encodeURIComponent(t)}`} className="hover:underline">{t}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Dropdown صغير للاستكشاف بأنواع المخيمات
// function ExploreTypesDropdown({ onSelect, className }: { onSelect: (value: string) => void; className?: string }) {
//   return (
//     <div className={className}>
//       <Select onValueChange={onSelect}>
//         <SelectTrigger className="w-[220px]">
//           <SelectValue placeholder="استكشف المخيمات" />
//         </SelectTrigger>
//         <SelectContent align="end">
//           {CAMP_TYPE_OPTIONS.map((t) => (
//             <SelectItem key={t} value={t}>
//               {t}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const [isAuth, setIsAuth] = useState<boolean>(false);
//   const [role, setRole] = useState<string>('');
//   const [exploreOpen, setExploreOpen] = useState<boolean>(false);
//   const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
//   const settingsRef = useRef<HTMLDivElement | null>(null);
//   const { toast } = useToast();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const activeLinkStyle: React.CSSProperties = { color: 'hsl(var(--primary))', fontWeight: 'bold' };

//   const handleFeatureClick = () => {
//     toast({ title: '🚧 الميزة قيد التطوير', description: 'سيتم تفعيل اختيار الدولة قريباً.' });
//   };

//   const readAuth = () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const r = localStorage.getItem('role') || sessionStorage.getItem('role') || '';
//     setIsAuth(!!token);
//     setRole(r);
//   };

//   useEffect(() => { readAuth(); setSettingsOpen(false); }, [location.pathname]);

//   useEffect(() => {
//     const onAuthChanged = () => readAuth();
//     window.addEventListener('auth-changed', onAuthChanged as EventListener);
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === 'token' || e.key === 'role' || e.key === null) readAuth();
//     };
//     window.addEventListener('storage', onStorage);
//     return () => {
//       window.removeEventListener('auth-changed', onAuthChanged as EventListener);
//       window.removeEventListener('storage', onStorage);
//     };
//   }, []);

//   useEffect(() => {
//     const onClickOutside = (e: MouseEvent) => {
//       if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
//         setSettingsOpen(false);
//       }
//     };
//     const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSettingsOpen(false); };
//     document.addEventListener('mousedown', onClickOutside);
//     document.addEventListener('keydown', onEsc);
//     return () => {
//       document.removeEventListener('mousedown', onClickOutside);
//       document.removeEventListener('keydown', onEsc);
//     };
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('userId'); localStorage.removeItem('email');
//     sessionStorage.removeItem('token'); sessionStorage.removeItem('role'); sessionStorage.removeItem('userId'); sessionStorage.removeItem('email');
//     setIsAuth(false); setRole('');
//     window.dispatchEvent(new Event('auth-changed'));
//     setIsMenuOpen(false);
//     setSettingsOpen(false);
//     navigate('/home', { replace: true });
//   };

//   const goToType = (type: string) => {
//     // توجيه إلى صفحة جميع المخيمات مع تمرير النوع كفلتر
//     const qs = new URLSearchParams();
//     qs.set('page', '1');
//     qs.set('size', '12');
//     qs.set('type', type);
//     navigate(`/all-camps?${qs.toString()}`);
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center">
//         <Link to="/home" className="flex items-center gap-2 mr-6" onClick={() => { setIsMenuOpen(false); setSettingsOpen(false); }}>
//           <ArabicTentIcon className="h-8 w-8 text-primary drop-shadow-[var(--shadow-glow)]" />
//           <span className="font-bold text-lg me-3">Camply</span>
//         </Link>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center gap-6 text-sm relative">
//           {navLinks.map((link) => {
//             // استبدال الرابط "استكشف المخيمات" بمكوّن Dropdown للأنواع
//             if (link.title === 'استكشف المخيمات') {
//               return (
//                 <ExploreTypesDropdown
//                   key="explore-types-desktop"
//                   onSelect={goToType}
//                 />
//               );
//             }
//             return (
//               <NavLink
//                 key={link.title}
//                 to={link.path}
//                 style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
//                 className="transition-colors hover:text-foreground/80 text-foreground/60"
//               >
//                 {link.title}
//               </NavLink>
//             );
//           })}

//           {/* قائمة استكشاف قديمة (معلّقة) */}
//           {/* <div
//             className="relative"
//             onMouseEnter={() => setExploreOpen(true)}
//             onMouseLeave={() => setExploreOpen(false)}
//           >
//             <button className="px-3 py-1 rounded-md hover:bg-accent flex items-center gap-1 transition-colors">
//               Explore <ChevronDown className="h-4 w-4" />
//             </button>
//             <ExploreMenu open={exploreOpen} />
//           </div> */}
//         </nav>

//         {/* Actions: Auth in navbar + Settings (password only) + Mobile burger */}
//         <div className="flex flex-1 items-center justify-end gap-2">
//           {/* Auth in navbar */}
//           {!isAuth ? (
//             <Link
//               to="/login"
//               className="inline-flex items-center justify-center rounded-lg px-3 py-2
//                         bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
//               onClick={() => { setIsMenuOpen(false); setSettingsOpen(false); }}
//             >
//               <LogIn className="w-4 h-4 ml-1" /> تسجيل الدخول
//             </Link>
//           ) : (
//             <button
//               onClick={logout}
//               className="inline-flex items-center justify-center rounded-lg px-3 py-2
//                         border text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 transition-colors"
//             >
//               <LogOut className="w-4 h-4 ml-1" /> تسجيل الخروج
//             </button>
//           )}

//           {/* Settings: only when authenticated, contains only Change Password */}
//           {isAuth && (
//             <div className="relative" ref={settingsRef}>
//               <button
//                 aria-label="الإعدادات"
//                 onClick={() => setSettingsOpen((s) => !s)}
//                 className="inline-flex items-center justify-center rounded-lg border px-2.5 py-2
//                           hover:bg-accent transition-colors focus:outline-none focus:ring-2
//                           focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-background"
//               >
//                 <Settings className="w-5 h-5" />
//               </button>

//               <AnimatePresence>
//                 {settingsOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 6, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.98 }}
//                     transition={{ duration: 0.15 }}
//                     className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover p-2 shadow-xl"
//                   >
//                     <Link
//                       to="/change-password"
//                       onClick={() => setSettingsOpen(false)}
//                       className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent transition-colors"
//                     >
//                       <KeyRound className="w-4 h-4" /> تغيير الرقم السري
//                     </Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}

//           {/* Mobile menu toggle */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-md border p-2 hover:bg-accent transition-colors"
//             onClick={() => { setIsMenuOpen((s) => !s); setSettingsOpen(false); }}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute top-full left-0 w-full bg-background border-b border-border/40 md:hidden"
//           >
//             <nav className="flex flex-col items-center gap-4 p-4">
//               {navLinks.map((link) => {
//                 if (link.title === 'استكشف المخيمات') {
//                   return (
//                     <div key="explore-types-mobile" className="w-full">
//                       <ExploreTypesDropdown onSelect={goToType} className="w-full" />
//                     </div>
//                   );
//                 }
//                 return (
//                   <NavLink
//                     key={link.title}
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
//                     className="w-full flex items-center justify-between gap-2 text-lg transition-colors hover:text-foreground/80 text-foreground/60"
//                   >
//                     <span>{link.title}</span>
//                     <ChevronRight className="w-4 h-4 opacity-60" />
//                   </NavLink>
//                 );
//               })}

//               {/* Auth buttons directly in mobile nav */}
//               {!isAuth ? (
//                 <Link
//                   to="/login"
//                   onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new Event('auth-changed')); }}
//                   className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2
//                             bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
//                 >
//                   <LogIn className="w-4 h-4" /> تسجيل الدخول
//                 </Link>
//               ) : (
//                 <button
//                   onClick={() => { setIsMenuOpen(false); logout(); }}
//                   className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2
//                             bg-red-600 text-white hover:bg-red-700 transition-colors mt-2"
//                 >
//                   <LogOut className="w-4 h-4" /> تسجيل الخروج
//                 </button>
//               )}

//               {/* زر تجريبي (كما هو) */}
//               {/* <Button variant="outline" onClick={() => { setIsMenuOpen(false); handleFeatureClick(); }} className="w-full">
//                 اختر الدولة
//               </Button> */}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }




























// src/components/layout/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogIn, LogOut, ChevronRight, Settings, KeyRound } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { ArabicTentIcon } from '../ui/ArabicTentIcon';

type NavLinkItem = { title: string; path: string };

const navLinks: NavLinkItem[] = [
  { title: 'الرئيسية', path: '/home' },
  { title: 'استكشف المخيمات', path: '/all-camps' },
  { title: 'من نحن', path: '/about' },
  { title: 'انضم إلينا', path: '/join' },
  // { title: 'باقات الاشتراك', path: '/pricing' },
  { title: 'اتصل بنا', path: '/contact' },
  { title: 'المفضلة', path: '/favorites' },
];

const countries = ['عُمان','السعودية','الإمارات','قطر','الكويت','البحرين'];
const campTypes = ['خيمة','نُزل','عريش','كرافان','بود','غلمبينغ'];

function ExploreMenu({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="absolute mt-3 right-0 rounded-xl border bg-popover p-6 shadow-xl grid grid-cols-2 gap-10 min-w-[520px] animate-scale-in">
      <div>
        <h4 className="font-semibold mb-3">الوجهات</h4>
        <ul className="space-y-2">
          {countries.map((c) => (
            <li key={c}>
              <Link to={`/search?country=${encodeURIComponent(c)}`} className="hover:underline">{c}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">أنواع المخيمات</h4>
        <ul className="space-y-2">
          {campTypes.map((t) => (
            <li key={t}>
              <Link to={`/search?type=${encodeURIComponent(t)}`} className="hover:underline">{t}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [exploreOpen, setExploreOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const activeLinkStyle: React.CSSProperties = { color: 'hsl(var(--primary))', fontWeight: 'bold' };

  const handleFeatureClick = () => {
    toast({ title: '🚧 الميزة قيد التطوير', description: 'سيتم تفعيل اختيار الدولة قريباً.' });
  };

  const readAuth = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const r = localStorage.getItem('role') || sessionStorage.getItem('role') || '';
    setIsAuth(!!token);
    setRole(r);
  };

  useEffect(() => { readAuth(); setSettingsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onAuthChanged = () => readAuth();
    window.addEventListener('auth-changed', onAuthChanged as EventListener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'role' || e.key === null) readAuth();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('auth-changed', onAuthChanged as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSettingsOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('userId'); localStorage.removeItem('email');
    sessionStorage.removeItem('token'); sessionStorage.removeItem('role'); sessionStorage.removeItem('userId'); sessionStorage.removeItem('email');
    setIsAuth(false); setRole('');
    window.dispatchEvent(new Event('auth-changed'));
    setIsMenuOpen(false);
    setSettingsOpen(false);
    navigate('/home', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/home" className="flex items-center gap-2 mr-6" onClick={() => { setIsMenuOpen(false); setSettingsOpen(false); }}>
          <ArabicTentIcon className="h-8 w-8 text-primary drop-shadow-[var(--shadow-glow)]" />
          <span className="font-bold text-lg me-3">Camply</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm relative">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.title}
            </NavLink>
          ))}

          {/* <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button className="px-3 py-1 rounded-md hover:bg-accent flex items-center gap-1 transition-colors">
              Explore <ChevronDown className="h-4 w-4" />
            </button>
            <ExploreMenu open={exploreOpen} />
          </div> */}
        </nav>

        {/* Actions: Auth in navbar + Settings (password only) + Mobile burger */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Auth in navbar */}
          {!isAuth ? (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg px-3 py-2
                         bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => { setIsMenuOpen(false); setSettingsOpen(false); }}
            >
              <LogIn className="w-4 h-4 ml-1" /> تسجيل الدخول
            </Link>
          ) : (
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-lg px-3 py-2
                         border text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4 ml-1" /> تسجيل الخروج
            </button>
          )}

          {/* Settings: only when authenticated, contains only Change Password */}
          {isAuth && (
            <div className="relative" ref={settingsRef}>
              <button
                aria-label="الإعدادات"
                onClick={() => setSettingsOpen((s) => !s)}
                className="inline-flex items-center justify-center rounded-lg border px-2.5 py-2
                           hover:bg-accent transition-colors focus:outline-none focus:ring-2
                           focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-background"
              >
                <Settings className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover p-2 shadow-xl"
                  >
                    <Link
                      to="/change-password"
                      onClick={() => setSettingsOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent transition-colors"
                    >
                      <KeyRound className="w-4 h-4" /> تغيير الرقم السري
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border p-2 hover:bg-accent transition-colors"
            onClick={() => { setIsMenuOpen((s) => !s); setSettingsOpen(false); }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border/40 md:hidden"
          >
            <nav className="flex flex-col items-center gap-4 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="w-full flex items-center justify-between gap-2 text-lg transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <span>{link.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </NavLink>
              ))}

              {/* Auth buttons directly in mobile nav */}
              {!isAuth ? (
                <Link
                  to="/login"
                  onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new Event('auth-changed')); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2
                             bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
                >
                  <LogIn className="w-4 h-4" /> تسجيل الدخول
                </Link>
              ) : (
                <button
                  onClick={() => { setIsMenuOpen(false); logout(); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2
                             bg-red-600 text-white hover:bg-red-700 transition-colors mt-2"
                >
                  <LogOut className="w-4 h-4" /> تسجيل الخروج
                </button>
              )}

              {/* زر تجريبي */}
              {/* <Button variant="outline" onClick={() => { setIsMenuOpen(false); handleFeatureClick(); }} className="w-full">
                اختر الدولة
              </Button> */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}