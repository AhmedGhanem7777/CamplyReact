// src/pages/JoinUs.jsx
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* قوائم ثابتة (نفس الديزاين) */
// const propertyTypes = ["خيمة","نُزل","عريش","كرافان","بود","غلمبينغ"];

const arabCountries = [
  "مصر",
  "السعودية",
  "الإمارات",
  "الكويت",
  "قطر",
  "البحرين",
  "عمان",
  "الأردن",
  "لبنان",
  "سوريا",
  "فلسطين",
  "العراق",
  "اليمن",
  "المغرب",
  "الجزائر",
  "تونس",
  "ليبيا",
  "السودان",
  "موريتانيا",
  "جيبوتي",
  "الصومال",
  "جزر القمر"
];


// أنواع المخيمات (عربي موحّد)
const propertyTypes = [
  "مخيمات الخيام التقليدية (Tent Camping)",
  "(RV / Caravan Camping) مخيمات الكرفانات ",
  "مخيمات الغابات والجبال (Forest / Mountain Camps)",
  "التخييم الفندقي (Glamorous Camping)",
  "Safari / Dome / Bubble خيام",
  "مخيمات بيئية (Eco Camps)",
  "مخيمات المزارع (Farm Camps)",
  "مخيمات الشواطئ (Beach Camps)",
  "مخيمات الصحراء (Desert Camps)",
  "مخيمات المغامرات (Adventure Camps)",
  "مخيمات الفلك والنجوم (Astronomy Camps)",
  "مخيمات اليوغا والعافية (Wellness Camps)",
];



// const countriesList = [
//   { code: "OM", label: "عمان" },
//   { code: "AE", label: "الإمارات" },
//   { code: "SA", label: "السعودية" },
//   { code: "QA", label: "قطر" },
//   { code: "KW", label: "الكويت" },
//   { code: "BH", label: "البحرين" },
//   { code: "JO", label: "الأردن" },
//   { code: "EG", label: "مصر" },
//   { code: "MA", label: "المغرب" },
//   { code: "TN", label: "تونس" },
//   { code: "LB", label: "لبنان" },
// ];

const countriesList = [
  { code: "DZ", label: "الجزائر" },
  { code: "BH", label: "البحرين" },
  { code: "KM", label: "جزر القمر" },
  { code: "DJ", label: "جيبوتي" },
  { code: "EG", label: "مصر" },
  { code: "IQ", label: "العراق" },
  { code: "JO", label: "الأردن" },
  { code: "KW", label: "الكويت" },
  { code: "LB", label: "لبنان" },
  { code: "LY", label: "ليبيا" },
  { code: "MR", label: "موريتانيا" },
  { code: "MA", label: "المغرب" },
  { code: "OM", label: "عمان" },
  { code: "PS", label: "فلسطين" },
  { code: "QA", label: "قطر" },
  { code: "SA", label: "السعودية" },
  { code: "SO", label: "الصومال" },
  { code: "SD", label: "السودان" },
  { code: "SY", label: "سوريا" },
  { code: "TN", label: "تونس" },
  { code: "AE", label: "الإمارات العربية المتحدة" },
  { code: "YE", label: "اليمن" },
];



const documentTypes = [
  { code: "ID", label: "Identity card" },
  { code: "PASS", label: "Passport" },
  { code: "DL", label: "Driving license" },
];

/* مجموعات الميزات (نفس الديزاين) */
const basicAmenities = ["WiFi","تكييف","تدفئة","مولد كهرباء","إضاءة"];
const bathAmenities = ["حمام خاص","دش ساخن","مناشف","صابون","شامبو"];
const kitchenAmenities = ["مطبخ مجهز","ثلاجة","موقد","أواني طبخ","مياه شرب"];
const outdoorAmenities = ["شواء","جلسة خارجية","كراسي","طاولة","مظلة"];

const facilities = ["موقف سيارات","أمن","نظافة","استقبال 24 ساعة","خدمة غرف"];
const sharedSpaces = ["صالة مشتركة","مطبخ مشترك","حديقة","مسبح","ملعب"];
const seclusionOptions = ["منعزل تماماً","شبه منعزل","بجانب مخيمات أخرى","في منطقة سياحية"];
const activities = ["رحلات استكشافية","سفاري","صيد","سباحة","تسلق","نجوم"];
const terrainOptions = ["صحراء","جبال","شاطئ","واحة","غابة","سهول"];

/* أنواع الأسرّة (تفصيل عدّاد كما طلبت) */
const bedTypes = [
  { key: "king", label: "سرير مزدوج كبير (كينغ)" },
  { key: "queen", label: "سرير مزدوج (كوين)" },
  { key: "double", label: "سرير مزدوج عادي" },
  { key: "twin", label: "سرير مفرد" },
  { key: "bunk", label: "سرير بطابقين" },
  { key: "sofa", label: "سرير أريكة" },
  { key: "crib", label: "سرير أطفال" },
  { key: "air", label: "سرير هوائي / قابل للنفخ" },
];

/* الخطوة 1: أنشئ ملفك الشخصي */
function StepProfile({ data, setData, onOpenPrivacy, onOpenTerms }) {
  const update = (patch) => setData((d) => ({ ...d, profile: { ...d.profile, ...patch } }));

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold">🏕️ أضف مخيم جديد</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">نوع الوثيقة (Document type)*</label>
          <Select value={data.profile.docType} onValueChange={(v) => update({ docType: v })}>
            <SelectTrigger><SelectValue placeholder="اختر نوع الوثيقة" /></SelectTrigger>
            <SelectContent>
              {documentTypes.map((dt) => (
                <SelectItem key={dt.code} value={dt.code}>{dt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">رقم الوثيقة (Document number)*</label>
          <Input value={data.profile.docNumber} onChange={(e) => update({ docNumber: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">بلد الإصدار (Country of issue)*</label>
          <Select value={data.profile.docCountry} onValueChange={(v) => update({ docCountry: v })}>
            <SelectTrigger><SelectValue placeholder="اختر بلد الإصدار" /></SelectTrigger>
            <SelectContent>
              {countriesList.map((ct) => (
                <SelectItem key={ct.code} value={ct.code}>{ct.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">الدولة (Country)</label>
          <Select value={data.profile.country} onValueChange={(v) => update({ country: v })}>
            <SelectTrigger><SelectValue placeholder="اختر الدولة" /></SelectTrigger>
            <SelectContent>
              {countriesList.map((ct) => (
                <SelectItem key={ct.code} value={ct.code}>{ct.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">العملة</label>
          <Input value="USD – الدولار الأمريكي" readOnly />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">لماذا ترغب في الإدراج؟ (اختياري)</label>
        <Textarea rows={3} value={data.profile.why} onChange={(e) => update({ why: e.target.value })} placeholder="اكتب بإيجاز سبب رغبتك في الإدراج..." />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox id="agree" checked={data.profile.agreeTerms} onCheckedChange={(v) => update({ agreeTerms: !!v })} />
          <label htmlFor="agree" className="text-sm cursor-pointer">✅ أوافق على الشروط والأحكام وسياسة حماية البيانات</label>
        </div>

        {/* روابط الشروط والخصوصية أسفل سطر الموافقة مباشرة */}
        <div className="text-xs text-muted-foreground">
          يمكنك الاطلاع على
          {" "}
          <button type="button" onClick={onOpenPrivacy} className="underline hover:text-foreground transition-colors">
            سياسة الخصوصية
          </button>
          {" "}
          و
          {" "}
          <button type="button" onClick={onOpenTerms} className="underline hover:text-foreground transition-colors">
            الشروط والأحكام
          </button>
          {" "}
          الخاصة بمنصة كامبلي قبل المتابعة.
        </div>
      </div>
    </div>
  );
}

/* الخطوة 2: الأساسيات الخاصة بالمخيم */
function StepBasics({ data, setData }) {
  const updateBasics = (patch) => setData((d) => ({ ...d, basics: { ...d.basics, ...patch } }));
  const updateDesc = (patch) => setData((d) => ({ ...d, description: { ...d.description, ...patch } }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">اسم المخيم *</label>
          <Input value={data.basics.name} onChange={(e) => updateBasics({ name: e.target.value })} placeholder="مثال: مخيم الرمال الذهبية" />
        </div>
        <div>
          <label className="text-sm font-medium">نوع المخيم *</label>
          <Select value={data.basics.propertyType} onValueChange={(v) => updateBasics({ propertyType: v })}>
            <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
            <SelectContent>
              {propertyTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">الموقع الإلكتروني (اختياري)</label>
          <Input value={data.basics.website} onChange={(e) => updateBasics({ website: e.target.value })} placeholder="https://example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">وصف المخيم *</label>
        <Textarea value={data.description.summary} onChange={(e) => updateDesc({ summary: e.target.value })} rows={4} placeholder="اكتب وصفاً جذاباً لمخيمك..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">خدمات إضافية للضيوف</label>
        <Textarea value={data.description.guestServices} onChange={(e) => updateDesc({ guestServices: e.target.value })} rows={3} placeholder="مثال: توصيل من المطار، جولات سياحية..." />
      </div>
    </div>
  );
}

/* الخطوة 3: الموقع */
function StepLocation({ data, setData }) {
  const update = (patch) => setData((d) => ({ ...d, location: { ...d.location, ...patch } }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div>
  <label className="text-sm font-medium">الدولة (Country)*</label>

  <Select
    value={data.profile.country || undefined}
    onValueChange={(v) => update({ country: v })}
  >
    <SelectTrigger className="w-full">
      <SelectValue dir="rtl" placeholder="اختر الدولة" />
    </SelectTrigger>

    <SelectContent className="max-h-60 overflow-auto" dir="rtl">
      {arabCountries.map((country) => (
        <SelectItem key={country} value={country}>
          {country}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

</div>

        <div>
          <label className="text-sm font-medium">المحافظة *</label>
          <Input value={data.location.state} onChange={(e) => update({ state: e.target.value })}  />
        </div>
        <div>
          <label className="text-sm font-medium">المدينة *</label>
          <Input value={data.location.city} onChange={(e) => update({ city: e.target.value })}  />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">الرمز البريدي</label>
          <Input value={data.location.zip} onChange={(e) => update({ zip: e.target.value })}  />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">العنوان التفصيلي</label>
          <Input value={data.location.street} onChange={(e) => update({ street: e.target.value })} placeholder="الشارع، المعالم القريبة..." />
        </div>
      </div>
    </div>
  );
}

/* الخطوة 4: السعة + الأسرّة (بعد التعديل إلى عدّادات) */
function StepCapacity({ data, setData }) {
  const update = (patch) => setData((d) => ({ ...d, capacity: { ...d.capacity, ...patch } }));

  const totalBeds = Object.values(data.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">أقصى عدد ضيوف *</label>
          <Input
            type="number"
            min={1}
            value={data.capacity.maxGuests}
            onChange={(e) => update({ maxGuests: Math.max(1, Number(e.target.value) || 1) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">عدد غرف النوم</label>
          <Input
            type="number"
            min={0}
            value={data.capacity.bedrooms}
            onChange={(e) => update({ bedrooms: Math.max(0, Number(e.target.value) || 0) })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">أنواع الأسرّة المتوفرة</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bedTypes.map((b) => (
            <div key={b.key} className="flex items-center justify-between border rounded-lg p-3">
              <span className="text-sm">{b.label}</span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => update({ beds: { ...data.capacity.beds, [b.key]: Math.max(0, (data.capacity.beds[b.key] || 0) - 1) } })}>−</Button>
                <Input
                  type="number"
                  min={0}
                  value={data.capacity.beds[b.key] || 0}
                  onChange={(e) => update({ beds: { ...data.capacity.beds, [b.key]: Math.max(0, Number(e.target.value) || 0) } })}
                  className="w-20 text-center"
                />
                <Button type="button" variant="outline" onClick={() => update({ beds: { ...data.capacity.beds, [b.key]: Math.min(20, (data.capacity.beds[b.key] || 0) + 1) } })}>+</Button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">إجمالي الأسرّة: {totalBeds}</p>
      </div>
    </div>
  );
}

/* الخطوة 5: المرافق والخدمات */
function StepFeatures({ data, setData }) {
  const updateAmenities = (category, item) => {
    const current = data.features.amenities[category] || [];
    const exists = current.includes(item);
    const newItems = exists ? current.filter(i => i !== item) : [...current, item];
    setData((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, [category]: newItems } } }));
  };
  const toggleFeature = (list, item, key) => {
    const current = data.features[key] || [];
    const exists = current.includes(item);
    const newItems = exists ? current.filter(i => i !== item) : [...current, item];
    setData((d) => ({ ...d, features: { ...d.features, [key]: newItems } }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-md font-semibold">الخدمات الأساسية</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {basicAmenities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`basic-${item}`} checked={(data.features.amenities.basic || []).includes(item)} onCheckedChange={() => updateAmenities('basic', item)} />
              <label htmlFor={`basic-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold">مرافق الحمام</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {bathAmenities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`bath-${item}`} checked={(data.features.amenities.bath || []).includes(item)} onCheckedChange={() => updateAmenities('bath', item)} />
              <label htmlFor={`bath-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold">مرافق المطبخ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {kitchenAmenities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`kitchen-${item}`} checked={(data.features.amenities.kitchen || []).includes(item)} onCheckedChange={() => updateAmenities('kitchen', item)} />
              <label htmlFor={`kitchen-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold">مرافق خارجية</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {outdoorAmenities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`outdoor-${item}`} checked={(data.features.amenities.outdoor || []).includes(item)} onCheckedChange={() => updateAmenities('outdoor', item)} />
              <label htmlFor={`outdoor-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold">خدمات عامة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {facilities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`facility-${item}`} checked={(data.features.facilities || []).includes(item)} onCheckedChange={() => toggleFeature(facilities, item, 'facilities')} />
              <label htmlFor={`facility-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* الخطوة 6: البيئة والأنشطة + مدى العزلة */
function StepEnvironment({ data, setData }) {
  const toggleFeature = (list, item, key) => {
    const current = data.environment[key] || [];
    const exists = current.includes(item);
    const newItems = exists ? current.filter(i => i !== item) : [...current, item];
    setData((d) => ({ ...d, environment: { ...d.environment, [key]: newItems } }));
  };
  const updateSeclusion = (value) => setData((d) => ({ ...d, environment: { ...d.environment, seclusion: value } }));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-md font-semibold">نوع التضاريس المحيطه بالمخيم</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {terrainOptions.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`terrain-${item}`} checked={(data.environment.terrain || []).includes(item)} onCheckedChange={() => toggleFeature(terrainOptions, item, 'terrain')} />
              <label htmlFor={`terrain-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-md font-semibold">مستوى العزلة</label>
        <Select value={data.environment.seclusion || ""} onValueChange={updateSeclusion}>
          <SelectTrigger dir="rtl"><SelectValue dir="rtl" placeholder="اختر مستوى العزلة" /></SelectTrigger>
          <SelectContent>
            {seclusionOptions.map((option) => (
              <SelectItem dir="rtl" key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <div className="space-y-3">
  <label className="text-md font-semibold">مستوى العزلة</label>
  <Select
    value={data.environment.seclusion || ""}
    onValueChange={updateSeclusion}
  >
    <SelectTrigger dir="rtl">
      <SelectValue dir="rtl" placeholder="اختر مستوى العزلة" />
    </SelectTrigger>

    <SelectContent dir="rtl" className="text-right">
      {seclusionOptions.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div> */}


      <div className="space-y-3">
        <h3 className="text-md font-semibold">أنشطة متوفرة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {activities.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`activity-${item}`} checked={(data.environment.activities || []).includes(item)} onCheckedChange={() => toggleFeature(activities, item, 'activities')} />
              <label htmlFor={`activity-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold">مساحات مشتركة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sharedSpaces.map((item) => (
            <div key={item} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id={`shared-${item}`} checked={(data.environment.sharedSpaces || []).includes(item)} onCheckedChange={() => toggleFeature(sharedSpaces, item, 'sharedSpaces')} />
              <label htmlFor={`shared-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* الخطوة 7: القواعد والتسعير + الحد الأدنى للعمر */
function StepRulesPricing({ data, setData }) {
  const updateRules = (patch) => setData((d) => ({ ...d, rules: { ...d.rules, ...patch } }));
  const updatePricing = (patch) => setData((d) => ({ ...d, pricing: { ...d.pricing, ...patch } }));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-md font-semibold">أوقات الدخول والخروج</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">بداية تسجيل الدخول</label>
            <Input type="time" value={data.rules.checkInFrom} onChange={(e) => updateRules({ checkInFrom: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">نهاية تسجيل الدخول</label>
            <Input type="time" value={data.rules.checkInTo} onChange={(e) => updateRules({ checkInTo: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">تسجيل الخروج</label>
            <Input type="time" value={data.rules.checkOut} onChange={(e) => updateRules({ checkOut: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">الحد الأدنى للعمر (سنة)</label>
            <Input type="number" min={0} value={data.rules.minAge} onChange={(e) => updateRules({ minAge: Math.max(0, Number(e.target.value) || 0) })} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-semibold">التسعير (دولار أمريكي) *</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 border rounded-lg">
            <h4 className="font-medium text-center">الأيام العادية</h4>
            <div>
              <label className="text-sm">مع المبيت</label>
              <Input type="number" min={0} step="0.5" value={data.pricing.weekday_with_accommodation}
                     onChange={(e) => updatePricing({ weekday_with_accommodation: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
            <div>
              <label className="text-sm">بدون المبيت</label>
              <Input type="number" min={0} step="0.5" value={data.pricing.weekday_without_accommodation}
                     onChange={(e) => updatePricing({ weekday_without_accommodation: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          </div>
          <div className="space-y-3 p-4 border rounded-lg">
            <h4 className="font-medium text-center">أيام العطل والمناسبات</h4>
            <div>
              <label className="text-sm">مع المبيت</label>
              <Input type="number" min={0} step="0.5" value={data.pricing.holiday_with_accommodation}
                     onChange={(e) => updatePricing({ holiday_with_accommodation: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
            <div>
              <label className="text-sm">بدون المبيت</label>
              <Input type="number" min={0} step="0.5" value={data.pricing.holiday_without_accommodation}
                     onChange={(e) => updatePricing({ holiday_without_accommodation: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">أدخل القيم المناسبة، ويمكنك ترك غير المتاح بقيمة 0.</div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">قواعد وشروط إضافية (اختياري)</label>
        <Textarea rows={3} value={data.rules.additionalRules || ""} onChange={(e) => setData((d)=>({ ...d, rules: { ...d.rules, additionalRules: e.target.value } }))} placeholder="مثال: هدوء بعد 10 م، ممنوع التدخين..." />
      </div>
    </div>
  );
}

/* الخطوة 8: الصور (حد أدنى 5 صور) */
function StepImages({ data, setData }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">صور المخيم *</label>
        <Input type="file" multiple accept="image/*"
               onChange={(e) => setData((d) => ({ ...d, files: Array.from(e.target.files || []) }))} />
        <div className="text-xs text-muted-foreground mt-2">ارفع عدة صور عالية الجودة. الصورة الأولى ستكون الرئيسية.</div>
      </div>
      {data.files.length > 0 && (
        <div className="text-sm text-green-600">
          تم اختيار {data.files.length} صورة
        </div>
      )}
    </div>
  );
}

/* الخطوة 9: المراجعة النهائية */
function StepReview({ data }) {
  const totalBeds = Object.values(data.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);

  return (
    <div className="space-y-6 text-sm">
      <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /> مراجعة البيانات قبل الإرسال</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="font-semibold">إنشاء مخيم جديد</h4>
          <div><strong>الدولة:</strong> {data.profile.country || "-"}</div>
          <div><strong>الوثيقة:</strong> {data.profile.docType || "-"} / {data.profile.docNumber || "-"} / {data.profile.docCountry || "-"}</div>
          <div><strong>العملة:</strong> USD – الدولار الأمريكي</div>
          <div><strong>السبب:</strong> {data.profile.why || "-"}</div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">المخيم</h4>
          <div><strong>الاسم:</strong> {data.basics.name || "-"}</div>
          <div><strong>النوع:</strong> {data.basics.propertyType || "-"}</div>
          <div><strong>الموقع:</strong> {[data.location.city, data.location.state, data.location.country].filter(Boolean).join(", ") || "-"}</div>
          <div><strong>الضيوف:</strong> {data.capacity.maxGuests || 0}</div>
          <div><strong>غرف النوم:</strong> {data.capacity.bedrooms || 0}</div>
          <div><strong>إجمالي الأسرّة:</strong> {totalBeds}</div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">التسعير</h4>
          <div><strong>عادي مع مبيت:</strong> {data.pricing.weekday_with_accommodation || 0}</div>
          <div><strong>عادي بدون مبيت:</strong> {data.pricing.weekday_without_accommodation || 0}</div>
          <div><strong>عطلة مع مبيت:</strong> {data.pricing.holiday_with_accommodation || 0}</div>
          <div><strong>عطلة بدون مبيت:</strong> {data.pricing.holiday_without_accommodation || 0}</div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">الخدمات والبيئة</h4>
          <div><strong>أساسية:</strong> {(data.features.amenities.basic || []).length} عنصر</div>
          <div><strong>حمام:</strong> {(data.features.amenities.bath || []).length} عنصر</div>
          <div><strong>مطبخ:</strong> {(data.features.amenities.kitchen || []).length} عنصر</div>
          <div><strong>خارجية:</strong> {(data.features.amenities.outdoor || []).length} عنصر</div>
          <div><strong>تضاريس:</strong> {(data.environment.terrain || []).length} نوع</div>
          <div><strong>أنشطة:</strong> {(data.environment.activities || []).length} نشاط</div>
          <div><strong>عزلة:</strong> {data.environment.seclusion || "-"}</div>
          <div><strong>صور:</strong> {data.files.length}</div>
        </div>
      </div>
    </div>
  );
}

/* الصفحة الرئيسية: JoinUs Wizard (نفس الديزاين) */
export default function JoinUs() {
  const { toast } = useToast();

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const [form, setForm] = useState({
    profile: {
      country: "",
      docType: "",
      docNumber: "",
      docCountry: "",
      why: "",
      agreeTerms: true,
    },
    basics: { name: "", propertyType: "", website: "" },
    description: { summary: "", guestServices: "" },
    location: { country: "", state: "", city: "", zip: "", street: "" },
    capacity: { maxGuests: 1, bedrooms: 0, beds: bedTypes.reduce((acc, b) => ({ ...acc, [b.key]: 0 }), {}) },
    features: { amenities: { basic: [], bath: [], kitchen: [], outdoor: [] }, facilities: [] },
    environment: { terrain: [], seclusion: "", activities: [], sharedSpaces: [] },
    rules: { checkInFrom: "14:00", checkInTo: "22:00", checkOut: "12:00", additionalRules: "", minAge: 18 },
    pricing: {
      weekday_with_accommodation: 0,
      weekday_without_accommodation: 0,
      holiday_with_accommodation: 0,
      holiday_without_accommodation: 0
    },
    files: [],
  });

  const steps = useMemo(() => ([
    { key: "profile", title: "إنشاء مخيم جديد", comp: <StepProfile data={form} setData={setForm} onOpenPrivacy={() => setPrivacyOpen(true)} onOpenTerms={() => setTermsOpen(true)} /> },
    { key: "basics", title: "الأساسيات", comp: <StepBasics data={form} setData={setForm} /> },
    { key: "location", title: "الموقع", comp: <StepLocation data={form} setData={setForm} /> },
    { key: "capacity", title: "السعة", comp: <StepCapacity data={form} setData={setForm} /> },
    { key: "features", title: "المرافق والخدمات", comp: <StepFeatures data={form} setData={setForm} /> },
    { key: "environment", title: "البيئة والأنشطة", comp: <StepEnvironment data={form} setData={setForm} /> },
    { key: "rulesPricing", title: "القواعد والتسعير", comp: <StepRulesPricing data={form} setData={setForm} /> },
    { key: "images", title: "الصور", comp: <StepImages data={form} setData={setForm} /> },
    { key: "review", title: "مراجعة", comp: <StepReview data={form} /> },
  ]), [form]);

  const [stepIndex, setStepIndex] = useState(0);
  const isFirst = stepIndex === 0;
  const isLast  = stepIndex === steps.length - 1;

  const validateStep = () => {
    const s = steps[stepIndex].key;

    if (s === "profile") {
      const p = form.profile;
      if (!p.docType) { toast({ title: "نوع الوثيقة مطلوب", variant: "destructive" }); return false; }
      if (!p.docNumber?.trim()) { toast({ title: "رقم الوثيقة مطلوب", variant: "destructive" }); return false; }
      if (!p.docCountry) { toast({ title: "بلد الإصدار مطلوب", variant: "destructive" }); return false; }
      if (!p.agreeTerms) { toast({ title: "يجب الموافقة على الشروط", variant: "destructive" }); return false; }
    }

    if (s === "basics") {
      if (!form.basics.name.trim()) { toast({ title: "اسم المخيم مطلوب", variant: "destructive" }); return false; }
      if (!form.basics.propertyType) { toast({ title: "نوع الملكية مطلوب", variant: "destructive" }); return false; }
      if (!form.description.summary.trim()) { toast({ title: "وصف المخيم مطلوب", variant: "destructive" }); return false; }
    }

    if (s === "location") {
      if (!form.location.country.trim()) { toast({ title: "الدولة مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.state.trim()) { toast({ title: "المحافظة/الولاية مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.city.trim()) { toast({ title: "المدينة مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.street.trim()) { toast({ title: "العنوان التفصيلي مطلوب", variant: "destructive" }); return false; }
    }

    if (s === "capacity") {
      const totalBeds = Object.values(form.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);
      if (form.capacity.maxGuests < 1) { toast({ title: "أقصى عدد ضيوف لا يقل عن 1", variant: "destructive" }); return false; }
      if (totalBeds < 1) { toast({ title: "أضف سريراً واحداً على الأقل", variant: "destructive" }); return false; }
    }

    if (s === "rulesPricing") {
      if ((form.rules.minAge ?? 0) < 0) { toast({ title: "الحد الأدنى للعمر غير صالح", variant: "destructive" }); return false; }
      const p = form.pricing;
      const prices = [p.weekday_with_accommodation, p.weekday_without_accommodation, p.holiday_with_accommodation, p.holiday_without_accommodation];
      const hasInvalid = prices.some((x) => !(Number.isFinite(x) && x >= 0));
      if (hasInvalid) { toast({ title: "تحقق من الأسعار", description: "يجب إدخال قيم صحيحة للأسعار.", variant: "destructive" }); return false; }
      if (prices.every(x => x === 0)) { toast({ title: "يجب إدخال سعر واحد على الأقل", variant: "destructive" }); return false; }
    }

    if (s === "images") {
      if ((form.files?.length || 0) < 5) { toast({ title: "الصور مطلوبة", description: "يرجى رفع 5 صور على الأقل.", variant: "destructive" }); return false; }
    }

    return true;
  };

  const next = () => { if (validateStep()) setStepIndex((i) => Math.min(i + 1, steps.length - 1)); };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const submit = async () => {
    try {
      const payload = {
        profile: {
          country: form.profile.country || null,
          document: {
            type: form.profile.docType,
            number: form.profile.docNumber?.trim(),
            countryOfIssue: form.profile.docCountry
          },
          reason: form.profile.why || null,
          currency: "USD",
        },
        basics: {
          name: form.basics.name.trim(),
          propertyType: form.basics.propertyType || null,
          website: form.basics.website || null
        },
        description: {
          summary: form.description.summary || null,
          guestServices: form.description.guestServices || null
        },
        location: {
          country: form.location.country || null,
          state: form.location.state || null,
          city: form.location.city || null,
          zip: form.location.zip || null,
          street: form.location.street || null
        },
        capacity: {
          maxGuests: form.capacity.maxGuests,
          bedrooms: form.capacity.bedrooms,
          beds: form.capacity.beds
        },
        facilities: form.features.facilities,
        amenities: form.features.amenities,
        sharedSpaces: form.environment.sharedSpaces,
        seclusion: form.environment.seclusion ? [form.environment.seclusion] : [],
        activities: { options: form.environment.activities },
        terrain: form.environment.terrain,
        rules: {
          checkInFrom: form.rules.checkInFrom,
          checkInTo: form.rules.checkInTo,
          checkOut: form.rules.checkOut,
          minAge: form.rules.minAge,
          additionalRules: form.rules.additionalRules || null
        },
        booking: {},
        pricing: {
          weekday: {
            withAccommodation: form.pricing.weekday_with_accommodation,
            withoutAccommodation: form.pricing.weekday_without_accommodation
          },
          holiday: {
            withAccommodation: form.pricing.holiday_with_accommodation,
            withoutAccommodation: form.pricing.holiday_without_accommodation
          }
        }
      };

      const fd = new FormData();
      fd.append("joinDataJson", JSON.stringify(payload));
      for (const f of form.files) fd.append("images", f);

      debugger
      await api.post("/api/camp-requests", fd, { headers: { "Content-Type": "multipart/form-data" } });

      toast({ title: "تم إرسال الطلب بنجاح!", description: "سيتم التواصل معك خلال 3-5 أيام عمل." });

      setStepIndex(0);
    } catch (err) {
      const message = err?.response?.data?.message || "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.";
      toast({ title: "خطأ", description: message, variant: "destructive" });
    }
  };

  return (
    <div dir="rtl">
      {/* رأس */}
      <section className="border-b bg-muted/40">
        <div className="container py-8">
          <h1 className="text-2xl md:text-3xl font-bold">انضم كمقدم مخيم</h1>
          <p className="text-muted-foreground mt-2">ابدأ بإنشاء ملفك الشخصي ثم أكمل بيانات المخيم خطوة بخطوة.</p>
        </div>
      </section>

      {/* المعالج */}
      <section className="py-8">
        <div className="container max-w-4xl">
          {/* شريط التقدم */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-sm font-medium">الخطوة {stepIndex + 1} من {steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300"
                   style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}></div>
            </div>
          </div>

          {/* عناوين الخطوات */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm">
            {steps.map((s, idx) => (
              <div key={s.key} className={`px-3 py-1 rounded-full border text-center ${
                idx === stepIndex ? "bg-primary text-primary-foreground" :
                idx < stepIndex ? "bg-green-100 text-green-700 border-green-300" : "bg-background"
              }`}>
                {s.title}
              </div>
            ))}
          </div>

          {/* محتوى الخطوة */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">{steps[stepIndex].title}</h2>
            {steps[stepIndex].comp}
          </div>

          {/* أزرار التنقل */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStepIndex((i) => Math.max(i - 1, 0))} disabled={isFirst} className="inline-flex items-center gap-2">
              <ChevronRight className="h-4 w-4 rotate-180" /> السابق
            </Button>
            {!isLast ? (
              <Button onClick={() => { if (validateStep()) setStepIndex((i) => Math.min(i + 1, steps.length - 1)); }} className="inline-flex items-center gap-2">
                التالي <ChevronLeft className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700">
                إرسال الطلب <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Dialog: سياسة الخصوصية */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>سياسة الخصوصية – منصة كامبلي (Camply)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-7">
            <p>1. المقدمة</p>
            <p>
              مرحبًا بكم في منصة كامبلي (Camply)، المنصة الإلكترونية المتخصصة لحجز المخيمات والتجارب السياحية في دول الخليج وبعض الدول العربية.
              نلتزم في كامبلي بحماية خصوصية المستخدمين وضمان سرية بياناتهم وفقًا للقوانين المعمول بها في سلطنة عُمان والدول الأخرى التي نقدم خدماتنا فيها.
            </p>

            <p>2. المعلومات التي نجمعها</p>
            <ul className="list-disc pr-5 space-y-1">
              <li>البيانات الشخصية (الاسم، رقم الهاتف، البريد الإلكتروني، الدولة، العملة).</li>
              <li>بيانات الحجز والدفع (عند استخدام خدمات الدفع الإلكتروني).</li>
              <li>بيانات الاستخدام (مثل الصفحات التي تزورها ونوع الجهاز وموقعك الجغرافي التقريبي).</li>
            </ul>

            <p>3. كيفية استخدام المعلومات</p>
            <ul className="list-disc pr-5 space-y-1">
              <li>إدارة حسابك وتنفيذ الحجوزات.</li>
              <li>تحسين أداء المنصة وتجربتك كمستخدم.</li>
              <li>التواصل معك بشأن الحجوزات أو العروض الترويجية أو الدعم الفني.</li>
              <li>الالتزام بالمتطلبات القانونية والتنظيمية المعمول بها محليا أو إقليميا.</li>
            </ul>

            <p>4. حماية المعلومات</p>
            <p>
              تُخزن بياناتك في خوادم آمنة وتُحمى بتقنيات حديثة لمنع الوصول غير المصرح به. ولا نشارك بياناتك مع أي جهة خارجية إلا في الحالات التالية:
            </p>
            <ul className="list-disc pr-5 space-y-1">
              <li>عند الضرورة لتنفيذ الحجز مع أصحاب المخيمات.</li>
              <li>مع مزودي خدمات الدفع الإلكتروني المرخّصين داخل سلطنة عُمان أو خارجها.</li>
              <li>استجابة لطلب رسمي من الجهات القانونية المختصة.</li>
            </ul>

            <p>5. ملفات تعريف الارتباط (Cookies)</p>
            <p>
              نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل الأداء. حيث يمكنك تعطيلها من إعدادات المتصفح، لكن بعض أجزاء الموقع قد لا تعمل بشكل كامل.
            </p>

            <p>6. حقوق المستخدم</p>
            <ul className="list-disc pr-5 space-y-1">
              <li>الوصول إلى بياناته أو تعديلها أو طلب حذفها أو حذف حسابه بالكامل.</li>
              <li>إلغاء الاشتراك في الرسائل التسويقية والنشرات الإخبارية عبر وسائل التواصل الاجتماعي أو البريد الإلكتروني في أي وقت.</li>
            </ul>

            <p>7. التعديلات</p>
            <p>
              تحتفظ إدارة كامبلي بحق تعديل هذه السياسة عند الحاجة، وسيتم إخطار المستخدمين بأي تحديثات عبر الموقع أو البريد الإلكتروني.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: الشروط والأحكام */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>الشروط والأحكام – منصة كامبلي (Camply)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm leading-7">
            <p>1. التعريفات</p>
            <ul className="list-disc pr-5 space-y-1">
              <li>المنصة: تشير إلى موقع وتطبيق كامبلي (Camply).</li>
              <li>المستخدم: هو أي شخص يقوم باستخدام المنصة سواء للتصفح أو الحجز سواء قام بإنشاء حساب وتسجيل الدخول أو كان زائرا فقط.</li>
              <li>المضيف: هو مالك أو مدير المخيم الذي يعرض خدماته عبر المنصة.</li>
              <li>مسؤول المنصة: هو الشخص المخول بإدارة جميع محتويات المنصة والإشراف عليها حسب الإجراءات والسياسات المكتوبة.</li>
            </ul>

            <p>2. نطاق الخدمة</p>
            <p>
              تعمل كامبلي كوسيط تقني بين المستخدمين وأصحاب المخيمات لتسهيل عمليات البحث والحجز فقط، ولا تتحمل المنصة أي مسؤولية مباشرة عن جودة الخدمات المقدمة في مواقع التخييم.
            </p>

            <p>3. الحجز والدفع</p>
            <p>
              يمكن للمستخدم إتمام عملية الحجز عبر المنصة باستخدام خيارات الدفع المتاحة أو التواصل المباشر مع صاحب المخيم عبر الوسائل المتاحة حاليا لإتمام عملية الدفع وتأكيد الحجز.
            </p>
            <p>
              يُعتبر الحجز مؤكدًا بعد دفع العميل أو بعد استلام تأكيد من صاحب المخيم عبر قنوات التواصل المتاحة.
            </p>
            <p>
              تلتزم المنصة بحماية بضمان حقوق الطرفين وفق السياسات المعمول بها والشروط والأحكام.
            </p>

            <p>4. سياسة الحجز والإلغاء</p>
            <div className="space-y-1">
              <p>يُتاح للمضيفين اختيار إحدى السياسات التالية، وتُطبق تلقائيًا على كل حجز:</p>

              <p>سياسة مرنة (Flexible):</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>استرداد كامل: إذا تم الإلغاء قبل 24 ساعة على الأقل من يوم تسجيل الوصول.</li>
                <li>استرداد 50٪: إذا تم الإلغاء خلال 24 ساعة من يوم تسجيل الوصول.</li>
                <li>لا يوجد استرداد: إذا تم الإلغاء بعد يوم تسجيل الوصول.</li>
              </ul>

              <p>سياسة متوسطة (Moderate):</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>استرداد كامل: إذا تم الإلغاء قبل 5 أيام على الأقل من يوم تسجيل الوصول.</li>
                <li>استرداد 50٪: إذا تم الإلغاء خلال 5 أيام من يوم تسجيل الوصول.</li>
                <li>لا يوجد استرداد: إذا تم الإلغاء بعد يوم تسجيل الوصول.</li>
              </ul>

              <p>سياسة الخمسة عشر يومًا (Fifteen):</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>استرداد كامل: إذا تم الإلغاء خلال 48 ساعة من تأكيد الحجز، وقبل 15 يومًا على الأقل من يوم تسجيل الوصول.</li>
                <li>استرداد 50٪: إذا تم الإلغاء بعد مرور 48 ساعة على تأكيد الحجز، وقبل 15 يومًا على الأقل من يوم تسجيل الوصول.</li>
                <li>لا يوجد استرداد: إذا تم الإلغاء قبل أقل من 15 يومًا من يوم تسجيل الوصول.</li>
              </ul>

              <p>سياسة الثلاثين يومًا (Thirty):</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>استرداد كامل: إذا تم الإلغاء خلال 48 ساعة من تأكيد الحجز، وقبل 30 يومًا على الأقل من يوم تسجيل الوصول.</li>
                <li>استرداد 50٪: إذا تم الإلغاء بعد مرور 48 ساعة على تأكيد الحجز، وقبل 30 يومًا على الأقل من يوم تسجيل الوصول.</li>
                <li>لا يوجد استرداد: إذا تم الإلغاء قبل أقل من 30 يومًا من يوم تسجيل الوصول.</li>
              </ul>

              <div className="text-xs text-muted-foreground">
                ملاحظات: لا يمكن تعديل أو استرداد الحجوزات بعد تسجيل الوصول. وفي الظروف الطارئة (مثل الطقس أو قرارات حكومية) تحتفظ المنصة بحق مراجعة الاسترداد وتسويته.
              </div>
            </div>

            <p>5. مسؤوليات المستخدمين والمضيفين</p>
            <ul className="list-disc pr-5 space-y-1">
              <li>يجب إدخال بيانات صحيحة عند التسجيل أو الحجز.</li>
              <li>يُمنع نشر أي محتوى غير لائق أو مخالف للأنظمة أو حقوق الغير.</li>
            </ul>

            <p>6. حقوق الملكية الفكرية</p>
            <p>
              جميع حقوق التصميم والمحتوى والعلامة التجارية والتقنيات الخاصة بمنصة كامبلي (Camply) محفوظة. يُمنع نسخ أو إعادة استخدام أي جزء من الموقع دون إذن خطي مسبق من الإدارة.
            </p>

            <p>7. التعديلات</p>
            <p>
              تحتفظ المنصة بحق تعديل هذه الشروط أو تحديثها في أي وقت، وتصبح نافذة فور نشرها على الموقع.
            </p>

            <p>8. القانون المُنظّم</p>
            <p>
              تخضع هذه الشروط والأحكام لقوانين وأنظمة سلطنة عُمان، ويُحال أي نزاع إلى الجهات القضائية المختصة في السلطنة.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
