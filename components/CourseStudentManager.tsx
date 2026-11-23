"use client";

import { useState, useTransition } from "react";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  Bell,
  X,
  Edit3,
  Check,
  PlusCircle,
  Mail,
  GraduationCap,
  Search,
} from "lucide-react";
import {
  updateCourse,
  updateStudent,
  addAssignment,
  addAnnouncement,
} from "@/app/actions";

interface Course {
  id: string;
  title: string;
  description: string | null;
  teacher: { id: string; name: string; email: string };
  enrollments: { user: { id: string; name: string; email: string } }[];
  assignments: { id: string; title: string; content: string }[];
  announcements: { id: string; title: string; content: string }[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  enrollments: { course: { id: string; title: string } }[];
}

export default function CourseStudentManager({
  courses,
  students,
}: {
  courses: Course[];
  students: Student[];
}) {
  const [activeTab, setActiveTab] = useState<"courses" | "students">("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isPending, startTransition] = useTransition();
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Düzenleme state'leri
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [newAssignTitle, setNewAssignTitle] = useState("");
  const [newAssignContent, setNewAssignContent] = useState("");
  const [newAnnounceTitle, setNewAnnounceTitle] = useState("");
  const [newAnnounceContent, setNewAnnounceContent] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleOpenCourse = (c: Course) => {
    setSelectedCourse(c);
    setCourseTitle(c.title);
    setCourseDesc(c.description || "");
    setFeedbackMessage(null);
  };

  const handleOpenStudent = (s: Student) => {
    setSelectedStudent(s);
    setStudentName(s.name);
    setStudentEmail(s.email);
    setFeedbackMessage(null);
  };

  const handleSaveCourse = () => {
    if (!selectedCourse) return;
    startTransition(async () => {
      const res = await updateCourse(selectedCourse.id, courseTitle, courseDesc);
      if (res.success) {
        setFeedbackMessage("Ders bilgileri başarıyla güncellendi!");
        setSelectedCourse({
          ...selectedCourse,
          title: courseTitle,
          description: courseDesc,
        });
      }
    });
  };

  const handleAddAssignment = () => {
    if (!selectedCourse || !newAssignTitle.trim()) return;
    startTransition(async () => {
      const res = await addAssignment(
        selectedCourse.id,
        newAssignTitle,
        `<p>${newAssignContent || newAssignTitle}</p>`
      );
      if (res.success) {
        setFeedbackMessage("Yeni ödev derse eklendi!");
        setSelectedCourse({
          ...selectedCourse,
          assignments: [
            ...selectedCourse.assignments,
            {
              id: Date.now().toString(),
              title: newAssignTitle,
              content: `<p>${newAssignContent || newAssignTitle}</p>`,
            },
          ],
        });
        setNewAssignTitle("");
        setNewAssignContent("");
      }
    });
  };

  const handleAddAnnouncement = () => {
    if (!selectedCourse || !newAnnounceTitle.trim()) return;
    startTransition(async () => {
      const res = await addAnnouncement(
        selectedCourse.id,
        newAnnounceTitle,
        `<p>${newAnnounceContent || newAnnounceTitle}</p>`,
        selectedCourse.teacher.id
      );
      if (res.success) {
        setFeedbackMessage("Yeni duyuru yayınlandı!");
        setSelectedCourse({
          ...selectedCourse,
          announcements: [
            ...selectedCourse.announcements,
            {
              id: Date.now().toString(),
              title: newAnnounceTitle,
              content: `<p>${newAnnounceContent || newAnnounceTitle}</p>`,
            },
          ],
        });
        setNewAnnounceTitle("");
        setNewAnnounceContent("");
      }
    });
  };

  const handleSaveStudent = () => {
    if (!selectedStudent) return;
    startTransition(async () => {
      const res = await updateStudent(selectedStudent.id, studentName, studentEmail);
      if (res.success) {
        setFeedbackMessage("Öğrenci bilgileri başarıyla güncellendi!");
        setSelectedStudent({
          ...selectedStudent,
          name: studentName,
          email: studentEmail,
        });
      }
    });
  };

  // Arama filtresi
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab("courses");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "courses"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Dersler ({courses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("students");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "students"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Öğrenciler ({students.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={activeTab === "courses" ? "Ders ara..." : "Öğrenci ara..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
        💡 İpucu: Herhangi bir karta tıklayarak detaylarını görüntüleyebilir ve doğrudan düzenleyebilirsiniz.
      </div>

      {/* Courses Grid View */}
      {activeTab === "courses" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleOpenCourse(course)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-600"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                    Ders Detayı & Düzenle
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Users className="h-3.5 w-3.5" />
                    <span>{course.enrollments.length} Öğrenci</span>
                  </div>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {course.description || "Açıklama belirtilmemiş."}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {course.assignments.length} Ödev • {course.announcements.length} Duyuru
                </span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  Detayları Aç →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students Grid View */}
      {activeTab === "students" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => handleOpenStudent(student)}
              className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-emerald-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {student.name}
                    </h4>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-2 text-[11px] text-slate-500 dark:border-slate-800 flex items-center justify-between">
                <span>{student.enrollments.length} Derse Kayıtlı</span>
                <span className="text-emerald-600 font-semibold group-hover:underline">
                  Düzenle →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Ders Detay ve Düzenleme */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Edit3 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ders Detayları ve Düzenleme
                </h3>
                <p className="text-xs text-slate-500">
                  Eğitmen: {selectedCourse.teacher.name}
                </p>
              </div>
            </div>

            {feedbackMessage && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Check className="h-4 w-4" />
                {feedbackMessage}
              </div>
            )}

            {/* Form Fields */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ders Başlığı
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ders Açıklaması
                </label>
                <textarea
                  rows={3}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveCourse}
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isPending ? "Kaydediliyor..." : "Ders Bilgilerini Güncelle"}
              </button>
            </div>

            {/* Enrolled Students */}
            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Derse Kayıtlı Öğrenciler ({selectedCourse.enrollments.length})
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selectedCourse.enrollments.map((enr) => (
                  <span
                    key={enr.user.id}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {enr.user.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Add Assignment or Announcement */}
            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 grid gap-4 sm:grid-cols-2">
              {/* Add Assignment */}
              <div className="rounded-2xl border border-slate-200/80 p-3.5 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span>Yeni Ödev Ekle</span>
                </div>
                <input
                  type="text"
                  placeholder="Ödev başlığı..."
                  value={newAssignTitle}
                  onChange={(e) => setNewAssignTitle(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <input
                  type="text"
                  placeholder="Kısa açıklama..."
                  value={newAssignContent}
                  onChange={(e) => setNewAssignContent(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddAssignment}
                  disabled={isPending || !newAssignTitle.trim()}
                  className="mt-2.5 flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
                >
                  <PlusCircle className="h-3 w-3" />
                  Ödev Ekle
                </button>
              </div>

              {/* Add Announcement */}
              <div className="rounded-2xl border border-slate-200/80 p-3.5 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                  <Bell className="h-4 w-4 text-purple-600" />
                  <span>Yeni Duyuru Ekle</span>
                </div>
                <input
                  type="text"
                  placeholder="Duyuru başlığı..."
                  value={newAnnounceTitle}
                  onChange={(e) => setNewAnnounceTitle(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <input
                  type="text"
                  placeholder="Kısa içerik..."
                  value={newAnnounceContent}
                  onChange={(e) => setNewAnnounceContent(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddAnnouncement}
                  disabled={isPending || !newAnnounceTitle.trim()}
                  className="mt-2.5 flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1 text-xs font-bold text-white hover:bg-purple-700 disabled:opacity-40"
                >
                  <PlusCircle className="h-3 w-3" />
                  Duyuru Yayınla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Öğrenci Detay ve Düzenleme */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Öğrenci Detayı ve Düzenleme
                </h3>
                <p className="text-xs text-slate-500">
                  Öğrenci profilini ve kayıtlı derslerini yönetin
                </p>
              </div>
            </div>

            {feedbackMessage && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Check className="h-4 w-4" />
                {feedbackMessage}
              </div>
            )}

            {/* Student Edit Form */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveStudent}
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 disabled:opacity-50"
              >
                {isPending ? "Kaydediliyor..." : "Öğrenci Bilgilerini Güncelle"}
              </button>
            </div>

            {/* Enrolled Courses */}
            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kayıtlı Olduğu Dersler ({selectedStudent.enrollments.length})
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedStudent.enrollments.map((enr) => (
                  <span
                    key={enr.course.id}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                  >
                    <BookOpen className="h-3 w-3" />
                    {enr.course.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
