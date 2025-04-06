
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  FileSpreadsheet, 
  Table,
  Package,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const NavItem = ({ to, icon: Icon, children, active, collapsed }: { 
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  active: boolean;
  collapsed: boolean;
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full",
        active 
          ? "bg-primary/10 text-primary"
          : "text-foreground/70 hover:text-foreground hover:bg-muted/80"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{children}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "border-r bg-background h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-black mr-2" />
          {!collapsed && <h1 className="text-xl font-bold">Zakk</h1>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md text-foreground/70 hover:bg-muted/80"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavItem 
          to="/hscode-lookup" 
          icon={Search}
          active={currentPath === "/hscode-lookup"}
          collapsed={collapsed}
        >
          Lookup HS codes
        </NavItem>
        
        <NavItem 
          to="/" 
          icon={FileSpreadsheet}
          active={currentPath === "/"}
          collapsed={collapsed}
        >
          Process PDF file
        </NavItem>
        
        <NavItem 
          to="/hs-table" 
          icon={Table}
          active={currentPath === "/hs-table"}
          collapsed={collapsed}
        >
          Browse HS table
        </NavItem>
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              R
            </div>
            <div className="text-sm">
              <div className="font-medium">robert@sivertsen.fo</div>
              <div className="text-xs text-muted-foreground">Trial</div>
            </div>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-4 border-t flex justify-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            R
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
