import { prisma } from "@/lib/prisma";
import Editor from "@/components/Editor";
import CourseStudentManager from "@/components/CourseStudentManager";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Bell,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
} from "lucide-react";

export const instant = false;

// Vercel Serverless ortamında veritabanı dosyası yoksa devreye girecek yedek veriler
const FALLBACK_STUDENTS = [
  { id: "s1", name: "Ali Yılmaz", email: "ogrenci1@demo.com", enrollments: [{ course: { id: "c1", title: "Web Geliştirme 101" } }] },
  { id: "s2", name: "Ayşe Kaya", email: "ogrenci2@demo.com", enrollments: [{ course: { id: "c1", title: "Web Geliştirme 101" } }] },
  { id: "s3", name: "Mehmet Demir", email: "ogrenci3@demo.com", enrollments: [{ course: { id: "c2", title: "Algoritmalar ve Veri Yapıları" } }] },
  { id: "s4", name: "Fatma Çelik", email: "ogrenci4@demo.com", enrollments: [{ course: { id: "c2", title: "Algoritmalar ve Veri Yapıları" } }] },
  { id: "s5", name: "Ahmet Şahin", email: "ogrenci5@demo.com", enrollments: [{ course: { id: "c3", title: "Veritabanı Yönetim Sistemleri" } }] },
  { id: "s6", name: "Zeynep Aydın", email: "ogrenci6@demo.com", enrollments: [{ course: { id: "c3", title: "Veritabanı Yönetim Sistemleri" } }] },
  { id: "s7", name: "Emre Koç", email: "ogrenci7@demo.com", enrollments: [{ course: { id: "c4", title: "Mobil Uygulama Geliştirme" } }] },
  { id: "s8", name: "Elif Öztürk", email: "ogrenci8@demo.com", enrollments: [{ course: { id: "c4", title: "Mobil Uygulama Geliştirme" } }] },
  { id: "s9", name: "Burak Arslan", email: "ogrenci9@demo.com", enrollments: [{ course: { id: "c5", title: "Yapay Zeka ve Makine Öğrenimi" } }] },
  { id: "s10", name: "Gamze Polat", email: "ogrenci10@demo.com", enrollments: [{ course: { id: "c5", title: "Yapay Zeka ve Makine Öğrenimi" } }] },
  { id: "s11", name: "Caner Yıldız", email: "ogrenci11@demo.com", enrollments: [{ course: { id: "c1", title: "Web Geliştirme 101" } }] },
  { id: "s12", name: "Büşra Doğan", email: "ogrenci12@demo.com", enrollments: [{ course: { id: "c2", title: "Algoritmalar ve Veri Yapıları" } }] },
  { id: "s13", name: "Oğuzhan Kılıç", email: "ogrenci13@demo.com", enrollments: [{ course: { id: "c3", title: "Veritabanı Yönetim Sistemleri" } }] },
  { id: "s14", name: "Merve Çetin", email: "ogrenci14@demo.com", enrollments: [{ course: { id: "c4", title: "Mobil Uygulama Geliştirme" } }] },
  { id: "s15", name: "Serkan Güler", email: "ogrenci15@demo.com", enrollments: [{ course: { id: "c5", title: "Yapay Zeka ve Makine Öğrenimi" } }] },
  { id: "s16", name: "Selin Aksoy", email: "ogrenci16@demo.com", enrollments: [{ course: { id: "c1", title: "Web Geliştirme 101" } }] },
  { id: "s17", name: "Tolga Yavuz", email: "ogrenci17@demo.com", enrollments: [{ course: { id: "c2", title: "Algoritmalar ve Veri Yapıları" } }] },
  { id: "s18", name: "Derya Tekin", email: "ogrenci18@demo.com", enrollments: [{ course: { id: "c3", title: "Veritabanı Yönetim Sistemleri" } }] },
  { id: "s19", name: "Barış Kurt", email: "ogrenci19@demo.com", enrollments: [{ course: { id: "c4", title: "Mobil Uygulama Geliştirme" } }] },
  { id: "s20", name: "Ece Şen", email: "ogrenci20@demo.com", enrollments: [{ course: { id: "c5", title: "Yapay Zeka ve Makine Öğrenimi" } }] },
];

const FALLBACK_COURSES = [
  {
    id: "c1",
    title: "Web Geliştirme 101",
    description: "HTML, CSS, modern JavaScript ve Next.js ekosistemine giriş.",
    teacher: { id: "t1", name: "Prof. Dr. Ahmet Yılmaz", email: "ogretmen@demo.com" },
    enrollments: [
      { user: { id: "s1", name: "Ali Yılmaz", email: "ogrenci1@demo.com" } },
      { user: { id: "s2", name: "Ayşe Kaya", email: "ogrenci2@demo.com" } },
      { user: { id: "s11", name: "Caner Yıldız", email: "ogrenci11@demo.com" } },
      { user: { id: "s16", name: "Selin Aksoy", email: "ogrenci16@demo.com" } },
    ],
    assignments: [
      {
        id: "a1",
        title: "1. Hafta: Karşılama Sayfası",
        content: "<p>Next.js ve Tailwind CSS ile modern bir responsive karşılama sayfası hazırlayınız.</p>",
      },
    ],
    announcements: [
      {
        id: "an1",
        title: "Dönem Başı Bilgilendirmesi",
        content: "<p>Dersimize hoş geldiniz! Canlı yayın linki haftaya paylaşılacaktır.</p>",
      },
    ],
  },
  {
    id: "c2",
    title: "Algoritmalar ve Veri Yapıları",
    description: "Temel algoritmalar, karmaşıklık analizi, ağaçlar ve grafik modelleri.",
    teacher: { id: "t1", name: "Prof. Dr. Ahmet Yılmaz", email: "ogretmen@demo.com" },
    enrollments: [
      { user: { id: "s3", name: "Mehmet Demir", email: "ogrenci3@demo.com" } },
      { user: { id: "s4", name: "Fatma Çelik", email: "ogrenci4@demo.com" } },
      { user: { id: "s12", name: "Büşra Doğan", email: "ogrenci12@demo.com" } },
      { user: { id: "s17", name: "Tolga Yavuz", email: "ogrenci17@demo.com" } },
    ],
    assignments: [
      {
        id: "a2",
        title: "İkili Arama Ağacı Ödevi",
        content: "<p>Dengeli bir ikili arama ağacı (AVL Tree) sınıfı oluşturup test senaryolarını yazınız.</p>",
      },
    ],
    announcements: [
      {
        id: "an2",
        title: "Lab Saatleri Güncellendi",
        content: "<p>Algoritma laboratuvar uygulamaları her Çarşamba 14:00'te yapılacaktır.</p>",
      },
    ],
  },
  {
    id: "c3",
    title: "Veritabanı Yönetim Sistemleri",
    description: "İlişkisel veritabanları, SQL optimizasyonu ve Prisma ORM ile modelleme.",
    teacher: { id: "t1", name: "Prof. Dr. Ahmet Yılmaz", email: "ogretmen@demo.com" },
    enrollments: [
      { user: { id: "s5", name: "Ahmet Şahin", email: "ogrenci5@demo.com" } },
      { user: { id: "s6", name: "Zeynep Aydın", email: "ogrenci6@demo.com" } },
      { user: { id: "s13", name: "Oğuzhan Kılıç", email: "ogrenci13@demo.com" } },
      { user: { id: "s18", name: "Derya Tekin", email: "ogrenci18@demo.com" } },
    ],
    assignments: [
      {
        id: "a3",
        title: "E-Ticaret Veritabanı Tasarımı",
        content: "<p>Sipariş, ürün ve kullanıcı ilişkilerini gösteren 3NF normalize şema çiziniz.</p>",
      },
    ],
    announcements: [
      {
        id: "an3",
        title: "Prisma Studio Eğitimi",
        content: "<p>Prisma Studio kullanımı ile ilgili kısa video kılavuz sisteme yüklendi.</p>",
      },
    ],
  },
  {
    id: "c4",
    title: "Mobil Uygulama Geliştirme",
    description: "React Native ve Expo ile iOS ve Android platformları için uygulama geliştirme.",
    teacher: { id: "t1", name: "Prof. Dr. Ahmet Yılmaz", email: "ogretmen@demo.com" },
    enrollments: [
      { user: { id: "s7", name: "Emre Koç", email: "ogrenci7@demo.com" } },
      { user: { id: "s8", name: "Elif Öztürk", email: "ogrenci8@demo.com" } },
      { user: { id: "s14", name: "Merve Çetin", email: "ogrenci14@demo.com" } },
      { user: { id: "s19", name: "Barış Kurt", email: "ogrenci19@demo.com" } },
    ],
    assignments: [
      {
        id: "a4",
        title: "Hava Durumu Uygulaması",
        content: "<p>OpenWeather API kullanarak anlık hava durumu ve 5 günlük tahmin gösteren mobil ekran kodlayınız.</p>",
      },
    ],
    announcements: [
      {
        id: "an4",
        title: "Expo SDK 52 Güncellemesi",
        content: "<p>Projelerinizde en güncel Expo SDK sürümünü kullanmayı unutmayınız.</p>",
      },
    ],
  },
  {
    id: "c5",
    title: "Yapay Zeka ve Makine Öğrenimi",
    description: "Python, scikit-learn ve derin öğrenme modelleriyle veri analitiği.",
    teacher: { id: "t1", name: "Prof. Dr. Ahmet Yılmaz", email: "ogretmen@demo.com" },
    enrollments: [
      { user: { id: "s9", name: "Burak Arslan", email: "ogrenci9@demo.com" } },
      { user: { id: "s10", name: "Gamze Polat", email: "ogrenci10@demo.com" } },
      { user: { id: "s15", name: "Serkan Güler", email: "ogrenci15@demo.com" } },
      { user: { id: "s20", name: "Ece Şen", email: "ogrenci20@demo.com" } },
    ],
    assignments: [
      {
        id: "a5",
        title: "Görüntü Sınıflandırma Modeli",
        content: "<p>MNIST veri kümesi üzerinde %98 doğruluk oranına ulaşan CNN modelini eğitin.</p>",
      },
    ],
    announcements: [
      {
        id: "an5",
        title: "GPU Kaynakları Açıldı",
        content: "<p>Eğitim laboratuvarındaki GPU sunucularına uzaktan erişim tanımlanmıştır.</p>",
      },
    ],
  },
];

type CourseList = Parameters<typeof CourseStudentManager>[0]["courses"];
type StudentList = Parameters<typeof CourseStudentManager>[0]["students"];

export default async function Home() {
  let courses: CourseList = FALLBACK_COURSES;
  let students: StudentList = FALLBACK_STUDENTS;
  let teacherName = "Prof. Dr. Ahmet Yılmaz";
  let teacherEmail = "ogretmen@demo.com";
  let assignmentsCount = 5;
  let announcementsCount = 5;
  let isDatabaseConnected = false;

  try {
    const [dbCourses, allUsers, dbAssignCount, dbAnnounceCount] = await Promise.all([
      prisma.course.findMany({
        include: {
          teacher: true,
          assignments: true,
          announcements: true,
          enrollments: { include: { user: true } },
        },
      }),
      prisma.user.findMany({
        include: {
          enrollments: { include: { course: true } },
        },
      }),
      prisma.assignment.count(),
      prisma.announcement.count(),
    ]);

    if (dbCourses && dbCourses.length > 0) {
      courses = dbCourses;
      const dbTeacher = allUsers.find((u) => u.role === "TEACHER");
      if (dbTeacher) {
        teacherName = dbTeacher.name;
        teacherEmail = dbTeacher.email;
      }
      students = allUsers.filter((u) => u.role === "STUDENT");
      assignmentsCount = dbAssignCount;
      announcementsCount = dbAnnounceCount;
      isDatabaseConnected = true;
    }
  } catch (err) {
    console.warn("Veritabanı bağlantısı sağlanamadı, yedek veriler kullanılıyor:", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-indigo-100/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-indigo-400 dark:to-purple-400">
                AkademiLMS
              </span>
              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                {courses.length} Ders • {students.length} Öğrenci
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/70 px-3 py-1.5 text-xs text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 md:flex">
              <span className={`h-2 w-2 rounded-full ${isDatabaseConnected ? "bg-emerald-500 animate-pulse" : "bg-indigo-500"}`} />
              {isDatabaseConnected ? "SQLite & Prisma Aktif" : "Vercel Bulut Modu Aktif"}
            </div>

            <a
              href="http://localhost:5555"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:brightness-110 active:scale-95"
            >
              <span>Prisma Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-8 text-white shadow-2xl shadow-indigo-500/20 sm:p-10">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Modern Eğitim Portalı & Yönetim Paneli</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Öğrenmeyi ve Öğretmeyi Kolaylaştırın.
            </h1>
            <p className="mt-3 text-sm text-indigo-100 sm:text-base">
              5 Aktif Ders ve 20 Kayıtlı Öğrenci hazır. Kartlara tıklayarak detayları görüntüleyebilir ve veritabanını güncelleyebilirsiniz.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-200">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-medium">Toplam Ders</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{courses.length}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-200">
                <Users className="h-4 w-4" />
                <span className="text-xs font-medium">Kayıtlı Öğrenciler</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{students.length}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-200">
                <FileText className="h-4 w-4" />
                <span className="text-xs font-medium">Aktif Ödev</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{assignmentsCount}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-200">
                <Bell className="h-4 w-4" />
                <span className="text-xs font-medium">Duyurular</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{announcementsCount}</p>
            </div>
          </div>
        </div>

        {/* Demo Accounts Pill Box */}
        <div className="mt-8 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50/50 p-5 shadow-sm dark:border-amber-900/40 dark:from-amber-950/20 dark:to-orange-950/10">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-sm font-bold">Örnek Giriş Bilgileri (Tüm Şifreler: Demo1234)</h2>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-xs dark:bg-slate-800">
              <div>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  ÖĞRETMEN HESABI
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-white">
                  {teacherEmail} ({teacherName})
                </p>
              </div>
              <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                Demo1234
              </code>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-xs dark:bg-slate-800">
              <div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  ÖĞRENCİ HESAPLARI (20 Adet)
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-white">
                  ogrenci1@demo.com ... ogrenci20@demo.com
                </p>
              </div>
              <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                Demo1234
              </code>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Sol Sütun: Canlı TipTap Editörü & Teknoloji Yığını */}
          <div className="space-y-6 lg:col-span-1">
            <Editor />

            {/* Architecture Highlights */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Code2 className="h-4 w-4 text-indigo-500" />
                Mevcut Teknoloji Yığını
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Next.js App Router & Vercel Uyumlu</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Tailwind CSS & İnteraktif Modallar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Prisma ORM (5 Ders + 20 Öğrenci)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>TipTap Headless Rich-Text Editor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>isomorphic-dompurify XSS Sanitizer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>bcryptjs ile Güvenli Şifreleme</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ Sütun: Dersler ve Öğrenciler Yönetim Paneli */}
          <div className="space-y-8 lg:col-span-2">
            <CourseStudentManager courses={courses} students={students} />

            {/* Son Ödevler ve Duyurular Özet Listesi */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Ödevler Listesi */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Aktif Ödevler ({assignmentsCount})
                    </h3>
                  </div>
                </div>

                <div className="mt-3 space-y-3 max-h-80 overflow-y-auto pr-1">
                  {courses.flatMap((c) => c.assignments).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {assignment.title}
                        </h4>
                        <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          <Calendar className="h-3 w-3" />
                          Aktif
                        </span>
                      </div>

                      <div
                        className="mt-2 text-xs text-slate-600 dark:text-slate-400 [&_p]:mb-1"
                        dangerouslySetInnerHTML={{ __html: assignment.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Duyurular Listesi */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Son Duyurular ({announcementsCount})
                    </h3>
                  </div>
                </div>

                <div className="mt-3 space-y-3 max-h-80 overflow-y-auto pr-1">
                  {courses.flatMap((c) => c.announcements).map((announcement) => (
                    <div
                      key={announcement.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {announcement.title}
                        </h4>
                        <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                          Duyuru
                        </span>
                      </div>

                      <div
                        className="mt-2 text-xs text-slate-600 dark:text-slate-400 [&_p]:mb-1"
                        dangerouslySetInnerHTML={{ __html: announcement.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
