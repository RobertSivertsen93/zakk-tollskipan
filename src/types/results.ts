
export interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
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
