"use client";

import { useState } from "react";
import resourcesData from "@/data/resources.json";
import type { Resource } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, Video, Code2, Globe, MessageSquare, Wrench } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  textbook: <BookOpen className="h-5 w-5 text-blue-500" />,
  video: <Video className="h-5 w-5 text-red-500" />,
  practice: <Code2 className="h-5 w-5 text-green-500" />,
  reference: <Globe className="h-5 w-5 text-purple-500" />,
  forum: <MessageSquare className="h-5 w-5 text-orange-500" />,
  tool: <Wrench className="h-5 w-5 text-gray-500" />,
};

const typeLabels: Record<string, string> = {
  textbook: "Textbooks",
  video: "Videos",
  practice: "Practice",
  reference: "Reference",
  forum: "Community",
  tool: "Tools",
};

export default function ResourcesPage() {
  const resources = resourcesData.resources as Resource[];
  const types = Object.keys(typeLabels);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-muted-foreground">Curated links to the best AP CS A study materials, all verified and up-to-date.</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {types.map((type) => (
            <TabsTrigger key={type} value={type}>{typeLabels[type]}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>

        {types.map((type) => (
          <TabsContent key={type} value={type} className="space-y-3 mt-4">
            {resources.filter((r) => r.type === type).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:border-primary transition-colors cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              {typeIcons[resource.type] || <Globe className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm">{resource.title}</h3>
                <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
              <div className="flex flex-wrap gap-1">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
