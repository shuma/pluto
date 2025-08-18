export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  platforms: Platform[];
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  lastModified: Date;
  tags: string[];
  category: ProjectCategory;
  isLive: boolean;
  version: string;
}

export type ProjectStatus =
  | "draft"
  | "in-progress"
  | "review"
  | "live"
  | "archived";

export type Platform = "ios" | "android" | "web" | "cross-platform";

export type ProjectCategory =
  | "productivity"
  | "entertainment"
  | "business"
  | "education"
  | "health"
  | "social"
  | "utility"
  | "other";

export interface ProjectFilters {
  search: string;
  status: ProjectStatus | "all";
  platform: Platform | "all";
  category: ProjectCategory | "all";
  sortBy: "name" | "createdAt" | "updatedAt" | "lastModified";
  sortOrder: "asc" | "desc";
}

export interface CreateProjectData {
  name: string;
  description: string;
  category: ProjectCategory;
  platforms: Platform[];
  template?: string;
}
