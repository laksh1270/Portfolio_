"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// ─── Web Projects ───

export async function createWebTechStack(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return { error: "Name is required" };
  try {
    await prisma.webTechStack.create({ data: { name } });
    revalidatePath("/admin/web");
    return { success: true };
  } catch (e) {
    return { error: "Tech stack already exists" };
  }
}

export async function deleteWebTechStack(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.webTechStack.delete({ where: { id } });
  revalidatePath("/admin/web");
}

export async function createWebProject(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw ? techStackRaw.split(",").filter(Boolean) : [];

  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split(",").filter(Boolean) : [];

  await prisma.webProject.create({
    data: {
      name,
      description: description || null,
      thumbnail: thumbnail || null,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      techStack,
      images,
    },
  });

  revalidatePath("/admin/web");
  revalidatePath("/web");
}

export async function updateWebProject(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw ? techStackRaw.split(",").filter(Boolean) : [];

  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split(",").filter(Boolean) : [];

  await prisma.webProject.update({
    where: { id },
    data: {
      name,
      description: description || null,
      thumbnail: thumbnail || null,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
      techStack,
      images,
    },
  });

  revalidatePath("/admin/web");
  revalidatePath("/web");
}

export async function deleteWebProject(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.webProject.delete({ where: { id } });
  revalidatePath("/admin/web");
  revalidatePath("/web");
}

export async function reorderWebProjects(projectIds: string[]) {
  await prisma.$transaction(
    projectIds.map((id, index) =>
      prisma.webProject.update({
        where: { id },
        data: { displayOrder: index },
      })
    )
  );

  revalidatePath("/admin/web");
  revalidatePath("/web");
}

// ─── Web Testimonials ───

export async function submitWebFeedback(formData: FormData) {
  const name = formData.get("name") as string;
  const feedback = formData.get("feedback") as string;
  const rating = parseInt(formData.get("rating") as string) || 5;
  const email = formData.get("email") as string;
  
  const projectName = formData.get("projectName") as string;
  const liveLink = formData.get("liveLink") as string;
  const githubLink = formData.get("githubLink") as string;
  const figmaLink = formData.get("figmaLink") as string;

  if (!feedback) return { error: "Feedback is required" };
  if (!projectName) return { error: "Project name is required" };

  await prisma.webTestimonial.create({
    data: {
      projectName,
      liveLink: liveLink || null,
      githubLink: githubLink || null,
      figmaLink: figmaLink || null,
      name: name || "Anonymous Client",
      feedback,
      rating,
      email: email || null,
      approved: false,
    },
  });

  revalidatePath("/admin/web/notifications");
  return { success: true };
}

export async function approveWebTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.webTestimonial.update({
    where: { id },
    data: { approved: true },
  });
  revalidatePath("/admin/web/notifications");
  revalidatePath("/web");
}

export async function deleteWebTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.webTestimonial.delete({ where: { id } });
  revalidatePath("/admin/web/notifications");
  revalidatePath("/web");
}

export async function reorderWebTestimonials(ids: string[]) {
  const updates = ids.map((id, index) =>
    prisma.webTestimonial.update({
      where: { id },
      data: { displayOrder: index },
    })
  );
  await Promise.all(updates);
  revalidatePath("/admin/web/notifications");
  revalidatePath("/web");
}
