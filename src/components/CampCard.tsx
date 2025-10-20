

// src/components/CampCard.tsx
import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../components/ui/use-toast";
import { addItemToBasket } from "../Service/api/basket";

type NameOrObject = string | { name?: string };

interface CampCardProps {
  id: number;
  image: string;
  title: string;
  location?: string;
  country?: NameOrObject;
  state?: NameOrObject;
  city?: NameOrObject;
  rating: number;
  price: number;
  onBookClick?: (campId: number) => void;
}

const FALLBACK = "https://images.unsplash.com/photo-1532555283690-cbf89e69cec7";
const formatUSD = (v: number) =>
  new Intl.NumberFormat("ar", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(v || 0);

function resolveName(v?: NameOrObject): string | undefined {
  if (!v) return undefined;
  return typeof v === "string" ? v : v?.name;
}

const CampCard = ({
  id,
  image,
  title,
  location,
  country,
  state,
  city,
  rating,
  price,
  onBookClick,
}: CampCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartBusy, setHeartBusy] = useState(false);
  const { toast } = useToast();

  const safeImage = image || FALLBACK;
  const safeTitle = title || "مخيم";
  const safeRating = Number.isFinite(rating) ? Number(rating) : 0;
  const safePrice = Number.isFinite(price) ? Number(price) : 0;

  const locParts = [resolveName(country), resolveName(state), resolveName(city)].filter(Boolean) as string[];
  const computedLocation =
    (location && location.trim() && location !== "-") ? location :
    (locParts.length ? locParts.join(" / ") : "-");

  async function handleHeartClick() {
    try {
      setHeartBusy(true);
      await addItemToBasket({
        campId: id,
        title: safeTitle,
        pictureUrl: safeImage,
        price: safePrice,
        currency: "USD",
        nights: 1,
        units: 1,
      });
      setIsFavorite(true);
      toast({ title: "تمت الإضافة إلى السلة", description: "تمت إضافة المخيم إلى سلتك بنجاح." });
    } catch (e: any) {
      toast({ title: "تعذر الإضافة إلى السلة", description: String(e?.message || e), variant: "destructive" });
    } finally {
      setHeartBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      dir="rtl"
    >
      <Card className="overflow-hidden shadow-nature-md hover:shadow-nature-lg transition-smooth group">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={safeImage}
            alt={safeTitle}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = FALLBACK; }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          />
          {/* <button
            onClick={handleHeartClick}
            className="absolute top-4 left-4 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 transition-smooth disabled:opacity-60"
            aria-label="إضافة إلى السلة"
            type="button"
            disabled={heartBusy}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"} ${heartBusy ? "opacity-70" : ""}`}
            />
          </button> */}

          <button
  onClick={handleHeartClick}
  className="absolute top-4 left-4 p-0 bg-transparent hover:bg-transparent transition-smooth"
  aria-label="إضافة إلى السلة"
  type="button"
  disabled={heartBusy}
>
  <Heart className={`w-5 h-5 text-red-500 fill-red-500 ${heartBusy ? "opacity-70" : ""}`} />
</button>

          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            {formatUSD(safePrice)} / الليلة
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">{safeTitle}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span>{computedLocation}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{safeRating ? safeRating.toFixed(1) : "-"}</span>
              <span className="text-muted-foreground text-sm">(الأراء)</span>
            </div>

            <div className="flex items-center gap-2">
              {/* انتقل لصفحة التفاصيل */}
              <Button variant="secondary" size="sm" asChild>
                <Link to={`/camps/${id}`}>التفاصيل</Link>
              </Button>
              {/* <Button
                variant="default"
                size="sm"
                onClick={() => (onBookClick ? onBookClick(id) : null)}
                asChild={!onBookClick}
              >
                {onBookClick ? <span role="button">احجز الآن</span> : <Link to={`/booking/new?campId=${id}`}>احجز الآن</Link>}
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CampCard;
























// // src/components/CampCard.tsx
// import { Heart, MapPin, Star } from "lucide-react";
// import { Card, CardContent } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useToast } from "../components/ui/use-toast";
// import { addItemToBasket } from "../Service/api/basket";

// // Dialog + Inputs لنموذج الحجز
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";

// type NameOrObject = string | { name?: string };

// interface CampCardProps {
//   id: number;
//   image: string;
//   title: string;
//   location?: string;
//   country?: NameOrObject;
//   state?: NameOrObject;
//   city?: NameOrObject;
//   rating: number;
//   price: number;
//   onBookClick?: (campId: number) => void;
// }

// const FALLBACK = "https://images.unsplash.com/photo-1532555283690-cbf89e69cec7";
// const formatUSD = (v: number) =>
//   new Intl.NumberFormat("ar", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(v || 0);

// function resolveName(v?: NameOrObject): string | undefined {
//   if (!v) return undefined;
//   return typeof v === "string" ? v : v?.name;
// }

// const CampCard = ({
//   id,
//   image,
//   title,
//   location,
//   country,
//   state,
//   city,
//   rating,
//   price,
//   onBookClick,
// }: CampCardProps) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [heartBusy, setHeartBusy] = useState(false);
//   const { toast } = useToast();

//   const safeImage = image || FALLBACK;
//   const safeTitle = title || "مخيم";
//   const safeRating = Number.isFinite(rating) ? Number(rating) : 0;
//   const safePrice = Number.isFinite(price) ? Number(price) : 0;

//   const locParts = [resolveName(country), resolveName(state), resolveName(city)].filter(Boolean) as string[];
//   const computedLocation =
//     (location && location.trim() && location !== "-") ? location :
//     (locParts.length ? locParts.join(" / ") : "-");

//   // المفضلة
//   async function handleHeartClick() {
//     try {
//       setHeartBusy(true);
//       await addItemToBasket({
//         campId: id,
//         title: safeTitle,
//         pictureUrl: safeImage,
//         price: safePrice,
//         currency: "USD",
//         nights: 1,
//         units: 1,
//       });
//       setIsFavorite(true);
//       toast({ title: "تمت الإضافة إلى السلة", description: "تمت إضافة المخيم إلى سلتك بنجاح." });
//     } catch (e: any) {
//       toast({ title: "تعذر الإضافة إلى السلة", description: String(e?.message || e), variant: "destructive" });
//     } finally {
//       setHeartBusy(false);
//     }
//   }

//   // ——— نموذج الحجز (واتساب) ———
//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [bookingBusy, setBookingBusy] = useState(false);
//   const [bookingError, setBookingError] = useState("");

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [guests, setGuests] = useState(1);
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [notes, setNotes] = useState("");

//   // رقم واتساب المستلم
//   const waNumber = "01559434566";

//   function openBookingDialog() {
//     setCustomerName("");
//     setCustomerPhone("");
//     setGuests(1);
//     setStartDate("");
//     setEndDate("");
//     setNotes("");
//     setBookingError("");
//     setBookingOpen(true);
//   }

//   function bookNow() {
//     setBookingError("");
//     // تحقق أساسي
//     if (!startDate || !endDate) {
//       setBookingError("يرجى تحديد تاريخ الوصول والمغادرة.");
//       return;
//     }
//     const sd = new Date(startDate);
//     const ed = new Date(endDate);
//     if (isNaN(sd.getTime()) || isNaN(ed.getTime()) || sd > ed) {
//       setBookingError("تواريخ غير صحيحة، تحقق من نطاق التاريخ.");
//       return;
//     }
//     if (!Number.isFinite(Number(guests)) || Number(guests) < 1) {
//       setBookingError("يرجى إدخال عدد ضيوف صحيح (1 فأكثر).");
//       return;
//     }

//     setBookingBusy(true);
//     try {
//       const lines = [
//         `طلب حجز مخيم`,
//         `المخيم: ${safeTitle} (ID: ${id})`,
//         `الوصول: ${startDate}`,
//         `المغادرة: ${endDate}`,
//         `الضيوف: ${guests}`,
//         customerName?.trim() ? `الاسم: ${customerName.trim()}` : null,
//         customerPhone?.trim() ? `الهاتف: ${customerPhone.trim()}` : null,
//         notes?.trim() ? `ملاحظات: ${notes.trim()}` : null,
//         `رابط المخيم: ${window.location.origin}/camps/${id}`,
//       ].filter(Boolean);
//       const text = encodeURIComponent(lines.join("\n"));
//       const url = `https://wa.me/${waNumber}?text=${text}`;
//       window.open(url, "_blank", "noopener,noreferrer");
//     } finally {
//       setBookingBusy(false);
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       whileHover={{ y: -4 }}
//       dir="rtl"
//     >
//       <Card className="overflow-hidden shadow-nature-md hover:shadow-nature-lg transition-smooth group">
//         <div className="relative h-64 overflow-hidden">
//           <motion.img
//             src={safeImage}
//             alt={safeTitle}
//             className="w-full h-full object-cover"
//             onError={(e) => { e.currentTarget.src = FALLBACK; }}
//             whileHover={{ scale: 1.06 }}
//             transition={{ type: "spring", stiffness: 240, damping: 18 }}
//           />
//           <button
//             onClick={handleHeartClick}
//             className="absolute top-4 left-4 p-0 bg-transparent hover:bg-transparent transition-smooth"
//             aria-label="إضافة إلى السلة"
//             type="button"
//             disabled={heartBusy}
//           >
//             <Heart className={`w-5 h-5 text-red-500 fill-red-500 ${heartBusy ? "opacity-70" : ""}`} />
//           </button>

//           <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
//             {formatUSD(safePrice)} / الليلة
//           </div>
//         </div>

//         <CardContent className="p-4">
//           <h3 className="text-xl font-bold mb-2">{safeTitle}</h3>
//           <div className="flex items-center gap-2 text-muted-foreground mb-3">
//             <MapPin className="w-4 h-4" />
//             <span>{computedLocation}</span>
//           </div>

//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-1">
//               <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
//               <span className="font-medium">{safeRating ? safeRating.toFixed(1) : "-"}</span>
//               <span className="text-muted-foreground text-sm">(تقييم)</span>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* انتقل لصفحة التفاصيل */}
//               <Button variant="secondary" size="sm" asChild>
//                 <Link to={`/camps/${id}`}>التفاصيل</Link>
//               </Button>

//               {/* الحجز: استدعاء الأب أو فتح النموذج الداخلي */}
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={() => (onBookClick ? onBookClick(id) : openBookingDialog())}
//               >
//                 احجز الآن
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Dialog الحجز الداخلي */}
//       <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
//         <DialogContent className="max-w-md" dir="rtl">
//           <DialogHeader>
//             <DialogTitle>إنشاء حجز</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div className="text-sm text-muted-foreground">
//               {`المخيم: ${safeTitle}`}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div>
//                 <label className="text-xs text-muted-foreground">تاريخ الوصول</label>
//                 <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//               </div>
//               <div>
//                 <label className="text-xs text-muted-foreground">تاريخ المغادرة</label>
//                 <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//               </div>
//               <div>
//                 <label className="text-xs text-muted-foreground">عدد الضيوف</label>
//                 <Input
//                   type="number"
//                   min={1}
//                   value={guests}
//                   onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-muted-foreground">اسم العميل (اختياري)</label>
//                 <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم بالكامل" />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs text-muted-foreground">هاتف (اختياري)</label>
//                 <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الهاتف" />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs text-muted-foreground">ملاحظات (اختياري)</label>
//                 <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أي تفاصيل إضافية" />
//               </div>
//             </div>

//             {bookingError && <div className="text-xs text-destructive">{bookingError}</div>}

//             <Button className="w-full flex items-center justify-center gap-2" type="button" onClick={bookNow} disabled={bookingBusy}>
//               {/* أيقونة واتساب صغيرة */}
//               <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden="true">
//                 <path
//                   fill="#25D366"
//                   d="M19.11 17.67c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.7.15-.21.3-.8.97-.98 1.17-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.5-1.77-1.68-2.07-.18-.3-.02-.47.13-.62.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53l-.6-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.13-.26-.2-.56-.35z"
//                 />
//                 <path
//                   fill="#25D366"
//                   d="M26.6 5.4C23.7 2.5 20 1 16 1 8.8 1 3 6.8 3 14c0 2.4.6 4.7 1.8 6.7L3 31l10.5-1.7c1.9 1 4.1 1.7 6.5 1.7 7.2 0 13-5.8 13-13 0-4-1.6-7.7-4.4-10.6zM16 28.7c-2.1 0-4.1-.6-5.9-1.6l-.4-.2-6.2 1 1.2-6-.2-.4C3.6 19.5 3 16.8 3 14 3 7.5 8.5 2 15 2c3.7 0 7.1 1.5 9.5 3.9C26.9 7.5 28 10.1 28 13c0 6.5-5.5 11.7-12 11.7z"
//                 />
//               </svg>
//               {bookingBusy ? "جارٍ إنشاء الحجز…" : "احجز الآن (واتساب)"}
//             </Button>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setBookingOpen(false)}>إلغاء</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </motion.div>
//   );
// };

// export default CampCard;
