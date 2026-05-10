import prisma from "@/lib/db";
import WebProjectForm from "./WebProjectForm";
import AdminWebProjectList from "./AdminWebProjectList";
import WebTechStackForm from "./WebTechStackForm";

export default async function WebAdminPage() {
  const projects = await prisma.webProject.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
  });

  const techStacks = await prisma.webTechStack.findMany({
    orderBy: { name: "asc" }
  });

  // Combine tags from existing projects and the dedicated WebTechStack model
  const projectTags = projects.flatMap((p) => p.techStack || []);
  const modelTags = techStacks.map((t) => t.name);
  const existingTags = Array.from(new Set([...projectTags, ...modelTags])).sort();

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto pb-32">
      <div className="flex gap-10 flex-col lg:flex-row">

        {/* Left Side: Create Project Form */}
        <div className="lg:w-1/3 h-fit sticky top-6">
          <WebTechStackForm techStacks={techStacks} />
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-2xl font-outfit mb-8 font-medium text-[#ffbb00]">Add Web Project</h2>
            <WebProjectForm existingTags={existingTags} />
          </div>
        </div>

        {/* Right Side: All Projects List */}
        <div className="lg:w-2/3">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-2xl font-outfit mb-6 font-medium text-[#ffbb00]">All Web Projects ({projects.length})</h2>
            <AdminWebProjectList projects={projects} existingTags={existingTags} />
          </div>
        </div>

      </div>
    </main>
  );
}
