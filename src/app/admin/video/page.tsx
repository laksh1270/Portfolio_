import prisma from "@/lib/db";
import ProjectForm from "../ProjectForm";
import ShowReelForm from "../ShowReelForm";
import { 
  createFolder, createTag, deleteFolder, deleteTag,
  createMetadataOption, deleteMetadataOption 
} from "../actions";
import AdminProjectList from "../AdminProjectList";
import ClientsManager from "../ClientsManager";

const METADATA_TYPES = [
  { label: "Language", value: "LANGUAGE" },
  { label: "Subject Matter", value: "SUBJECT_MATTER" },
  { label: "Visual Style", value: "VISUAL_STYLE" },
  { label: "Narrative Form", value: "NARRATIVE_FORM" },
  { label: "Editing Style", value: "EDITING_STYLE" },
];

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
    include: { folders: true, tags: true, metadataOptions: true },
  });
  const folders = await prisma.folder.findMany();
  const tags = await prisma.tag.findMany();
  const metadataOptions = await prisma.metadataOption.findMany();
  
  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  const clients = await prisma.client.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto pb-32">
      <div className="flex gap-10 flex-col lg:flex-row">

        {/* Left Side: Create Project Form */}
        <div className="lg:w-2/3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
          <h2 className="text-2xl font-outfit mb-8 font-medium text-[#ffbb00]">Add New Project</h2>
          <ProjectForm folders={folders} tags={tags} metadataOptions={metadataOptions} />
        </div>

        {/* Right Side: Folders, Tags & Attributes */}
        <div className="lg:w-1/3 flex flex-col gap-8">

          {/* Show Reel Settings */}
          <ShowReelForm 
            initialUrl={siteSettings?.showReelUrl || null} 
            initialThumbnail={siteSettings?.showReelThumbnail || null}
          />

          {/* Clients Manager */}
          <ClientsManager 
            clients={clients} 
            showClients={siteSettings?.showClients ?? true} 
          />

          {/* Folders */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
            <h3 className="text-lg font-outfit mb-4 text-[#ffbb00]">Folders</h3>
            <form action={createFolder} className="flex gap-2">
              <input name="name" required placeholder="Folder name..." className="flex-1 bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00]" />
              <button type="submit" className="bg-[#ffbb00] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#ffd24d]">+</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {folders.map((f) => (
                <form key={f.id} action={deleteFolder} className="inline-flex">
                  <input type="hidden" name="id" value={f.id} />
                  <span className="text-xs bg-[#222] border border-[#444] px-3 py-1.5 rounded-full flex items-center gap-2">
                    {f.name}
                    <button type="submit" className="text-red-400 hover:text-red-300 font-bold">×</button>
                  </span>
                </form>
              ))}
            </div>
          </div>

          {/* Software Tags */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
            <h3 className="text-lg font-outfit mb-4 text-[#ffbb00]">Software Tags</h3>
            <form action={createTag} className="flex gap-2">
              <input name="name" required placeholder="Tag name..." className="flex-1 bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00]" />
              <button type="submit" className="bg-[#ffbb00] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#ffd24d]">+</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <form key={t.id} action={deleteTag} className="inline-flex">
                  <input type="hidden" name="id" value={t.id} />
                  <span className="text-xs bg-[#222] border border-[#444] px-3 py-1.5 rounded-full flex items-center gap-2">
                    {t.name}
                    <button type="submit" className="text-red-400 hover:text-red-300 font-bold">×</button>
                  </span>
                </form>
              ))}
            </div>
          </div>

          {/* Metadata Attributes */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
            <h3 className="text-lg font-outfit mb-4 text-[#ffbb00]">Project Attributes</h3>
            <p className="text-xs text-gray-500 mb-4">Add reusable options for Subject, Narrative, Style, etc.</p>
            
            <form action={createMetadataOption} className="space-y-3">
              <select name="type" required className="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffbb00]">
                {METADATA_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input name="name" required placeholder="Option name..." className="flex-1 bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00]" />
                <button type="submit" className="bg-[#ffbb00] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#ffd24d]">+</button>
              </div>
            </form>

            <div className="mt-8 space-y-6">
              {METADATA_TYPES.map(type => {
                const options = metadataOptions.filter(o => o.type === type.value);
                if (options.length === 0) return null;
                return (
                  <div key={type.value}>
                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{type.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map((o) => (
                        <form key={o.id} action={deleteMetadataOption} className="inline-flex">
                          <input type="hidden" name="id" value={o.id} />
                          <span className="text-[10px] bg-[#111] border border-[#222] px-2 py-1 rounded-md flex items-center gap-2 text-gray-300">
                            {o.name}
                            <button type="submit" className="text-red-500/50 hover:text-red-500">×</button>
                          </span>
                        </form>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* All Projects with Edit/Delete */}
      <div className="mt-12">
        <h2 className="text-2xl font-outfit mb-6 font-medium text-[#ffbb00]">All Projects ({projects.length})</h2>
        <AdminProjectList projects={projects} folders={folders} tags={tags} metadataOptions={metadataOptions} />
      </div>
    </main>
  );
}
