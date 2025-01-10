import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-4xl font-bold">AI Mind Map Generator</h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Transform your PDFs and web content into beautiful, organized mind maps with
        the power of AI.
      </p>
      <Button asChild size="lg">
        <Link to="/create">Get Started</Link>
      </Button>
    </div>
  );
}

export default Index;