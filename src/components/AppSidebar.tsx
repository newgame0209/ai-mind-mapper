import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "ホーム",
    icon: Home,
    path: "/",
  },
  {
    title: "マインドマップ一覧",
    icon: FileText,
    path: "/mindmaps",
  },
  {
    title: "新規作成",
    icon: Plus,
    path: "/create",
  },
];

const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-2">{children}</div>;
};

const SidebarMenuButton = Button;

const SidebarContent = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/lovable-uploads/aaefa8b2-bc8f-4976-a159-4941e1014363.png"
            alt="AI Mind Map"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">AI Mind Map</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                variant="ghost"
                className="w-full justify-start text-lg py-3"
              >
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon className="h-6 w-6" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export const AppSidebar = () => {
  const { state, setOpen } = useSidebar();

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r lg:block">
        <SidebarContent />
      </aside>

      <Sheet open={state === "expanded"} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <span className="sr-only">サイドバーを開く</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};