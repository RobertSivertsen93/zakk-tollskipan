
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
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

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
  const { language } = useLanguage();
  const t = translations[language];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "border-r bg-background h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <Package className="h-5 w-5 text-black mr-2" />
            <h1 className="text-xl font-bold">Zakk</h1>
          </div>
        )}
        {collapsed && (
          <Package className="h-5 w-5 text-black mx-auto" />
        )}
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
          {t.sidebar.lookupHsCodes}
        </NavItem>
        
        <NavItem 
          to="/" 
          icon={FileSpreadsheet}
          active={currentPath === "/"}
          collapsed={collapsed}
        >
          {t.sidebar.processPdfFile}
        </NavItem>
        
        <NavItem 
          to="/hs-table" 
          icon={Table}
          active={currentPath === "/hs-table"}
          collapsed={collapsed}
        >
          {t.sidebar.browseHsTable}
        </NavItem>
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                R
              </div>
              <div className="text-sm">
                <div className="font-medium">robert@sivertsen.fo</div>
                <div className="text-xs text-muted-foreground">{t.auth.trial}</div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-4 border-t flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            R
          </div>
          <LanguageToggle />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
