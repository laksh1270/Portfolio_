import prisma from "@/lib/db";
import ClientProjectsGrid from "./ClientProjectsGrid";

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
    include: { folders: true, tags: true, metadataOptions: true },
  });

  const folders = await prisma.folder.findMany({
    orderBy: { name: "asc" },
  });

  console.log("PROJECTS COUNT:", projects.length);
  console.log("FOLDERS COUNT:", folders.length);
  if (folders.length > 0) {
    console.log("FOLDERS NAMES:", folders.map(f => f.name));
  }

  // Serialize dates for client component
  const serializedProjects = projects.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <ClientProjectsGrid projects={serializedProjects} folders={folders} />;
}
