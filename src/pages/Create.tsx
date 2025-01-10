import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Link as LinkIcon } from "lucide-react";

const Create = () => {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Create Mind Map</h1>
      
      <Tabs defaultValue="pdf" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pdf">PDF Upload</TabsTrigger>
          <TabsTrigger value="url">Web URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pdf">
          <Card className="border-2 border-dashed p-8">
            <div className="flex flex-col items-center text-center">
              <FileUp className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">Upload PDF</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Drag and drop your PDF file here, or click to browse
              </p>
              <Button>Select File</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="url">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter website URL" />
              </div>
              <Button className="w-full">Generate Mind Map</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Create;