"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCourse(id: string, title: string, description: string) {
  try {
    await prisma.course.update({
      where: { id },
      data: { title, description },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ders güncelleme hatası:", error);
    return { success: false, error: "Ders güncellenemedi." };
  }
}

export async function updateStudent(id: string, name: string, email: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Öğrenci güncelleme hatası:", error);
    return { success: false, error: "Öğrenci bilgileri güncellenemedi." };
  }
}

export async function addAssignment(courseId: string, title: string, content: string) {
  try {
    await prisma.assignment.create({
      data: {
        courseId,
        title,
        content: content || "<p>Yeni ödev detayları.</p>",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ödev ekleme hatası:", error);
    return { success: false, error: "Ödev eklenemedi." };
  }
}

export async function addAnnouncement(
  courseId: string,
  title: string,
  content: string,
  authorId: string
) {
  try {
    await prisma.announcement.create({
      data: {
        courseId,
        title,
        content: content || "<p>Yeni duyuru metni.</p>",
        authorId,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Duyuru ekleme hatası:", error);
    return { success: false, error: "Duyuru eklenemedi." };
  }
}
