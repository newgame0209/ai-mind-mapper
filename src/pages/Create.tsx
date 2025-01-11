import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Create = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("PDFファイルを選択してください");
      event.target.value = "";
    }
  };

  const handlePdfGenerate = () => {
    if (!pdfFile) {
      toast.error("PDFファイルを選択してください");
      return;
    }
    console.log("PDF生成開始:", { fileName: pdfFile.name, fileSize: pdfFile.size });
    toast.success("マインドマップを生成中です");
    navigate("/result/1");
  };

  const handleUrlGenerate = () => {
    if (!url.trim()) {
      toast.error("URLを入力してください");
      return;
    }
    console.log("URL生成開始:", { url });
    toast.success("マインドマップを生成中です");
    navigate("/result/1");
  };

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-12 text-4xl font-bold">マインドマップを作成</h1>
      
      <Tabs defaultValue="pdf" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-16 text-lg">
          <TabsTrigger value="pdf" className="text-lg">PDF アップロード</TabsTrigger>
          <TabsTrigger value="url" className="text-lg">Web URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pdf">
          <Card className="border-2 border-dashed p-12">
            <div className="flex flex-col items-center text-center">
              <FileUp className="mb-6 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-3 text-2xl font-semibold">PDFをアップロード</h3>
              <p className="mb-6 text-lg text-muted-foreground">
                PDFファイルをドラッグ＆ドロップ、または選択してください
              </p>
              <Input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="mb-4 w-full max-w-md"
              />
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={handlePdfGenerate}
                disabled={!pdfFile}
              >
                マインドマップを生成
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="url">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <LinkIcon className="h-6 w-6 text-muted-foreground" />
                <Input 
                  placeholder="WebサイトのURLを入力" 
                  className="text-lg h-14"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="w-full text-lg h-14"
                onClick={handleUrlGenerate}
                disabled={!url.trim()}
              >
                マインドマップを生成
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Create;