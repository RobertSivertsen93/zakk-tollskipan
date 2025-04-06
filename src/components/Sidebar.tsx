
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  FileSpreadsheet, 
  Globe, 
  Table,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ to, icon: Icon, children, active }: { 
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  active: boolean;
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
      <span>{children}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 border-r bg-background h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Tariffy</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavItem 
          to="/hscode-lookup" 
          icon={Search}
          active={currentPath === "/hscode-lookup"}
        >
          Lookup HS codes
        </NavItem>
        
        <NavItem 
          to="/" 
          icon={FileSpreadsheet}
          active={currentPath === "/"}
        >
          Process Excel file
        </NavItem>
        
        <NavItem 
          to="/api-access" 
          icon={Globe}
          active={currentPath === "/api-access"}
        >
          API Access
        </NavItem>
        
        <NavItem 
          to="/hs-table" 
          icon={Table}
          active={currentPath === "/hs-table"}
        >
          Browse HS table
        </NavItem>

        <NavItem 
          to="/results" 
          icon={FileText}
          active={currentPath === "/results"}
        >
          Results
        </NavItem>
      </nav>
      
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
    </div>
  );
};

export default Sidebar;
