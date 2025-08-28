"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/contexts/SupabaseContext";
import { Plus, LogOut, FolderOpen, Calendar, Tag } from "lucide-react";
import { getUserProjects, createProject } from "@/lib/utils/project-utils";
import type { Project } from "@/lib/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut, loading: authLoading } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const userProjects = await getUserProjects(user!.id);
      setProjects(userProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject(user!.id, {
        name: "New Project",
        description: "Describe your mobile app idea and I'll help you build it",
        status: "draft",
        category: "other",
        tags: [],
      });
      router.push(`/projects/${newProject.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
      // Fallback to random UUID if database fails
      const newProjectId = crypto.randomUUID();
      router.push(`/projects/${newProjectId}`);
    }
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="border-b border-[#424242] bg-neutral-900">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-white">My Projects</h1>
            <span className="text-sm text-gray-400">({projects.length})</span>
          </div>

          {/* User Info and Sign Out */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">{user?.email}</span>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-gray-400 hover:text-white hover:bg-[#2c2c2c]"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Create New Project Button */}
        <div className="mb-8">
          <Button
            onClick={handleCreateProject}
            className="bg-[#007aff] hover:bg-[#0056cc] text-white px-6 py-3 h-12 text-base"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <FolderOpen className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first project to get started building mobile apps with
              AI
            </p>
            <Button
              onClick={handleCreateProject}
              className="bg-[#007aff] hover:bg-[#0056cc] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="bg-[#232323] border border-[#424242] rounded-lg p-6 cursor-pointer hover:bg-[#2c2c2c] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    {project.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "live"
                        ? "bg-green-900/20 text-green-400"
                        : project.status === "in-progress"
                        ? "bg-blue-900/20 text-blue-400"
                        : project.status === "draft"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {project.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>

                  {project.category && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {project.category}
                    </div>
                  )}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#2c2c2c] text-gray-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-[#2c2c2c] text-gray-400 text-xs rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
