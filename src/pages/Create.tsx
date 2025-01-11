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
  const [isLoading, setIsLoading] = useState(false);

  const convertPdfToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const callDifyApi = async (data: { pdf?: string; url?: string }) => {
    try {
      const requestBody = {
        inputs: {
          pdf: data.pdf,
          url: data.url
        },
        response_mode: "streaming",
        user: "user-123"
      };

      console.log("Sending request to Dify API:", {
        ...requestBody,
        inputs: {
          ...requestBody.inputs,
          pdf: data.pdf ? "base64-data" : undefined // PDFデータは長すぎるのでログには出力しない
        }
      });

      const response = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer app-Fk0xJxMQKsEAi8hRg9Q9ihk3"
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Dify API error details:", responseData);
        throw new Error(`API error: ${response.status} - ${JSON.stringify(responseData)}`);
      }

      console.log("Dify API response:", responseData);
      return responseData;

    } catch (error) {
      console.error("API呼び出しエラー:", error);
      if (error instanceof Error) {
        throw new Error(`API呼び出し失敗: ${error.message}`);
      }
      throw new Error("予期せぬエラーが発生しました");
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("PDFファイルを選択してください");
      event.target.value = "";
    }
  };

  const handlePdfGenerate = async () => {
    if (!pdfFile) {
      toast.error("PDFファイルを選択してください");
      return;
    }

    setIsLoading(true);
    try {
      console.log("PDF生成開始:", { fileName: pdfFile.name, fileSize: pdfFile.size });
      const base64Pdf = await convertPdfToBase64(pdfFile);
      const result = await callDifyApi({ pdf: base64Pdf });
      console.log("API呼び出し成功:", result);
      toast.success("マインドマップを生成中です");
      navigate("/result/1");
    } catch (error) {
      console.error("処理エラー:", error);
      toast.error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlGenerate = async () => {
    if (!url.trim()) {
      toast.error("URLを入力してください");
      return;
    }

    setIsLoading(true);
    try {
      console.log("URL生成開始:", { url });
      const result = await callDifyApi({ url: url.trim() });
      console.log("API呼び出し成功:", result);
      toast.success("マインドマップを生成中です");
      navigate("/result/1");
    } catch (error) {
      console.error("処理エラー:", error);
      toast.error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
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
                disabled={!pdfFile || isLoading}
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
                disabled={!url.trim() || isLoading}
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
