
export interface HSCodeItem {
  id: string;
  code: string;
  description: string;
  confidence: number;
  details?: {
    category: string;
    subcategory?: string;
    specification?: string;
  };
}
