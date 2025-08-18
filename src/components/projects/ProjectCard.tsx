"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types/project";
import {
  getStatusColor,
  getPlatformIcon,
  formatDate,
  getRelativeTime,
} from "@/lib/utils/project-utils";
import {
  Edit,
  Download,
  Share2,
  MoreVertical,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onExport?: (project: Project) => void;
  onShare?: (project: Project) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onExport,
  onShare,
}: ProjectCardProps) {
  const statusColor = getStatusColor(project.status);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Thumbnail Placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-muted to-muted/50 rounded-md mb-3 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs">Project Preview</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Status and Platforms */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={statusColor as "default" | "secondary" | "destructive" | "outline"}>
              {project.status === "live" && project.isLive && (
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
              )}
              {project.status}
            </Badge>
            {project.isLive && (
              <Badge variant="secondary" className="text-xs">
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {project.platforms.map((platform, index) => (
              <span key={index} className="text-lg" title={platform}>
                {getPlatformIcon(platform)}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full space-y-3">
          {/* Version and Dates */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>v{project.version}</span>
            <span title={formatDate(project.lastModified)}>
              {getRelativeTime(project.lastModified)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(project)}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onExport?.(project)}
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onShare?.(project)}
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
