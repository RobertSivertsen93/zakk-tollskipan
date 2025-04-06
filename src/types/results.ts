
export interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
}

export interface HsCodeDetail {
  code: string;
  description: string;
}
