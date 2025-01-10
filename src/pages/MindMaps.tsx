import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

const DUMMY_MAPS = [
  {
    id: 1,
    title: "Project Requirements",
    date: "2024-01-15",
    type: "PDF",
    thumbnail: "/lovable-uploads/db71bd2b-92aa-4e93-85ac-9a1a136042fc.png"
  },
  {
    id: 2,
    title: "Research Notes",
    date: "2024-01-14",
    type: "URL",
    thumbnail: "/lovable-uploads/994d514f-e9f8-4c71-b237-3819f359a917.png"
  }
];

const MindMaps = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Mind Maps</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "mindmap-grid" : "mindmap-list"}>
        {DUMMY_MAPS.map((map) => (
          <div key={map.id} className="mindmap-card">
            <img
              src={map.thumbnail}
              alt={map.title}
              className="mb-3"
            />
            <h3 className="mb-1 font-semibold">{map.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{map.date}</span>
              <span>{map.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MindMaps;