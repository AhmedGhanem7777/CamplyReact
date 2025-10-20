

// // import { useState, useEffect, useMemo } from "react";
// // import { Button } from "../components/ui/button";
// // import { Badge } from "../components/ui/badge";
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// // import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
// // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/dialog-alert";
// // import { Input } from "../components/ui/input";
// // import { Label } from "../components/ui/label";
// // import { Textarea } from "../components/ui/textarea";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
// // import { Separator } from "../components/ui/separator";
// // import { toast } from "../components/ui/use-toast";
// // import { Plus, Pencil, Trash2, Search, Loader2, Star, Eye, EyeOff } from "lucide-react";

// // interface Plan {
// //   id: number;
// //   name: string;
// //   price: number;
// //   currency: "OMR" | "SAR" | "AED" | "KWD" | "QAR" | "BHD";
// //   billingCycle: "شهري" | "سنوي";
// //   features: string[];
// //   isPopular: boolean;
// //   isActive: boolean;
// //   createdOn: string;
// // }

// // // بديل Switch
// // function ToggleSwitch({ checked, onCheckedChange, id }: { checked: boolean; onCheckedChange: (v: boolean) => void; id?: string }) {
// //   return (
// //     <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none">
// //       <div className={`w-10 h-6 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-400"}`}>
// //         <div className={`w-5 h-5 bg-white rounded-full transition-transform translate-y-0.5 ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
// //       </div>
// //       <input id={id} type="checkbox" className="hidden" checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} />
// //     </label>
// //   );
// // }

// // const generateMockPlans = (): Plan[] => [
// //   {
// //     id: 1,
// //     name: "الباقة الأساسية",
// //     price: 29,
// //     currency: "OMR",
// //     billingCycle: "شهري",
// //     features: ["عرض حتى 3 مخيمات", "دعم فني أساسي", "لوحة تحكم بسيطة", "إحصائيات شهرية"],
// //     isPopular: false,
// //     isActive: true,
// //     createdOn: new Date(2025, 0, 15).toISOString(),
// //   },
// //   {
// //     id: 2,
// //     name: "الباقة المتقدمة",
// //     price: 299,
// //     currency: "OMR",
// //     billingCycle: "سنوي",
// //     features: ["عرض حتى 10 مخيمات", "دعم فني على مدار الساعة", "لوحة تحكم متقدمة", "إحصائيات تفصيلية", "تقارير تحليلية", "أولوية في الظهور"],
// //     isPopular: true,
// //     isActive: true,
// //     createdOn: new Date(2025, 0, 10).toISOString(),
// //   },
// //   {
// //     id: 3,
// //     name: "الباقة المميزة",
// //     price: 799,
// //     currency: "OMR",
// //     billingCycle: "سنوي",
// //     features: ["عدد مخيمات غير محدود", "دعم مخصص VIP", "لوحة تحكم كاملة", "إحصائيات متقدمة وتقارير", "تكامل API", "مدير حساب مخصص", "ترويج مميز"],
// //     isPopular: false,
// //     isActive: true,
// //     createdOn: new Date(2025, 0, 5).toISOString(),
// //   },
// // ];

// // export default function AdminPlansPage() {
// //   const [plans, setPlans] = useState<Plan[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [debouncedSearch, setDebouncedSearch] = useState("");
// //   const [cycleFilter, setCycleFilter] = useState<"الكل" | "شهري" | "سنوي">("الكل");
// //   const [showActiveOnly, setShowActiveOnly] = useState(false);
// //   const [pageSize, setPageSize] = useState(6);
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Modal states
// //   const [isFormOpen, setIsFormOpen] = useState(false);
// //   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
// //   const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
// //   const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);

// //   // Form states
// //   const [formData, setFormData] = useState<Partial<Plan>>({
// //     name: "",
// //     price: 0,
// //     currency: "OMR",
// //     billingCycle: "شهري",
// //     features: [],
// //     isPopular: false,
// //     isActive: true,
// //   });
// //   const [featuresText, setFeaturesText] = useState("");

// //   // Simulate loading
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setPlans(generateMockPlans());
// //       setLoading(false);
// //     }, Math.random() * 200 + 400);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // Debounce search
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setDebouncedSearch(searchTerm);
// //       setCurrentPage(1);
// //     }, 300);
// //     return () => clearTimeout(timer);
// //   }, [searchTerm]);

// //   // Filtered and paginated plans
// //   const filteredPlans = useMemo(() => {
// //     let filtered = plans;

// //     if (debouncedSearch) {
// //       filtered = filtered.filter((p) => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
// //     }
// //     if (cycleFilter !== "الكل") {
// //       filtered = filtered.filter((p) => p.billingCycle === cycleFilter);
// //     }
// //     if (showActiveOnly) {
// //       filtered = filtered.filter((p) => p.isActive);
// //     }

// //     return filtered;
// //   }, [plans, debouncedSearch, cycleFilter, showActiveOnly]);

// //   const totalPages = Math.max(1, Math.ceil(filteredPlans.length / pageSize));
// //   const paginatedPlans = filteredPlans.slice((currentPage - 1) * pageSize, currentPage * pageSize);

// //   // Reset to page 1 when filters change
// //   useEffect(() => { setCurrentPage(1); }, [cycleFilter, showActiveOnly, pageSize]);

// //   const openAddModal = () => {
// //     setEditingPlan(null);
// //     setFormData({
// //       name: "",
// //       price: 0,
// //       currency: "OMR",
// //       billingCycle: "شهري",
// //       features: [],
// //       isPopular: false,
// //       isActive: true,
// //     });
// //     setFeaturesText("");
// //     setIsFormOpen(true);
// //   };

// //   const openEditModal = (plan: Plan) => {
// //     setEditingPlan(plan);
// //     setFormData(plan);
// //     setFeaturesText(plan.features.join("\n"));
// //     setIsFormOpen(true);
// //   };

// //   const handleSave = () => {
// //     if (!formData.name?.trim()) {
// //       toast({ title: "خطأ", description: "اسم الباقة مطلوب", variant: "destructive" });
// //       return;
// //     }
// //     if (!formData.price || formData.price <= 0) {
// //       toast({ title: "خطأ", description: "السعر يجب أن يكون أكبر من صفر", variant: "destructive" });
// //       return;
// //     }
// //     const features = featuresText.split("\n").map(f => f.trim()).filter(Boolean);
// //     if (features.length === 0) {
// //       toast({ title: "خطأ", description: "يجب إدخال ميزة واحدة على الأقل", variant: "destructive" });
// //       return;
// //     }

// //     const planData: Plan = {
// //       id: editingPlan ? editingPlan.id : Math.max(0, ...plans.map((p) => p.id)) + 1,
// //       name: formData.name!.trim(),
// //       price: Number(formData.price),
// //       currency: formData.currency!,
// //       billingCycle: formData.billingCycle!,
// //       features,
// //       isPopular: !!formData.isPopular,
// //       isActive: formData.isActive ?? true,
// //       createdOn: editingPlan ? editingPlan.createdOn : new Date().toISOString(),
// //     };

// //     setPlans(prev => {
// //       let next = editingPlan ? prev.map(p => (p.id === editingPlan.id ? planData : p)) : [...prev, planData];
// //       if (planData.isPopular) next = next.map(p => (p.id === planData.id ? p : { ...p, isPopular: false }));
// //       return next;
// //     });

// //     toast({ title: editingPlan ? "تم التعديل" : "تمت الإضافة", description: editingPlan ? "تم تحديث الباقة بنجاح" : "تم إضافة الباقة بنجاح" });
// //     setIsFormOpen(false);
// //   };

// //   const handleDelete = () => {
// //     if (deletingPlan) {
// //       setPlans((prev) => prev.filter((p) => p.id !== deletingPlan.id));
// //       toast({ title: "تم الحذف", description: "تم حذف الباقة بنجاح" });
// //       setIsDeleteOpen(false);
// //       setDeletingPlan(null);
// //     }
// //   };

// //   const togglePopular = (plan: Plan) => {
// //     setPlans((prev) =>
// //       prev.map((p) =>
// //         p.id === plan.id ? { ...p, isPopular: !p.isPopular } : { ...p, isPopular: false }
// //       )
// //     );
// //     toast({
// //       title: plan.isPopular ? "تم الإزالة" : "تم التعيين",
// //       description: plan.isPopular ? "تم إزالة الشيوع" : "تم جعلها شائعة",
// //     });
// //   };

// //   const toggleActive = (plan: Plan) => {
// //     setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, isActive: !p.isActive } : p)));
// //     toast({
// //       title: plan.isActive ? "تم التعطيل" : "تم التفعيل",
// //       description: plan.isActive ? "تم تعطيل الباقة" : "تم تفعيل الباقة",
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center" dir="rtl">
// //         <div className="flex flex-col items-center gap-3">
// //           <Loader2 className="h-8 w-8 animate-spin text-primary" />
// //           <p className="text-muted-foreground">جارٍ التحميل...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6 animate-fade-in" dir="rtl">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold">باقات الانضمام</h1>
// //         <p className="text-muted-foreground mt-1">إدارة الباقات والأسعار والمزايا</p>
// //       </div>

// //       <Separator />

// //       {/* Toolbar */}
// //       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
// //         <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
// //           {/* Search */}
// //           <div className="relative flex-1 max-w-sm">
// //             <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //             <Input placeholder="بحث بالاسم" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-9" />
// //           </div>

// //           {/* Cycle filter */}
// //           <Select value={cycleFilter} onValueChange={(v: any) => setCycleFilter(v)}>
// //             <SelectTrigger className="w-full sm:w-[160px]"><SelectValue /></SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="الكل">الكل</SelectItem>
// //               <SelectItem value="شهري">شهري</SelectItem>
// //               <SelectItem value="سنوي">سنوي</SelectItem>
// //             </SelectContent>
// //           </Select>

// //           {/* Active only toggle (بديل Switch) */}
// //           <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
// //             <ToggleSwitch checked={showActiveOnly} onCheckedChange={setShowActiveOnly} id="only-active" />
// //             <span className="text-sm font-medium">المفعّلة فقط</span>
// //           </div>
// //         </div>

// //         {/* Add button */}
// //         <Button onClick={openAddModal} className="w-full sm:w-auto">
// //           <Plus className="h-4 w-4" />
// //           إضافة باقة
// //         </Button>
// //       </div>

// //       {/* Plans Grid */}
// //       {paginatedPlans.length === 0 ? (
// //         <Card className="p-12">
// //           <div className="text-center text-muted-foreground">
// //             <p className="text-lg">لا توجد باقات مطابقة</p>
// //           </div>
// //         </Card>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {paginatedPlans.map((plan, idx) => (
// //             <Card key={plan.id} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
// //               <CardHeader>
// //                 <div className="flex items-start justify-between gap-2">
// //                   <CardTitle className="text-xl">{plan.name}</CardTitle>
// //                   <div className="flex gap-1 flex-wrap">
// //                     {plan.isPopular && (
// //                       <Badge variant="default" className="gap-1">
// //                         <Star className="h-3 w-3 fill-current" />
// //                         شائعة
// //                       </Badge>
// //                     )}
// //                     <Badge variant={plan.isActive ? "default" : "secondary"}>{plan.isActive ? "مفعّلة" : "معطّلة"}</Badge>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-baseline gap-1 mt-2">
// //                   <span className="text-3xl font-bold">{plan.price}</span>
// //                   <span className="text-muted-foreground">{plan.currency}</span>
// //                   <span className="text-sm text-muted-foreground">/ {plan.billingCycle}</span>
// //                 </div>
// //               </CardHeader>

// //               <CardContent className="flex-1">
// //                 <ul className="space-y-2">
// //                   {plan.features.map((feature, i) => (
// //                     <li key={i} className="flex items-start gap-2 text-sm">
// //                       <span className="text-primary mt-1">•</span>
// //                       <span>{feature}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </CardContent>

// //               <CardFooter className="flex flex-col gap-2">
// //                 <div className="flex gap-2 w-full">
// //                   <Button variant="outline" size="sm" onClick={() => openEditModal(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
// //                     <Pencil className="h-4 w-4" />
// //                     تعديل
// //                   </Button>
// //                   <Button variant="destructive" size="sm" onClick={() => { setDeletingPlan(plan); setIsDeleteOpen(true); }} className="flex-1 transition-all duration-200 hover:scale-105">
// //                     <Trash2 className="h-4 w-4" />
// //                     حذف
// //                   </Button>
// //                 </div>
// //                 <div className="flex gap-2 w-full">
// //                   <Button variant="secondary" size="sm" onClick={() => togglePopular(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
// //                     <Star className="h-4 w-4" />
// //                     {plan.isPopular ? "إزالة الشيوع" : "جعلها شائعة"}
// //                   </Button>
// //                   <Button variant="default" size="sm" onClick={() => toggleActive(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
// //                     {plan.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                     {plan.isActive ? "تعطيل" : "تفعيل"}
// //                   </Button>
// //                 </div>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //         </div>
// //       )}

// //       {/* Pagination */}
// //       {filteredPlans.length > 0 && (
// //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
// //           <div className="flex items-center gap-2">
// //             <span className="text-sm text-muted-foreground">عدد الصفوف:</span>
// //             <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
// //               <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="6">6</SelectItem>
// //                 <SelectItem value="9">9</SelectItem>
// //                 <SelectItem value="12">12</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <span className="text-sm text-muted-foreground">صفحة {currentPage} من {totalPages}</span>
// //           </div>

// //           <div className="flex gap-2">
// //             <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="transition-all duration-200 hover:scale-105 active:scale-95">
// //               السابق
// //             </Button>
// //             <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="transition-all duration-200 hover:scale-105 active:scale-95">
// //               التالي
// //             </Button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Add/Edit Modal */}
// //       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
// //         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
// //           <DialogHeader>
// //             <DialogTitle>{editingPlan ? "تعديل باقة" : "إضافة باقة"}</DialogTitle>
// //             <DialogDescription>{editingPlan ? "قم بتعديل بيانات الباقة أدناه" : "أدخل بيانات الباقة الجديدة"}</DialogDescription>
// //           </DialogHeader>

// //           <div className="space-y-4 py-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="name">اسم الباقة *</Label>
// //               <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="مثال: الباقة الأساسية" />
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="price">السعر *</Label>
// //                 <Input id="price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="currency">العملة *</Label>
// //                 <Select value={formData.currency} onValueChange={(v: any) => setFormData({ ...formData, currency: v })}>
// //                   <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="OMR">OMR</SelectItem>
// //                     <SelectItem value="SAR">SAR</SelectItem>
// //                     <SelectItem value="AED">AED</SelectItem>
// //                     <SelectItem value="KWD">KWD</SelectItem>
// //                     <SelectItem value="QAR">QAR</SelectItem>
// //                     <SelectItem value="BHD">BHD</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="cycle">الدورة *</Label>
// //               <Select value={formData.billingCycle} onValueChange={(v: any) => setFormData({ ...formData, billingCycle: v })}>
// //                 <SelectTrigger id="cycle"><SelectValue /></SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="شهري">شهري</SelectItem>
// //                   <SelectItem value="سنوي">سنوي</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="features">المزايا (اكتب كل سطر كميزة) *</Label>
// //               <Textarea id="features" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={"ميزة واحدة\nميزة ثانية\nميزة ثالثة"} rows={6} />
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <Label htmlFor="popular">شائعة</Label>
// //               <ToggleSwitch id="popular" checked={!!formData.isPopular} onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })} />
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <Label htmlFor="active">مفعّلة</Label>
// //               <ToggleSwitch id="active" checked={formData.isActive ?? true} onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })} />
// //             </div>
// //           </div>

// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setIsFormOpen(false)}>إلغاء</Button>
// //             <Button onClick={handleSave}>{editingPlan ? "حفظ التعديلات" : "إضافة"}</Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Delete Confirmation */}
// //       <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
// //         <AlertDialogContent dir="rtl">
// //           <AlertDialogHeader>
// //             <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
// //             <AlertDialogDescription>هل أنت متأكد من حذف الباقة "{deletingPlan?.name}"؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
// //           </AlertDialogHeader>
// //           <AlertDialogFooter>
// //             <AlertDialogCancel>إلغاء</AlertDialogCancel>
// //             <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">حذف</AlertDialogAction>
// //           </AlertDialogFooter>
// //         </AlertDialogContent>
// //       </AlertDialog>
// //     </div>
// //   );
// // }



























// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/dialog-alert";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Textarea } from "../components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
// import { Separator } from "../components/ui/separator";
// import { toast } from "../components/ui/use-toast";
// import { Plus, Pencil, Trash2, Search, Loader2, Star, Eye, EyeOff } from "lucide-react";

// interface Plan {
//   id: number;
//   name: string;
//   price: number;
//   currency: "OMR" | "SAR" | "AED" | "KWD" | "QAR" | "BHD" | string;
//   billingCycle: "شهري" | "سنوي" | string;
//   features: string[];
//   isPopular: boolean;
//   isActive: boolean;
//   createdOn: string;
// }

// interface PagedResponse<T> {
//   pageIndex: number;
//   pageSize: number;
//   count: number;
//   data: T[];
// }

// // بديل Switch
// function ToggleSwitch({ checked, onCheckedChange, id }: { checked: boolean; onCheckedChange: (v: boolean) => void; id?: string }) {
//   return (
//     <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none">
//       <div className={`w-10 h-6 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-gray-400"}`}>
//         <div className={`w-5 h-5 bg-white rounded-full transition-transform translate-y-0.5 ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
//       </div>
//       <input id={id} type="checkbox" className="hidden" checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} />
//     </label>
//   );
// }

// // API client
// const api = axios.create({
//   baseURL: (import.meta as any)?.env?.VITE_API_BASE_URL || "https://localhost:7105",
//   timeout: 20000,
//   headers: { "Content-Type": "application/json" },
// });

// function authHeaders() {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// export default function AdminPlansPage() {
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [totalCount, setTotalCount] = useState<number>(0);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [cycleFilter, setCycleFilter] = useState<"الكل" | "شهري" | "سنوي">("الكل");
//   const [showActiveOnly, setShowActiveOnly] = useState(false);
//   const [pageSize, setPageSize] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Modal states
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
//   const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);

//   // Form states
//   const [formData, setFormData] = useState<Partial<Plan>>({
//     name: "",
//     price: 0,
//     currency: "OMR",
//     billingCycle: "شهري",
//     features: [],
//     isPopular: false,
//     isActive: true,
//   });
//   const [featuresText, setFeaturesText] = useState("");

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//       setCurrentPage(1);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Fetch plans from API
//   const fetchPlans = async () => {
//     try {
//       setLoading(true);
//       const params: any = {
//         pageIndex: currentPage,
//         pageSize,
//       };
//       if (debouncedSearch?.trim()) params.search = debouncedSearch.trim();
//       if (cycleFilter !== "الكل") params.cycle = cycleFilter;
//       if (showActiveOnly) params.active = true;

//       const { data } = await api.get<PagedResponse<Plan>>("/api/admin/plans", {
//         params,
//         headers: { ...authHeaders() },
//       });

//       // تأكد من وجود features كمصفوفة لتوافق العرض الحالي
//       const withFeatures = (data?.data || []).map((p: any) => ({ features: [], ...p }));
//       setPlans(withFeatures);
//       setTotalCount(data?.count || 0);
//     } catch (err: any) {
//       toast({ title: "خطأ", description: err?.response?.data?.message || "تعذر جلب الباقات", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [debouncedSearch, cycleFilter, showActiveOnly, currentPage, pageSize]);

//   // Reset to page 1 when filters change (غير ضروري مع useEffect أعلاه لكنه يحسن التجربة)
//   useEffect(() => { setCurrentPage(1); }, [cycleFilter, showActiveOnly, pageSize]);

//   const openAddModal = () => {
//     setEditingPlan(null);
//     setFormData({
//       name: "",
//       price: 0,
//       currency: "OMR",
//       billingCycle: "شهري",
//       features: [],
//       isPopular: false,
//       isActive: true,
//     });
//     setFeaturesText("");
//     setIsFormOpen(true);
//   };

//   const openEditModal = async (plan: Plan) => {
//     try {
//       setEditingPlan(plan);
//       // جلب التفاصيل للحصول على الميزات
//       const { data } = await api.get(`/api/admin/plans/${plan.id}`, {
//         headers: { ...authHeaders() },
//       });
//       const details = data as Plan; // يتضمن features
//       setFormData({
//         id: details.id,
//         name: details.name,
//         price: details.price,
//         currency: details.currency,
//         billingCycle: details.billingCycle,
//         isPopular: details.isPopular,
//         isActive: details.isActive,
//       });
//       setFeaturesText((details.features || []).join("\n"));
//       setIsFormOpen(true);
//     } catch (err: any) {
//       toast({ title: "خطأ", description: err?.response?.data?.message || "تعذر جلب تفاصيل الباقة", variant: "destructive" });
//     }
//   };

//   const handleSave = async () => {
//     // تحقق الواجهة
//     if (!formData.name?.trim()) {
//       toast({ title: "خطأ", description: "اسم الباقة مطلوب", variant: "destructive" });
//       return;
//     }
//     if (!formData.price || Number(formData.price) <= 0) {
//       toast({ title: "خطأ", description: "السعر يجب أن يكون أكبر من صفر", variant: "destructive" });
//       return;
//     }
//     const features = featuresText.split("\n").map(f => f.trim()).filter(Boolean);
//     if (features.length === 0) {
//       toast({ title: "خطأ", description: "يجب إدخال ميزة واحدة على الأقل", variant: "destructive" });
//       return;
//     }

//     const dto = {
//       name: formData.name!.trim(),
//       price: Number(formData.price),
//       currency: formData.currency!,           // رموز ISO مثل OMR/SAR/AED...
//       billingCycle: formData.billingCycle!,   // "شهري" أو "سنوي"
//       features,
//       isPopular: !!formData.isPopular,
//       isActive: formData.isActive ?? true,
//     };

//     try {
//       if (editingPlan) {
//         await api.put(`/api/admin/plans/${editingPlan.id}`, dto, { headers: { ...authHeaders() } });
//         toast({ title: "تم التعديل", description: "تم تحديث الباقة بنجاح" });
//       } else {
//         await api.post(`/api/admin/plans`, dto, { headers: { ...authHeaders() } });
//         toast({ title: "تمت الإضافة", description: "تم إضافة الباقة بنجاح" });
//       }
//       setIsFormOpen(false);
//       fetchPlans();
//     } catch (err: any) {
//       const msg = err?.response?.data?.message || "تعذر حفظ الباقة";
//       toast({ title: "خطأ", description: msg, variant: "destructive" });
//     }
//   };

//   const handleDelete = async () => {
//     if (!deletingPlan) return;
//     try {
//       await api.delete(`/api/admin/plans/${deletingPlan.id}`, { headers: { ...authHeaders() } });
//       toast({ title: "تم الحذف", description: "تم حذف الباقة بنجاح" });
//       setIsDeleteOpen(false);
//       setDeletingPlan(null);
//       // إن كانت الصفحة أصبحت فارغة بعد الحذف، ارجع صفحة
//       if (plans.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
//       else fetchPlans();
//     } catch (err: any) {
//       toast({ title: "خطأ", description: err?.response?.data?.message || "تعذر حذف الباقة", variant: "destructive" });
//     }
//   };

//   const togglePopular = async (plan: Plan) => {
//     try {
//       await api.put(`/api/admin/plans/${plan.id}/set-popular`, null, { headers: { ...authHeaders() } });
//       toast({ title: "تم التعيين", description: "تم جعل الباقة شائعة (حصريًا)" });
//       fetchPlans();
//     } catch (err: any) {
//       toast({ title: "خطأ", description: err?.response?.data?.message || "تعذر تعيين الشيوع", variant: "destructive" });
//     }
//   };

//   const toggleActive = async (plan: Plan) => {
//     try {
//       await api.put(`/api/admin/plans/${plan.id}/toggle-active`, null, { headers: { ...authHeaders() } });
//       toast({ title: plan.isActive ? "تم التعطيل" : "تم التفعيل", description: plan.isActive ? "تم تعطيل الباقة" : "تم تفعيل الباقة" });
//       fetchPlans();
//     } catch (err: any) {
//       toast({ title: "خطأ", description: err?.response?.data?.message || "تعذر تبديل التفعيل", variant: "destructive" });
//     }
//   };

//   // مع الربط بالخادم: اعتمد بيانات الخادم مباشرة في الشبكة والترقيم
//   const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
//   const filteredPlans = plans;         // أصبحت البيانات مُفلترة/مرقمة على الخادم
//   const paginatedPlans = plans;        // تعرض الصفحة الحالية القادمة من الخادم

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" dir="rtl">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//           <p className="text-muted-foreground">جارٍ التحميل...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-fade-in" dir="rtl">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">باقات الانضمام</h1>
//         <p className="text-muted-foreground mt-1">إدارة الباقات والأسعار والمزايا</p>
//       </div>

//       <Separator />

//       {/* Toolbar */}
//       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//         <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
//           {/* Search */}
//           <div className="relative flex-1 max-w-sm">
//             <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input placeholder="بحث بالاسم" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-9" />
//           </div>

//           {/* Cycle filter */}
//           <Select value={cycleFilter} onValueChange={(v: any) => setCycleFilter(v)}>
//             <SelectTrigger className="w-full sm:w-[160px]"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="الكل">الكل</SelectItem>
//               <SelectItem value="شهري">شهري</SelectItem>
//               <SelectItem value="سنوي">سنوي</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Active only toggle (بديل Switch) */}
//           <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
//             <ToggleSwitch checked={showActiveOnly} onCheckedChange={setShowActiveOnly} id="only-active" />
//             <span className="text-sm font-medium">المفعّلة فقط</span>
//           </div>
//         </div>

//         {/* Add button */}
//         <Button onClick={openAddModal} className="w-full sm:w-auto">
//           <Plus className="h-4 w-4" />
//           إضافة باقة
//         </Button>
//       </div>

//       {/* Plans Grid */}
//       {paginatedPlans.length === 0 ? (
//         <Card className="p-12">
//           <div className="text-center text-muted-foreground">
//             <p className="text-lg">لا توجد باقات مطابقة</p>
//           </div>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {paginatedPlans.map((plan, idx) => (
//             <Card key={plan.id} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
//               <CardHeader>
//                 <div className="flex items-start justify-between gap-2">
//                   <CardTitle className="text-xl">{plan.name}</CardTitle>
//                   <div className="flex gap-1 flex-wrap">
//                     {plan.isPopular && (
//                       <Badge variant="default" className="gap-1">
//                         <Star className="h-3 w-3 fill-current" />
//                         شائعة
//                       </Badge>
//                     )}
//                     <Badge variant={plan.isActive ? "default" : "secondary"}>{plan.isActive ? "مفعّلة" : "معطّلة"}</Badge>
//                   </div>
//                 </div>
//                 <div className="flex items-baseline gap-1 mt-2">
//                   <span className="text-3xl font-bold">{plan.price}</span>
//                   <span className="text-muted-foreground">{plan.currency}</span>
//                   <span className="text-sm text-muted-foreground">/ {plan.billingCycle}</span>
//                 </div>
//               </CardHeader>

//               <CardContent className="flex-1">
//                 <ul className="space-y-2">
//                   {(plan.features || []).map((feature, i) => (
//                     <li key={i} className="flex items-start gap-2 text-sm">
//                       <span className="text-primary mt-1">•</span>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>

//               <CardFooter className="flex flex-col gap-2">
//                 <div className="flex gap-2 w-full">
//                   <Button variant="outline" size="sm" onClick={() => openEditModal(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
//                     <Pencil className="h-4 w-4" />
//                     تعديل
//                   </Button>
//                   <Button variant="destructive" size="sm" onClick={() => { setDeletingPlan(plan); setIsDeleteOpen(true); }} className="flex-1 transition-all duration-200 hover:scale-105">
//                     <Trash2 className="h-4 w-4" />
//                     حذف
//                   </Button>
//                 </div>
//                 <div className="flex gap-2 w-full">
//                   <Button variant="secondary" size="sm" onClick={() => togglePopular(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
//                     <Star className="h-4 w-4" />
//                     {plan.isPopular ? "إزالة الشيوع" : "جعلها شائعة"}
//                   </Button>
//                   <Button variant="default" size="sm" onClick={() => toggleActive(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
//                     {plan.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     {plan.isActive ? "تعطيل" : "تفعيل"}
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalCount > 0 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">عدد الصفوف:</span>
//             <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
//               <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="6">6</SelectItem>
//                 <SelectItem value="9">9</SelectItem>
//                 <SelectItem value="12">12</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">صفحة {currentPage} من {totalPages}</span>
//           </div>

//           <div className="flex gap-2">
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="transition-all duration-200 hover:scale-105 active:scale-95">
//               السابق
//             </Button>
//             <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="transition-all duration-200 hover:scale-105 active:scale-95">
//               التالي
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Modal */}
//       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
//           <DialogHeader>
//             <DialogTitle>{editingPlan ? "تعديل باقة" : "إضافة باقة"}</DialogTitle>
//             <DialogDescription>{editingPlan ? "قم بتعديل بيانات الباقة أدناه" : "أدخل بيانات الباقة الجديدة"}</DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">اسم الباقة *</Label>
//               <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="مثال: الباقة الأساسية" />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="price">السعر *</Label>
//                 <Input id="price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="currency">العملة *</Label>
//                 <Select value={formData.currency} onValueChange={(v: any) => setFormData({ ...formData, currency: v })}>
//                   <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="OMR">OMR</SelectItem>
//                     <SelectItem value="SAR">SAR</SelectItem>
//                     <SelectItem value="AED">AED</SelectItem>
//                     <SelectItem value="KWD">KWD</SelectItem>
//                     <SelectItem value="QAR">QAR</SelectItem>
//                     <SelectItem value="BHD">BHD</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="cycle">الدورة *</Label>
//               <Select value={formData.billingCycle} onValueChange={(v: any) => setFormData({ ...formData, billingCycle: v })}>
//                 <SelectTrigger id="cycle"><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="شهري">شهري</SelectItem>
//                   <SelectItem value="سنوي">سنوي</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="features">المزايا (اكتب كل سطر كميزة) *</Label>
//               <Textarea id="features" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={"ميزة واحدة\nميزة ثانية\nميزة ثالثة"} rows={6} />
//             </div>

//             <div className="flex items-center justify-between">
//               <Label htmlFor="popular">شائعة</Label>
//               <ToggleSwitch id="popular" checked={!!formData.isPopular} onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })} />
//             </div>

//             <div className="flex items-center justify-between">
//               <Label htmlFor="active">مفعّلة</Label>
//               <ToggleSwitch id="active" checked={formData.isActive ?? true} onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })} />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsFormOpen(false)}>إلغاء</Button>
//             <Button onClick={handleSave}>{editingPlan ? "حفظ التعديلات" : "إضافة"}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation */}
//       <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
//         <AlertDialogContent dir="rtl">
//           <AlertDialogHeader>
//             <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
//             <AlertDialogDescription>هل أنت متأكد من حذف الباقة "{deletingPlan?.name}"؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>إلغاء</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">حذف</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }


































// import React, { useEffect, useMemo, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Badge } from "../components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { Separator } from "../components/ui/separator";
// import { Loader2, Plus, Search, MoreVertical, Trash2, Pencil, Star, CheckCircle2, AlertCircle } from "lucide-react";
// import SwitchRtl from "../components/ui/SwitchRtl";
// import {
//   listPlans,
//   getPlan,
//   createPlan,
//   updatePlan,
//   deletePlan,
//   setPopular,
//   toggleActive,
//   type Plan,
//   type PlanRequest,
// } from "../Service/api/plans";

// type FormState = {
//   id?: number | null;
//   name: string;
//   description: string;
//   price: string; // keep as string for input
//   currency: string;
//   durationMonths: string;
//   isActive: boolean;
//   isPopular: boolean;
//   featuresRaw: string; // textarea, newline-separated
// };

// function toForm(p?: Plan): FormState {
//   if (!p) {
//     return {
//       id: null,
//       name: "",
//       description: "",
//       price: "",
//       currency: "SAR",
//       durationMonths: "1",
//       isActive: true,
//       isPopular: false,
//       featuresRaw: "",
//     };
//   }
//   return {
//     id: p.id,
//     name: p.name ?? "",
//     description: p.description ?? "",
//     price: String(p.price ?? ""),
//     currency: p.currency ?? "SAR",
//     durationMonths: String(p.durationMonths ?? "1"),
//     isActive: !!p.isActive,
//     isPopular: !!p.isPopular,
//     featuresRaw: (p.features ?? []).join("\n"),
//   };
// }

// function toPayload(f: FormState): PlanRequest {
//   const features = f.featuresRaw
//     .split("\n")
//     .map(s => s.trim())
//     .filter(Boolean);
//   return {
//     name: f.name.trim(),
//     description: f.description.trim() || null,
//     price: Number(f.price || 0),
//     currency: f.currency || "SAR",
//     durationMonths: Number(f.durationMonths || 1),
//     isActive: f.isActive,
//     isPopular: f.isPopular,
//     features,
//   };
// }

// export default function AdminPlansPage(): JSX.Element {
//   const [items, setItems] = useState<Plan[]>([]);
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);

//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const totalPages = Math.max(1, Math.ceil(count / pageSize));

//   const [search, setSearch] = useState("");
//   const [searchDebounced, setSearchDebounced] = useState("");

//   const [openMenu, setOpenMenu] = useState<number | null>(null);
//   const [formOpen, setFormOpen] = useState(false);
//   const [form, setForm] = useState<FormState>(toForm());
//   const [saving, setSaving] = useState(false);

//   const [confirmOpenId, setConfirmOpenId] = useState<number | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setSearchDebounced(search.trim()), 400);
//     return () => clearTimeout(t);
//   }, [search]);

//   async function load() {
//     try {
//       setLoading(true);
//       setErr(null);
//       const { data } = await listPlans({ pageIndex, pageSize, search: searchDebounced || undefined });
//       setItems(data.data ?? []);
//       setCount(data.count ?? 0);
//     } catch {
//       setErr("تعذر جلب الخطط");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load();
//   }, [pageIndex, pageSize, searchDebounced]);

//   function openCreate() {
//     setForm(toForm());
//     setFormOpen(true);
//   }

//   async function openEdit(id: number) {
//     try {
//       const { data } = await getPlan(id);
//       setForm(toForm(data));
//       setFormOpen(true);
//     } catch {
//       // يمكن إظهار رسالة خطأ
//     }
//   }

//   async function saveForm(e: React.FormEvent) {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload = toPayload(form);
//       if (form.id) {
//         const { data } = await updatePlan(form.id, payload);
//         setItems(prev => prev.map(p => (p.id === data.id ? data : p)));
//       } else {
//         const { data } = await createPlan(payload);
//         setItems(prev => [data, ...prev]);
//         setCount(prev => prev + 1);
//       }
//       setFormOpen(false);
//     } catch {
//       // إظهار خطأ
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function doDelete(id: number) {
//     setDeleting(true);
//     try {
//       await deletePlan(id);
//       setItems(prev => prev.filter(p => p.id !== id));
//       setCount(prev => Math.max(0, prev - 1));
//       setConfirmOpenId(null);
//     } catch {
//       // إظهار خطأ
//     } finally {
//       setDeleting(false);
//     }
//   }

//   async function togglePopularRow(p: Plan) {
//     try {
//       await setPopular(p.id, !p.isPopular);
//       setItems(prev => prev.map(x => (x.id === p.id ? { ...x, isPopular: !x.isPopular } : x)));
//     } catch {
//       // إظهار خطأ
//     }
//   }

//   async function toggleActiveRow(p: Plan) {
//     try {
//       await toggleActive(p.id);
//       setItems(prev => prev.map(x => (x.id === p.id ? { ...x, isActive: !x.isActive } : x)));
//     } catch {
//       // إظهار خطأ
//     }
//   }

//   const headerRight = useMemo(
//     () => (
//       <div className="flex items-center gap-2">
//         <div className="relative w-full max-w-xs">
//           <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             dir="rtl"
//             placeholder="بحث عن خطة..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pr-9"
//           />
//         </div>
//         <Button onClick={openCreate} className="inline-flex items-center gap-2">
//           <Plus className="h-4 w-4" />
//           إضافة خطة
//         </Button>
//       </div>
//     ),
//     [search]
//   );

//   return (
//     <div className="p-6 space-y-6" dir="rtl">
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-3xl font-bold">الخطط</h1>
//           <p className="text-muted-foreground">إدارة خطط الاشتراك والميزات</p>
//         </div>
//         {headerRight}
//       </div>

//       <div className="rounded-lg border border-border">
//         {loading ? (
//           <div className="flex items-center justify-center py-10 text-muted-foreground">
//             <Loader2 className="h-6 w-6 animate-spin mr-2" />
//             جارٍ تحميل الخطط...
//           </div>
//         ) : err ? (
//           <div className="flex items-center gap-2 text-destructive p-4">
//             <AlertCircle className="h-5 w-5" />
//             {err}
//           </div>
//         ) : items.length === 0 ? (
//           <div className="p-6 text-muted-foreground">لا توجد بيانات</div>
//         ) : (
//           <div className="w-full">
//             {/* بطاقات الموبايل */}
//             <div className="block md:hidden p-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {items.map((p) => (
//                   <Card key={p.id} className="bg-card text-card-foreground">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="flex items-center justify-between gap-2">
//                         <span className="line-clamp-1">{p.name}</span>
//                         <button
//                           onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}
//                           className="p-1 hover:bg-secondary rounded cursor-pointer"
//                           aria-label="إجراءات"
//                           title="إجراءات"
//                         >
//                           <MoreVertical className="h-5 w-5" />
//                         </button>
//                       </CardTitle>
//                       <CardDescription className="flex flex-wrap gap-2">
//                         {p.isPopular && (
//                           <Badge variant="secondary" className="inline-flex items-center gap-1">
//                             <Star className="h-3 w-3" /> شائعة
//                           </Badge>
//                         )}
//                         {p.isActive ? (
//                           <Badge className="inline-flex items-center gap-1 bg-emerald-600">
//                             <CheckCircle2 className="h-3 w-3" /> مفعلة
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline">غير مفعلة</Badge>
//                         )}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div className="text-sm text-muted-foreground">السعر</div>
//                         <div className="font-semibold">{p.price} {p.currency || "SAR"}</div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="text-sm text-muted-foreground">المدة</div>
//                         <div className="font-semibold">{p.durationMonths} شهر</div>
//                       </div>

//                       <div className="flex items-center justify-between gap-3">
//                         <SwitchRtl
//                           checked={p.isPopular}
//                           onChange={() => togglePopularRow(p)}
//                           label="شائعة"
//                         />
//                         <SwitchRtl
//                           checked={p.isActive}
//                           onChange={() => toggleActiveRow(p)}
//                           label="مفعلة"
//                         />
//                       </div>
//                     </CardContent>

//                     {openMenu === p.id && (
//                       <div className="px-4 pb-4">
//                         <div className="rounded-lg border border-border overflow-hidden">
//                           <button
//                             onClick={() => {
//                               setOpenMenu(null);
//                               openEdit(p.id);
//                             }}
//                             className="w-full text-right px-4 py-2 hover:bg-secondary cursor-pointer inline-flex items-center justify-end gap-2"
//                           >
//                             <Pencil className="h-4 w-4" /> تعديل
//                           </button>
//                           <button
//                             onClick={() => {
//                               setOpenMenu(null);
//                               setConfirmOpenId(p.id);
//                             }}
//                             className="w-full text-right px-4 py-2 hover:bg-destructive/10 text-destructive cursor-pointer inline-flex items-center justify-end gap-2"
//                           >
//                             <Trash2 className="h-4 w-4" /> حذف
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* جدول سطح المكتب */}
//             <div className="hidden md:block">
//               <table className="w-full text-right">
//                 <thead>
//                   <tr className="text-sm text-muted-foreground border-b border-border">
//                     <th className="py-3 px-3">الاسم</th>
//                     <th className="py-3 px-3">السعر</th>
//                     <th className="py-3 px-3">المدة</th>
//                     <th className="py-3 px-3">شائعة</th>
//                     <th className="py-3 px-3">مفعلة</th>
//                     <th className="py-3 px-3">إجراءات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((p) => (
//                     <tr key={p.id} className="border-b border-border">
//                       <td className="py-3 px-3">
//                         <div className="font-medium">{p.name}</div>
//                         <div className="text-xs text-muted-foreground line-clamp-1">{p.description}</div>
//                         <div className="mt-1 flex gap-2">
//                           {p.isPopular && (
//                             <Badge variant="secondary" className="inline-flex items-center gap-1">
//                               <Star className="h-3 w-3" /> شائعة
//                             </Badge>
//                           )}
//                           {p.isActive ? (
//                             <Badge className="inline-flex items-center gap-1 bg-emerald-600">
//                               <CheckCircle2 className="h-3 w-3" /> مفعلة
//                             </Badge>
//                           ) : (
//                             <Badge variant="outline">غير مفعلة</Badge>
//                           )}
//                         </div>
//                       </td>
//                       <td className="py-3 px-3 whitespace-nowrap">{p.price} {p.currency || "SAR"}</td>
//                       <td className="py-3 px-3 whitespace-nowrap">{p.durationMonths} شهر</td>
//                       <td className="py-3 px-3">
//                         <SwitchRtl checked={p.isPopular} onChange={() => togglePopularRow(p)} />
//                       </td>
//                       <td className="py-3 px-3">
//                         <SwitchRtl checked={p.isActive} onChange={() => toggleActiveRow(p)} />
//                       </td>
//                       <td className="py-3 px-3">
//                         <div className="relative inline-block">
//                           <button
//                             onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}
//                             className="p-1 hover:bg-secondary rounded cursor-pointer"
//                             aria-label="إجراءات"
//                             title="إجراءات"
//                           >
//                             <MoreVertical className="h-5 w-5" />
//                           </button>
//                           {openMenu === p.id && (
//                             <div className="absolute left-0 top-8 z-50 min-w-[140px] rounded-lg bg-card text-card-foreground py-2 shadow-lg border border-border">
//                               <button
//                                 onClick={() => {
//                                   setOpenMenu(null);
//                                   openEdit(p.id);
//                                 }}
//                                 className="w-full text-right px-4 py-2 hover:bg-secondary cursor-pointer inline-flex items-center justify-end gap-2"
//                               >
//                                 <Pencil className="h-4 w-4" /> تعديل
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setOpenMenu(null);
//                                   setConfirmOpenId(p.id);
//                                 }}
//                                 className="w-full text-right px-4 py-2 hover:bg-destructive/10 text-destructive cursor-pointer inline-flex items-center justify-end gap-2"
//                               >
//                                 <Trash2 className="h-4 w-4" /> حذف
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* ترقيم الصفحات */}
//             <div className="flex items-center justify-between gap-3 p-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">عدد الصفوف:</span>
//                 <select
//                   value={pageSize}
//                   onChange={(e) => {
//                     setPageSize(Number(e.target.value));
//                     setPageIndex(1);
//                   }}
//                   className="h-9 rounded-md border border-border bg-secondary px-3 py-1 text-sm cursor-pointer"
//                 >
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="20">20</option>
//                 </select>
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 صفحة {pageIndex} من {totalPages} ({count} خطة)
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   className="px-3 py-1 rounded-md border border-border text-sm disabled:opacity-50 cursor-pointer"
//                   onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
//                   disabled={pageIndex === 1 || count === 0}
//                 >
//                   السابق
//                 </button>
//                 <button
//                   className="px-3 py-1 rounded-md border border-border text-sm disabled:opacity-50 cursor-pointer"
//                   onClick={() => setPageIndex((p) => Math.min(totalPages, p + 1))}
//                   disabled={pageIndex === totalPages || count === 0}
//                 >
//                   التالي
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* نموذج إضافة/تعديل */}
//       <Dialog open={formOpen} onOpenChange={setFormOpen}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>{form.id ? "تعديل خطة" : "إضافة خطة"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={saveForm} className="space-y-4" dir="rtl">
//             <div>
//               <label className="block text-sm mb-1">الاسم</label>
//               <Input
//                 value={form.name}
//                 onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm mb-1">الوصف</label>
//               <textarea
//                 value={form.description}
//                 onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
//                 className="w-full rounded-md border border-border bg-background p-2 text-sm"
//                 rows={3}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm mb-1">السعر</label>
//                 <Input
//                   type="number"
//                   min={0}
//                   step="0.01"
//                   value={form.price}
//                   onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">العملة</label>
//                 <Input
//                   value={form.currency}
//                   onChange={(e) => setForm((s) => ({ ...s, currency: e.target.value }))}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm mb-1">المدة (بالأشهر)</label>
//                 <Input
//                   type="number"
//                   min={1}
//                   step="1"
//                   value={form.durationMonths}
//                   onChange={(e) => setForm((s) => ({ ...s, durationMonths: e.target.value }))}
//                   required
//                 />
//               </div>
//               <div className="flex items-center gap-4 pt-6">
//                 <SwitchRtl
//                   checked={form.isPopular}
//                   onChange={(v) => setForm((s) => ({ ...s, isPopular: v }))}
//                   label="شائعة"
//                 />
//                 <SwitchRtl
//                   checked={form.isActive}
//                   onChange={(v) => setForm((s) => ({ ...s, isActive: v }))}
//                   label="مفعلة"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm mb-1">الميزات (سطر لكل ميزة)</label>
//               <textarea
//                 value={form.featuresRaw}
//                 onChange={(e) => setForm((s) => ({ ...s, featuresRaw: e.target.value }))}
//                 className="w-full rounded-md border border-border bg-background p-2 text-sm"
//                 rows={5}
//                 placeholder="مثال:\nدعم فني 24/7\nتقارير شهرية"
//               />
//             </div>
//             <Separator />
//             <div className="flex items-center justify-end gap-3">
//               <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
//                 إلغاء
//               </Button>
//               <Button type="submit" disabled={saving}>
//                 {saving ? "جارٍ الحفظ..." : form.id ? "حفظ التعديلات" : "إضافة"}
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* تأكيد الحذف */}
//       <Dialog open={!!confirmOpenId} onOpenChange={(o) => !o && setConfirmOpenId(null)}>
//         <DialogContent className="max-w-sm">
//           <DialogHeader>
//             <DialogTitle>تأكيد الحذف</DialogTitle>
//           </DialogHeader>
//           <p className="text-sm text-muted-foreground">هل تريد حذف هذه الخطة؟ لا يمكن التراجع عن هذا الإجراء.</p>
//           <div className="flex items-center justify-end gap-3">
//             <Button variant="outline" onClick={() => setConfirmOpenId(null)}>
//               إلغاء
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => confirmOpenId && doDelete(confirmOpenId)}
//               disabled={deleting}
//             >
//               {deleting ? "جارٍ الحذف..." : "حذف"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }























import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/dialog-alert";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { toast } from "../components/ui/use-toast";
import { Plus, Pencil, Trash2, Search, Loader2, Star, Eye, EyeOff } from "lucide-react";

interface Plan {
  id: number;
  name: string;
  price: number;
  currency: "OMR" | "SAR" | "AED" | "KWD" | "QAR" | "BHD" | string;
  billingCycle: "شهري" | "سنوي" | string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdOn: string;
}

interface PagedResponse<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

// Toggle يدعم RTL بدون تغيير الهيكل
function ToggleSwitch({
  checked,
  onCheckedChange,
  id,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  id?: string;
}) {
  const isRtl =
    (typeof document !== "undefined" &&
      (document.documentElement.getAttribute("dir") || (document as any).dir)) === "rtl";

  const justify = isRtl
    ? checked
      ? "justify-start"
      : "justify-end"
    : checked
    ? "justify-end"
    : "justify-start";

  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none">
      <div
        className={[
          "w-10 h-6 rounded-full transition-colors border border-border flex p-0.5",
          justify,
          checked ? "bg-primary/30 border-primary/40" : "bg-secondary",
        ].join(" ")}
      >
        <div className="w-5 h-5 bg-primary rounded-full transition-transform shadow" />
      </div>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
    </label>
  );
}

// API client
const api = axios.create({
  baseURL: (import.meta as any)?.env?.VITE_API_BASE_URL || "https://camply.runasp.net",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

function authHeaders() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cycleFilter, setCycleFilter] = useState<"الكل" | "شهري" | "سنوي">("الكل");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<Plan>>({
    name: "",
    price: 0,
    currency: "OMR",
    billingCycle: "شهري",
    features: [],
    isPopular: false,
    isActive: true,
  });
  const [featuresText, setFeaturesText] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch plans from API
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const params: any = {
        pageIndex: currentPage,
        pageSize,
      };
      if (debouncedSearch?.trim()) params.search = debouncedSearch.trim();
      if (cycleFilter !== "الكل") params.cycle = cycleFilter;
      if (showActiveOnly) params.active = true;

      const { data } = await api.get<PagedResponse<Plan>>("/api/admin/plans", {
        params,
        headers: { ...authHeaders() },
      });

      const withFeatures = (data?.data || []).map((p: any) => ({ features: [], ...p }));
      setPlans(withFeatures);
      setTotalCount(data?.count || 0);
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.response?.data?.message || "تعذر جلب الباقات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [debouncedSearch, cycleFilter, showActiveOnly, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cycleFilter, showActiveOnly, pageSize]);

  const openAddModal = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: 0,
      currency: "OMR",
      billingCycle: "شهري",
      features: [],
      isPopular: false,
      isActive: true,
    });
    setFeaturesText("");
    setIsFormOpen(true);
  };

  const openEditModal = async (plan: Plan) => {
    try {
      setEditingPlan(plan);
      const { data } = await api.get(`/api/admin/plans/${plan.id}`, {
        headers: { ...authHeaders() },
      });
      const details = data as Plan;
      setFormData({
        id: details.id,
        name: details.name,
        price: details.price,
        currency: details.currency,
        billingCycle: details.billingCycle,
        isPopular: details.isPopular,
        isActive: details.isActive,
      });
      setFeaturesText((details.features || []).join("\n"));
      setIsFormOpen(true);
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.response?.data?.message || "تعذر جلب تفاصيل الباقة",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast({ title: "خطأ", description: "اسم الباقة مطلوب", variant: "destructive" });
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      toast({ title: "خطأ", description: "السعر يجب أن يكون أكبر من صفر", variant: "destructive" });
      return;
    }
    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    if (features.length === 0) {
      toast({ title: "خطأ", description: "يجب إدخال ميزة واحدة على الأقل", variant: "destructive" });
      return;
    }

    const dto = {
      name: formData.name!.trim(),
      price: Number(formData.price),
      currency: formData.currency!,
      billingCycle: formData.billingCycle!,
      features,
      isPopular: !!formData.isPopular,
      isActive: formData.isActive ?? true,
    };

    try {
      if (editingPlan) {
        await api.put(`/api/admin/plans/${editingPlan.id}`, dto, { headers: { ...authHeaders() } });
        toast({ title: "تم التعديل", description: "تم تحديث الباقة بنجاح" });
      } else {
        await api.post(`/api/admin/plans`, dto, { headers: { ...authHeaders() } });
        toast({ title: "تمت الإضافة", description: "تم إضافة الباقة بنجاح" });
      }
      setIsFormOpen(false);
      fetchPlans();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "تعذر حفظ الباقة";
      toast({ title: "خطأ", description: msg, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deletingPlan) return;
    try {
      await api.delete(`/api/admin/plans/${deletingPlan.id}`, { headers: { ...authHeaders() } });
      toast({ title: "تم الحذف", description: "تم حذف الباقة بنجاح" });
      setIsDeleteOpen(false);
      setDeletingPlan(null);
      if (plans.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
      else fetchPlans();
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.response?.data?.message || "تعذر حذف الباقة",
        variant: "destructive",
      });
    }
  };

  const togglePopular = async (plan: Plan) => {
    try {
      await api.put(`/api/admin/plans/${plan.id}/set-popular`, null, { headers: { ...authHeaders() } });
      toast({ title: "تم التعيين", description: "تم جعل الباقة شائعة (حصريًا)" });
      fetchPlans();
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.response?.data?.message || "تعذر تعيين الشيوع",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (plan: Plan) => {
    try {
      await api.put(`/api/admin/plans/${plan.id}/toggle-active`, null, { headers: { ...authHeaders() } });
      toast({
        title: plan.isActive ? "تم التعطيل" : "تم التفعيل",
        description: plan.isActive ? "تم تعطيل الباقة" : "تم تفعيل الباقة",
      });
      fetchPlans();
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.response?.data?.message || "تعذر تبديل التفعيل",
        variant: "destructive",
      });
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginatedPlans = plans;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">باقات الانضمام</h1>
        <p className="text-muted-foreground mt-1">إدارة الباقات والأسعار والمزايا</p>
      </div>

      <Separator />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث بالاسم"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>

          {/* Cycle filter */}
          <Select value={cycleFilter} onValueChange={(v: any) => setCycleFilter(v)}>
            <SelectTrigger className="w-full sm:w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">الكل</SelectItem>
              <SelectItem value="شهري">شهري</SelectItem>
              <SelectItem value="سنوي">سنوي</SelectItem>
            </SelectContent>
          </Select>

          {/* Active only toggle */}
          <div className="flex items-center gap-2 bg-card border rounded-md px-3 py-2">
            <ToggleSwitch checked={showActiveOnly} onCheckedChange={setShowActiveOnly} id="only-active" />
            <span className="text-sm font-medium">المفعّلة فقط</span>
          </div>
        </div>

        {/* Add button */}
        <Button onClick={openAddModal} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          إضافة باقة
        </Button>
      </div>

      {/* Plans Grid */}
      {paginatedPlans.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">لا توجد باقات مطابقة</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPlans.map((plan, idx) => (
            <Card key={plan.id} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex gap-1 flex-wrap">
                    {plan.isPopular && (
                      <Badge variant="default" className="gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        شائعة
                      </Badge>
                    )}
                    <Badge variant={plan.isActive ? "default" : "secondary"}>{plan.isActive ? "مفعّلة" : "معطّلة"}</Badge>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.currency}</span>
                  <span className="text-sm text-muted-foreground">/ {plan.billingCycle}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {(plan.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
                    <Pencil className="h-4 w-4" />
                    تعديل
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeletingPlan(plan);
                      setIsDeleteOpen(true);
                    }}
                    className="flex-1 transition-all duration-200 hover:scale-105"
                  >
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </Button>
                </div>
                <div className="flex gap-2 w-full">
                  <Button variant="secondary" size="sm" onClick={() => togglePopular(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
                    <Star className="h-4 w-4" />
                    {plan.isPopular ? "إزالة الشيوع" : "جعلها شائعة"}
                  </Button>
                  <Button variant="default" size="sm" onClick={() => toggleActive(plan)} className="flex-1 transition-all duration-200 hover:scale-105">
                    {plan.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {plan.isActive ? "تعطيل" : "تفعيل"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">عدد الصفوف:</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">صفحة {currentPage} من {Math.max(1, Math.ceil(totalCount / pageSize))}</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              السابق
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(Math.max(1, Math.ceil(totalCount / pageSize)), p + 1))}
              disabled={currentPage === Math.max(1, Math.ceil(totalCount / pageSize))}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              التالي
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingPlan ? "تعديل باقة" : "إضافة باقة"}</DialogTitle>
            <DialogDescription>{editingPlan ? "قم بتعديل بيانات الباقة أدناه" : "أدخل بيانات الباقة الجديدة"}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الباقة *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="مثال: الباقة الأساسية" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">السعر *</Label>
                <Input id="price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">العملة *</Label>
                <Select value={formData.currency} onValueChange={(v: any) => setFormData({ ...formData, currency: v })}>
                  <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OMR">OMR</SelectItem>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="AED">AED</SelectItem>
                    <SelectItem value="KWD">KWD</SelectItem>
                    <SelectItem value="QAR">QAR</SelectItem>
                    <SelectItem value="BHD">BHD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycle">الدورة *</Label>
              <Select value={formData.billingCycle} onValueChange={(v: any) => setFormData({ ...formData, billingCycle: v })}>
                <SelectTrigger id="cycle"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="شهري">شهري</SelectItem>
                  <SelectItem value="سنوي">سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">المزايا (اكتب كل سطر كميزة) *</Label>
              <Textarea id="features" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={"ميزة واحدة\nميزة ثانية\nميزة ثالثة"} rows={6} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="popular">شائعة</Label>
              <ToggleSwitch id="popular" checked={!!formData.isPopular} onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">مفعّلة</Label>
              <ToggleSwitch id="active" checked={formData.isActive ?? true} onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editingPlan ? "حفظ التعديلات" : "إضافة"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف الباقة "{deletingPlan?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
