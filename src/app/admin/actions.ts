"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const platformLink = formData.get("platformLink") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const contentType = formData.get("contentType") as string;
  const clientName = formData.get("clientName") as string;
  const clientLink = formData.get("clientLink") as string;
  const clientAvatar = formData.get("clientAvatar") as string;
  const description = formData.get("description") as string;
  const views = formData.get("views") as string;
  const likes = formData.get("likes") as string;

  const folderIdsRaw = formData.get("folderIds") as string;
  const folderIds = folderIdsRaw ? folderIdsRaw.split(",").filter(Boolean) : [];

  const tagIdsRaw = formData.get("tagIds") as string;
  const tagIds = tagIdsRaw ? tagIdsRaw.split(",").filter(Boolean) : [];

  const metadataOptionIdsRaw = formData.get("metadataOptionIds") as string;
  const metadataOptionIds = metadataOptionIdsRaw ? metadataOptionIdsRaw.split(",").filter(Boolean) : [];

  const showInMainRaw = formData.get("showInMain") as string;
  const showInMain = showInMainRaw !== "false";

  await prisma.project.create({
    data: {
      title,
      platformLink: platformLink || null,
      thumbnail: thumbnail || null,
      contentType: contentType || null,
      clientName: clientName || null,
      clientLink: clientLink || null,
      clientAvatar: clientAvatar || null,
      description: description || null,
      views: views || null,
      likes: likes || null,
      showInMain,
      metadataOptions: { connect: metadataOptionIds.map((id) => ({ id })) },
      folders: { connect: folderIds.map((id) => ({ id })) },
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const platformLink = formData.get("platformLink") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const contentType = formData.get("contentType") as string;
  const clientName = formData.get("clientName") as string;
  const clientLink = formData.get("clientLink") as string;
  const clientAvatar = formData.get("clientAvatar") as string;
  const description = formData.get("description") as string;
  const views = formData.get("views") as string;
  const likes = formData.get("likes") as string;

  const folderIdsRaw = formData.get("folderIds") as string;
  const folderIds = folderIdsRaw ? folderIdsRaw.split(",").filter(Boolean) : [];

  const tagIdsRaw = formData.get("tagIds") as string;
  const tagIds = tagIdsRaw ? tagIdsRaw.split(",").filter(Boolean) : [];

  const metadataOptionIdsRaw = formData.get("metadataOptionIds") as string;
  const metadataOptionIds = metadataOptionIdsRaw ? metadataOptionIdsRaw.split(",").filter(Boolean) : [];

  const showInMainRaw = formData.get("showInMain") as string;
  const showInMain = showInMainRaw !== "false";

  await prisma.project.update({
    where: { id },
    data: {
      title,
      platformLink: platformLink || null,
      thumbnail: thumbnail || null,
      contentType: contentType || null,
      clientName: clientName || null,
      clientLink: clientLink || null,
      clientAvatar: clientAvatar || null,
      description: description || null,
      views: views || null,
      likes: likes || null,
      showInMain,
      metadataOptions: { set: metadataOptionIds.map((id) => ({ id })) },
      folders: { set: folderIds.map((id) => ({ id })) },
      tags: { set: tagIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createFolder(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;
  await prisma.folder.create({ data: { name } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteFolder(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.folder.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createTag(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;
  await prisma.tag.create({ data: { name } });
  revalidatePath("/admin");
}

export async function deleteTag(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.tag.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function reorderProjects(projectIds: string[]) {
  console.log("REORDERING PROJECTS:", projectIds);
  
  // Update each project's order based on its index in the array
  // Using a transaction to ensure all updates succeed or fail together
  await prisma.$transaction(
    projectIds.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { displayOrder: index },
      })
    )
  );

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createMetadataOption(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  if (!name || !type) return;
  await prisma.metadataOption.create({ data: { name, type } });
  revalidatePath("/admin");
}

export async function deleteMetadataOption(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.metadataOption.delete({ where: { id } });
  revalidatePath("/admin");
}

// ─── Testimonial Actions ───

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name") as string;
  const feedback = formData.get("feedback") as string;
  const rating = parseInt(formData.get("rating") as string) || 5;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const videoLink = formData.get("videoLink") as string;

  if (!feedback) return { error: "Feedback is required" };

  await prisma.testimonial.create({
    data: {
      name: name || "Anonymous Client",
      feedback,
      rating,
      email: email || null,
      phone: phone || null,
      videoLink: videoLink || null,
      approved: false,
    },
  });

  revalidatePath("/admin/notifications");
  return { success: true };
}

export async function approveTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.testimonial.update({
    where: { id },
    data: { approved: true },
  });
  revalidatePath("/admin/notifications");
  revalidatePath("/");
}

export async function deleteTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/notifications");
  revalidatePath("/");
}

export async function reorderTestimonials(ids: string[]) {
  const updates = ids.map((id, index) =>
    prisma.testimonial.update({
      where: { id },
      data: { displayOrder: index },
    })
  );
  await Promise.all(updates);
  revalidatePath("/admin/notifications");
  revalidatePath("/");
}

// ─── Site Settings ───

export async function updateShowReel(formData: FormData) {
  const url = formData.get("showReelUrl") as string;
  const thumbnail = formData.get("showReelThumbnail") as string;
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: { showReelUrl: url || null, showReelThumbnail: thumbnail || null },
    create: { id: "global", showReelUrl: url || null, showReelThumbnail: thumbnail || null },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

// ─── Clients Section ───

export async function toggleClientsSection(enabled: boolean) {
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: { showClients: enabled },
    create: { id: "global", showClients: enabled },
  });
  revalidatePath("/admin/video");
  revalidatePath("/");
}

export async function createClient(formData: FormData) {
  const channelName = formData.get("channelName") as string;
  const channelUrl = formData.get("channelUrl") as string;
  const channelImage = formData.get("channelImage") as string;
  const subscribers = formData.get("subscribers") as string;

  if (!channelName || !channelUrl) return { error: "Name and URL are required" };

  await prisma.client.create({
    data: {
      channelName,
      channelUrl,
      channelImage: channelImage || null,
      subscribers: subscribers || null,
    },
  });

  revalidatePath("/admin/video");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.client.delete({ where: { id } });
  revalidatePath("/admin/video");
  revalidatePath("/");
}

export async function reorderClients(clientIds: string[]) {
  await prisma.$transaction(
    clientIds.map((id, index) =>
      prisma.client.update({
        where: { id },
        data: { displayOrder: index },
      })
    )
  );
  revalidatePath("/admin/video");
  revalidatePath("/");
}
