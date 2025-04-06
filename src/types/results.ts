
export interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
  isAlternativeSelected?: boolean; // New flag to track if this is a selected alternative
  originalHsCode?: string; // Store the original HS code when an alternative is selected
  alternatives?: Array<{
    hsCode: string;
    description: string;
    confidence: number;
  }>;
}

export interface HsCodeDetail {
  code: string;
  description: string;
}
