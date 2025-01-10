import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-5xl font-bold">AI マインドマップ ジェネレーター</h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        PDFやWebコンテンツを、AIの力で美しく整理された
        マインドマップに変換します。
      </p>
      <Button asChild size="lg" className="text-lg px-8 py-6">
        <Link to="/create">はじめる</Link>
      </Button>
    </div>
  );
}

export default Index;