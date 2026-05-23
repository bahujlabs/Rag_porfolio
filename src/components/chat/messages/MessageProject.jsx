import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function MessageProjects({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3 mt-2 w-full">
      {projects.map((project, i) => {
        const Icon = project.icon;
        return (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="text-accent text-lg shrink-0" />}
              <span className="font-semibold text-text">{project.title}</span>
            </div>
            <p className="text-sm text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-1">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted hover:underline"
                >
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}