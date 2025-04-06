
import { HSCodeItem } from "@/types/hs-code";

export const mockHSCodes: HSCodeItem[] = [
  {
    id: "1601",
    code: "1601",
    description: "Volkswagen Currywurst (sausage), branded as a Volkswagen Original Part",
    confidence: 95,
    details: {
      category: "16 - Preparations of meat",
      subcategory: "1601 - Sausages and similar products",
      specification: "1601.00 - Of meat, meat offal, blood or insects"
    }
  },
  {
    id: "7318",
    code: "7318",
    description: "Black metal screw",
    confidence: 85,
    details: {
      category: "73 - Articles of iron or steel",
      subcategory: "7318 - Screws, bolts, nuts, coach screws",
      specification: "7318.15 - Threaded screws and bolts"
    }
  },
  {
    id: "9403.60",
    code: "9403.60",
    description: "Table from IKEA",
    confidence: 50,
    details: {
      category: "94 - Furniture; bedding, mattresses",
      subcategory: "9403 - Other furniture and parts thereof",
      specification: "9403.60 - Other wooden furniture"
    }
  },
  {
    id: "3208.90",
    code: "3208.90",
    description: "KLARLACK HOCHGLÄNZEND - High gloss clear lacquer",
    confidence: 75,
    details: {
      category: "32 - Tanning or dyeing extracts",
      subcategory: "3208 - Paints and varnishes based on synthetic polymers",
      specification: "3208.90 - Other"
    }
  },
  {
    id: "3208.90-2",
    code: "3208.90",
    description: "LACKSPRAY RAL 5010 ENZIANBLAU 400ML V6 - Spray paint, RAL 5010 Gentian Blue, 400ml",
    confidence: 75,
    details: {
      category: "32 - Tanning or dyeing extracts",
      subcategory: "3208 - Paints and varnishes based on synthetic polymers",
      specification: "3208.90 - Other"
    }
  },
  {
    id: "8204.11",
    code: "8204.11",
    description: "1/2″Flerlandstop XZN lang 100 mm VZ 14 - likely a tool or fastener",
    confidence: 40,
    details: {
      category: "82 - Tools, implements, cutlery",
      subcategory: "8204 - Hand-operated spanners and wrenches",
      specification: "8204.11 - Nonadjustable, and parts thereof"
    }
  }
];
