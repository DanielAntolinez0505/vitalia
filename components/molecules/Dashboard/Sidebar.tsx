import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight, ChevronDown, LogOut } from "lucide-react";
import { menuItems, MenuItem, SubMenuItem } from "./utils";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
}

export function Sidebar({ isMinimized, toggleMinimize }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const activeIndex = menuItems.findIndex((item) =>
      item.items.some((subItem) => subItem.href === pathname)
    );
    setActiveItem(activeIndex !== -1 ? activeIndex : null);
  }, [pathname]);

  const handleItemClick = (index: number) => {
    if (isMinimized) {
      toggleMinimize();
      setActiveItem(index);
    } else {
      setActiveItem(activeItem === index ? null : index);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as
      | LucideIcon
      | undefined;
    return IconComponent ? (
      <IconComponent className={`${isMinimized ? "h-7 w-7" : "h-6 w-6"}`} />
    ) : null;
  };

  return (
    <SidebarProvider>
      <SidebarComponent
        className={`fixed left-0 top-0 bottom-0 z-30 ${
          isMinimized ? "w-[72px]" : "w-[240px]"
        } transition-all duration-300 ease-in-out bg-background border-r`}
      >
        <SidebarHeader className="flex items-center justify-between p-4 border-b">
          {!isMinimized && (
            <h2 className="text-lg font-semibold">Mi Dashboard</h2>
          )}
        </SidebarHeader>
        <SidebarContent className="flex flex-col py-4">
          {menuItems.map((item: MenuItem, index: number) => (
            <Collapsible
              key={index}
              open={activeItem === index && !isMinimized}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start px-4 py-3 text-left ${
                    isMinimized ? "justify-center" : ""
                  } ${activeItem === index ? "bg-accent" : ""}`}
                  onClick={() => handleItemClick(index)}
                >
                  {renderIcon(item.icon)}
                  {!isMinimized && (
                    <span className="ml-3 text-base">{item.label}</span>
                  )}
                  {!isMinimized && <ChevronDown className="ml-auto h-5 w-5" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {!isMinimized &&
                  item.items.map((subItem: SubMenuItem, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className={`flex items-center gap-3 py-2 pl-8 pr-4 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                        pathname === subItem.href
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      {renderIcon(subItem.icon)}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button
            variant="outline"
            className={`${
              isMinimized ? "w-12 h-12 p-0" : "w-full py-2"
            } justify-center`}
            onClick={() => console.log("Cerrar sesión")}
          >
            <LogOut className={`h-6 w-6 ${isMinimized ? "" : "mr-2"}`} />
            {!isMinimized && (
              <span>
                <Link href="/">Cerrar Sesión</Link>
              </span>
            )}
          </Button>
        </SidebarFooter>
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleMinimize}
          className="absolute top-4 -right-3 z-40 rounded-full shadow-md"
          aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMinimized ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </SidebarComponent>
    </SidebarProvider>
  );
}
