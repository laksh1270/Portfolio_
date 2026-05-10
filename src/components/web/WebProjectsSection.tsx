import prisma from "@/lib/db";
import WebProjectsGrid from "./WebProjectsGrid";

export default async function WebProjectsSection() {
  const projects = await prisma.webProject.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
  });

  // Serialize dates for client component
  const serializedProjects = projects.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <WebProjectsGrid projects={serializedProjects} />;
}
