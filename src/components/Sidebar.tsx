
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  FileSpreadsheet, 
  Table,
  Package
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
        <div className="flex items-center">
          <Package className="h-5 w-5 text-black mr-2" />
          <h1 className="text-xl font-bold">Zakk</h1>
        </div>
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
          Process PDF file
        </NavItem>
        
        <NavItem 
          to="/hs-table" 
          icon={Table}
          active={currentPath === "/hs-table"}
        >
          Browse HS table
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
