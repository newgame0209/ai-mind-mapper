import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

const Result = () => {
  const { id } = useParams();
  const [mindMapData, setMindMapData] = useState({
    title: "サンプルマインドマップ",
    nodes: [
      { id: "1", text: "メインアイデア", x: 400, y: 300 },
      { id: "2", text: "サブトピック1", x: 200, y: 200 },
      { id: "3", text: "サブトピック2", x: 600, y: 200 },
    ]
  });

  const handleNodeTextChange = (nodeId: string, newText: string) => {
    setMindMapData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, text: newText } : node
      )
    }));
  };

  const handleExportPNG = () => {
    // PNG出力の実装は後ほど
    console.log("PNG出力機能は実装予定です");
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">マインドマップ生成結果</h1>
        <Button onClick={handleExportPNG} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          PNG出力
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">タイトル</h2>
          <Input
            value={mindMapData.title}
            onChange={(e) => setMindMapData(prev => ({ ...prev, title: e.target.value }))}
            className="max-w-md"
          />
        </div>

        <div className="relative min-h-[500px] rounded-md border bg-white p-4">
          {mindMapData.nodes.map(node => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <Input
                value={node.text}
                onChange={(e) => handleNodeTextChange(node.id, e.target.value)}
                className="min-w-[150px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;