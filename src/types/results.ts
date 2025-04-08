
export interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
  isAlternativeSelected?: boolean; // Flag to track if this is a selected alternative
  originalHsCode?: string; // Store the original HS code when an alternative is selected
  alternatives?: Array<{
    hsCode: string;
    description: string;
    confidence: number;
  }>;
  
  // Line item fields
  itemNumber?: string; // Product/item number with red star
  countryOfOrigin?: string; // Country of origin with red star
  quantity?: number; // Quantity with red star
  netWeight?: number; // Net weight with red star
  totalPrice?: number; // Total price with red star
}

export interface HsCodeDetail {
  code: string;
  description: string;
}

export interface InvoiceDetails {
  invoiceNumber: string; // Invoice number with red star
  invoiceDate: string; // Invoice date with red star
  dueDate: string; // Due date with red star
  sender: string; // Sender with red star
  reference?: string; // Reference/note
  documentNumber?: string; // Document number
  currency?: string; // Currency
  items: CustomsItem[];
}
