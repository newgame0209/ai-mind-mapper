import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const DIFY_API_ENDPOINT = "http://localhost/v1/workflows/run";
const DIFY_API_TOKEN = "Bearer app-ug721ZAP7A3LqcKaApJMyWxs";

const Create = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("PDFファイルを選択してください");
      event.target.value = "";
    }
  };

  // PDFファイルをBase64に変換する関数
  const convertPdfToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // データURLからBase64部分のみを抽出
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Dify APIを呼び出す関数
  const callDifyApi = async (data: { pdf?: string; url?: string }) => {
    try {
      const response = await fetch(DIFY_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': DIFY_API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('APIレスポンスステータス:', response.status);
      const responseData = await response.json();
      console.log('APIレスポンス:', responseData);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('認証エラー: APIトークンを確認してください');
        }
        throw new Error(`APIエラー: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API呼び出しエラー:', error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      let requestData = {};

      if (pdfFile) {
        const base64Pdf = await convertPdfToBase64(pdfFile);
        requestData = { pdf: base64Pdf };
        console.log('PDFをアップロード:', { fileName: pdfFile.name });
      } else if (url.trim()) {
        requestData = { url: url.trim() };
        console.log('URLを送信:', { url });
      } else {
        toast.error("PDFファイルまたはURLを入力してください");
        return;
      }

      const result = await callDifyApi(requestData);
      console.log('生成完了:', result);
      toast.success("マインドマップを生成中です");
      navigate("/result/1");

    } catch (error) {
      console.error('生成エラー:', error);
      toast.error(error instanceof Error ? error.message : "エラーが発生しました");
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
                onClick={handleGenerate}
                disabled={!pdfFile || isLoading}
              >
                {isLoading ? "生成中..." : "マインドマップを生成"}
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
                onClick={handleGenerate}
                disabled={!url.trim() || isLoading}
              >
                {isLoading ? "生成中..." : "マインドマップを生成"}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Create;