import {
  Project,
  ProjectFilters,
  ProjectStatus,
  Platform,
} from "../types/project";
import { supabase } from "@/lib/supabase";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Minimal Price Tracker",
    description:
      "A clean, Apple-styled price tracking app with minimal design principles",
    status: "live",
    platforms: ["ios", "android"],
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    lastModified: new Date("2024-01-20"),
    tags: ["price tracking", "minimal design", "finance"],
    category: "productivity",
    isLive: true,
    version: "1.0.0",
  },
  {
    id: "2",
    name: "TaskFlow Pro",
    description: "Advanced task management with AI-powered prioritization",
    status: "in-progress",
    platforms: ["ios", "android", "web"],
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    lastModified: new Date("2024-01-18"),
    tags: ["task management", "AI", "productivity"],
    category: "productivity",
    isLive: false,
    version: "0.8.2",
  },
  {
    id: "3",
    name: "HealthSync",
    description:
      "Comprehensive health monitoring and fitness tracking platform",
    status: "review",
    platforms: ["ios", "android"],
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-17"),
    lastModified: new Date("2024-01-17"),
    tags: ["health", "fitness", "monitoring"],
    category: "health",
    isLive: false,
    version: "0.9.1",
  },
  {
    id: "4",
    name: "EduLearn",
    description: "Interactive learning platform with gamified education",
    status: "draft",
    platforms: ["web", "ios"],
    thumbnail: "/api/placeholder/300/200",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    lastModified: new Date("2024-01-12"),
    tags: ["education", "gamification", "learning"],
    category: "education",
    isLive: false,
    version: "0.1.0",
  },
];

export function filterProjects(
  projects: Project[],
  filters: ProjectFilters
): Project[] {
  return projects
    .filter((project) => {
      // Search filter
      if (
        filters.search &&
        !project.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.description
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && project.status !== filters.status) {
        return false;
      }

      // Platform filter
      if (
        filters.platform !== "all" &&
        !project.platforms.includes(filters.platform)
      ) {
        return false;
      }

      // Category filter
      if (filters.category !== "all" && project.category !== filters.category) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
}

export function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case "live":
      return "success";
    case "in-progress":
      return "warning";
    case "review":
      return "info";
    case "draft":
      return "secondary";
    case "archived":
      return "destructive";
    default:
      return "default";
  }
}

export function getPlatformIcon(platform: Platform): string {
  switch (platform) {
    case "ios":
      return "🍎";
    case "android":
      return "🤖";
    case "web":
      return "🌐";
    case "cross-platform":
      return "📱";
    default:
      return "📱";
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user projects:", error);
      // Fallback to mock projects if database fails
      return mockProjects;
    }

    if (!projects || projects.length === 0) {
      // Return mock projects if no projects exist
      return mockProjects;
    }

    // Transform database projects to match Project interface
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description || "",
      status: project.status || "draft",
      platforms: project.platforms || [],
      thumbnail: project.thumbnail || "/api/placeholder/300/200",
      createdAt: new Date(project.created_at),
      updatedAt: new Date(project.updated_at),
      lastModified: new Date(project.last_modified),
      tags: project.tags || [],
      category: project.category || "other",
      isLive: project.is_live || false,
      version: project.version || "1.0.0",
    }));
  } catch (error) {
    console.error("Error in getUserProjects:", error);
    // Fallback to mock projects
    return mockProjects;
  }
}

export async function createProject(
  userId: string,
  projectData: Partial<Project>
): Promise<Project> {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        user_id: userId,
        name: projectData.name || "New Project",
        description: projectData.description || "",
        status: projectData.status || "draft",
        platforms: projectData.platforms || [],
        category: projectData.category || "other",
        tags: projectData.tags || [],
        is_live: false,
        version: "1.0.0",
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: project.id,
      name: project.name,
      description: project.description || "",
      status: project.status || "draft",
      platforms: project.platforms || [],
      thumbnail: project.thumbnail || "/api/placeholder/300/200",
      createdAt: new Date(project.created_at),
      updatedAt: new Date(project.updated_at),
      lastModified: new Date(project.last_modified),
      tags: project.tags || [],
      category: project.category || "other",
      isLive: project.is_live || false,
      version: project.version || "1.0.0",
    };
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}
