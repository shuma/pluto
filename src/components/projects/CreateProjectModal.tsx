"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreateProjectData, Platform } from "@/lib/types/project";
import { Plus } from "lucide-react";

interface CreateProjectModalProps {
  onProjectCreate: (projectData: CreateProjectData) => void;
  trigger?: React.ReactNode;
}

// Create a proper error type for validation
interface ValidationErrors {
  name?: string;
  description?: string;
  platforms?: string;
  category?: string;
  template?: string;
}

export function CreateProjectModal({
  onProjectCreate,
  trigger,
}: CreateProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateProjectData>({
    name: "",
    description: "",
    category: "productivity",
    platforms: [],
    template: undefined,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: ValidationErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.platforms.length === 0)
      newErrors.platforms = "At least one platform is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onProjectCreate(formData);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "productivity",
      platforms: [],
      template: undefined,
    });
    setErrors({});
  };

  const togglePlatform = (platform: Platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
    if (errors.platforms)
      setErrors((prev) => ({ ...prev, platforms: undefined }));
  };

  const handleInputChange = (field: keyof CreateProjectData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors])
      setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start building your next mobile app. Fill in the details below to
            get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name *
            </label>
            <Input
              id="name"
              placeholder="Enter project name..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full min-h-[80px] px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                errors.description ? "border-red-500" : "border-input"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Platforms *</label>
            <div className="flex flex-wrap gap-2">
              {(["ios", "android", "web", "cross-platform"] as Platform[]).map(
                (platform) => (
                  <Badge
                    key={platform}
                    variant={
                      formData.platforms.includes(platform)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer hover:opacity-80 transition-opacity ${
                      formData.platforms.includes(platform)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => togglePlatform(platform)}
                  >
                    {platform === "ios" && "🍎"}
                    {platform === "android" && "🤖"}
                    {platform === "web" && "🌐"}
                    {platform === "cross-platform" && "📱"}
                    <span className="ml-1 capitalize">
                      {platform === "cross-platform"
                        ? "Cross Platform"
                        : platform}
                    </span>
                  </Badge>
                )
              )}
            </div>
            {errors.platforms && (
              <p className="text-sm text-red-500">{errors.platforms}</p>
            )}
          </div>

          {/* Template (Optional) */}
          <div className="space-y-2">
            <label htmlFor="template" className="text-sm font-medium">
              Template (Optional)
            </label>
            <Select
              value={formData.template || ""}
              onValueChange={(value) => handleInputChange("template", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Template</SelectItem>
                <SelectItem value="blank">Blank App</SelectItem>
                <SelectItem value="todo">Todo App</SelectItem>
                <SelectItem value="chat">Chat App</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
