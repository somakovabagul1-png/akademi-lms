import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Demo1234", 10);

  // 1 Öğretmen
  const teacher = await prisma.user.upsert({
    where: { email: "ogretmen@demo.com" },
    update: {},
    create: {
      name: "Prof. Dr. Ahmet Yılmaz",
      email: "ogretmen@demo.com",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  // 20 Öğrenci Listesi
  const studentData = [
    { name: "Ali Yılmaz", email: "ogrenci1@demo.com" },
    { name: "Ayşe Kaya", email: "ogrenci2@demo.com" },
    { name: "Mehmet Demir", email: "ogrenci3@demo.com" },
    { name: "Fatma Çelik", email: "ogrenci4@demo.com" },
    { name: "Ahmet Şahin", email: "ogrenci5@demo.com" },
    { name: "Zeynep Aydın", email: "ogrenci6@demo.com" },
    { name: "Emre Koç", email: "ogrenci7@demo.com" },
    { name: "Elif Öztürk", email: "ogrenci8@demo.com" },
    { name: "Burak Arslan", email: "ogrenci9@demo.com" },
    { name: "Gamze Polat", email: "ogrenci10@demo.com" },
    { name: "Caner Yıldız", email: "ogrenci11@demo.com" },
    { name: "Büşra Doğan", email: "ogrenci12@demo.com" },
    { name: "Oğuzhan Kılıç", email: "ogrenci13@demo.com" },
    { name: "Merve Çetin", email: "ogrenci14@demo.com" },
    { name: "Serkan Güler", email: "ogrenci15@demo.com" },
    { name: "Selin Aksoy", email: "ogrenci16@demo.com" },
    { name: "Tolga Yavuz", email: "ogrenci17@demo.com" },
    { name: "Derya Tekin", email: "ogrenci18@demo.com" },
    { name: "Barış Kurt", email: "ogrenci19@demo.com" },
    { name: "Ece Şen", email: "ogrenci20@demo.com" },
  ];

  const students = [];
  for (const s of studentData) {
    const student = await prisma.user.upsert({
      where: { email: s.email },
      update: { name: s.name },
      create: {
        name: s.name,
        email: s.email,
        password: hashedPassword,
        role: "STUDENT",
      },
    });
    students.push(student);
  }

  // Ayrıca standart ogrenci@demo.com hesabını da tutalım
  await prisma.user.upsert({
    where: { email: "ogrenci@demo.com" },
    update: {},
    create: {
      name: "Örnek Öğrenci (Demo)",
      email: "ogrenci@demo.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  // 5 Farklı Ders
  const coursesData = [
    {
      title: "Web Geliştirme 101",
      description: "HTML, CSS, modern JavaScript ve Next.js ekosistemine giriş.",
      assignments: [
        {
          title: "1. Hafta: Karşılama Sayfası",
          content: "<p>Next.js ve Tailwind CSS ile modern bir responsive karşılama sayfası hazırlayınız.</p>",
        },
      ],
      announcements: [
        {
          title: "Dönem Başı Bilgilendirmesi",
          content: "<p>Dersimize hoş geldiniz! Canlı yayın linki haftaya paylaşılacaktır.</p>",
        },
      ],
    },
    {
      title: "Algoritmalar ve Veri Yapıları",
      description: "Temel algoritmalar, karmaşıklık analizi, ağaçlar ve grafik modelleri.",
      assignments: [
        {
          title: "İkili Arama Ağacı Ödevi",
          content: "<p>Dengeli bir ikili arama ağacı (AVL Tree) sınıfı oluşturup test senaryolarını yazınız.</p>",
        },
      ],
      announcements: [
        {
          title: "Lab Saatleri Güncellendi",
          content: "<p>Algoritma laboratuvar uygulamaları her Çarşamba 14:00'te yapılacaktır.</p>",
        },
      ],
    },
    {
      title: "Veritabanı Yönetim Sistemleri",
      description: "İlişkisel veritabanları, SQL optimizasyonu ve Prisma ORM ile modelleme.",
      assignments: [
        {
          title: "E-Ticaret Veritabanı Tasarımı",
          content: "<p>Sipariş, ürün ve kullanıcı ilişkilerini gösteren 3NF normalize şema çiziniz.</p>",
        },
      ],
      announcements: [
        {
          title: "Prisma Studio Eğitimi",
          content: "<p>Prisma Studio kullanımı ile ilgili kısa video kılavuz sisteme yüklendi.</p>",
        },
      ],
    },
    {
      title: "Mobil Uygulama Geliştirme",
      description: "React Native ve Expo ile iOS ve Android platformları için uygulama geliştirme.",
      assignments: [
        {
          title: "Hava Durumu Uygulaması",
          content: "<p>OpenWeather API kullanarak anlık hava durumu ve 5 günlük tahmin gösteren mobil ekran kodlayınız.</p>",
        },
      ],
      announcements: [
        {
          title: "Expo SDK 52 Güncellemesi",
          content: "<p>Projelerinizde en güncel Expo SDK sürümünü kullanmayı unutmayınız.</p>",
        },
      ],
    },
    {
      title: "Yapay Zeka ve Makine Öğrenimi",
      description: "Python, scikit-learn ve derin öğrenme modelleriyle veri analitiği.",
      assignments: [
        {
          title: "Görüntü Sınıflandırma Modeli",
          content: "<p>MNIST veri kümesi üzerinde %98 doğruluk oranına ulaşan CNN modelini eğitin.</p>",
        },
      ],
      announcements: [
        {
          title: "GPU Kaynakları Açıldı",
          content: "<p>Eğitim laboratuvarındaki GPU sunucularına uzaktan erişim tanımlanmıştır.</p>",
        },
      ],
    },
  ];

  // Dersleri oluştur ve öğrencileri kaydet
  for (let i = 0; i < coursesData.length; i++) {
    const cData = coursesData[i];

    let course = await prisma.course.findFirst({
      where: { title: cData.title },
    });

    if (!course) {
      course = await prisma.course.create({
        data: {
          title: cData.title,
          description: cData.description,
          teacherId: teacher.id,
        },
      });
    }

    // Her derse 6-8 öğrenciyi kaydet (dağıtılmış olarak)
    const assignedStudents = students.slice(i * 3, (i * 3) + 8);
    for (const st of assignedStudents) {
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: st.id,
            courseId: course.id,
          },
        },
        update: {},
        create: {
          userId: st.id,
          courseId: course.id,
        },
      });
    }

    // Ödevleri ekle (yoksa)
    for (const a of cData.assignments) {
      const exists = await prisma.assignment.findFirst({
        where: { courseId: course.id, title: a.title },
      });
      if (!exists) {
        await prisma.assignment.create({
          data: {
            title: a.title,
            content: a.content,
            dueDate: new Date(Date.now() + (i + 5) * 24 * 60 * 60 * 1000),
            courseId: course.id,
          },
        });
      }
    }

    // Duyuruları ekle (yoksa)
    for (const an of cData.announcements) {
      const exists = await prisma.announcement.findFirst({
        where: { courseId: course.id, title: an.title },
      });
      if (!exists) {
        await prisma.announcement.create({
          data: {
            title: an.title,
            content: an.content,
            courseId: course.id,
            authorId: teacher.id,
          },
        });
      }
    }
  }

  console.log("5 Ders ve 20 Öğrenci seed işlemi başarıyla tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
