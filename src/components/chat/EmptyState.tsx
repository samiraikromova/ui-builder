import { Project } from "./ChatHeader";

const mockProjects: Project[] = [
  {
    id: "cb4",
    name: "CB4 (Cam's Brain)",
    icon: "🧠",
    description: "Vector search integration with personal knowledge base",
  },
  {
    id: "contract",
    name: "Contract Writer",
    icon: "📄",
    description: "Generate professional contracts and legal documents",
  },
  {
    id: "ad-writing",
    name: "Ad Writing",
    icon: "📢",
    description: "Create compelling ad copy for various platforms",
  },
  {
    id: "sales-review",
    name: "Sales Call Review",
    icon: "📞",
    description: "Analyze and summarize sales call transcripts",
  },
];

interface EmptyStateProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
}

export function EmptyState({ selectedProject, onSelectProject }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <h1 className="mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-5xl font-medium text-transparent">
        Hello, Cam
      </h1>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {mockProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all ${
              selectedProject?.id === project.id
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border bg-surface hover:bg-surface-hover text-foreground"
            }`}
          >
            <span className="text-base">{project.icon}</span>
            <span>{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
