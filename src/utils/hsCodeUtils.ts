
// Utility functions for HS code operations

// Mock HS code database for demonstrating hierarchical information
export const getHsCodeHierarchy = (hsCode: string) => {
  // Split the code by levels (2, 4, 6, 8, 10 digits)
  const parts = [
    hsCode.substring(0, 2),
    hsCode.substring(0, 4),
    hsCode.substring(0, 6),
    hsCode.substring(0, 8),
    hsCode.length > 8 ? hsCode : null
  ].filter(Boolean) as string[];
  
  // Create mock descriptions based on the code parts
  const mockDescriptions: Record<string, string> = {
    // Sample for computer keyboards (8471.60.10)
    "84": "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof",
    "8471": "Automatic data processing machines and units thereof",
    "847160": "Input or output units, whether or not containing storage units in the same housing",
    "84716010": "Computer keyboards",
    
    // Sample for mobile phones (8517.12.00)
    "85": "Electrical machinery and equipment and parts thereof",
    "8517": "Telephone sets, including smartphones and other telephones for cellular networks",
    "851712": "Telephones for cellular networks or for other wireless networks",
    "85171200": "Mobile phones and smartphones",
    
    // Sample for toys (9503.00.00)
    "95": "Toys, games and sports requisites; parts and accessories thereof",
    "9503": "Tricycles, scooters, pedal cars and similar wheeled toys",
    "950300": "Toys and models, with moving parts", 
    "95030000": "Toys and models, with moving parts or other recreational use",
    
    // Sample for furniture (9403.60.90.00)
    "94": "Furniture; bedding, mattresses, cushions and similar stuffed furnishings",
    "9403": "Other furniture and parts thereof",
    "940360": "Other wooden furniture",
    "94036090": "Other wooden furniture not elsewhere specified",
    "9403609000": "Other wooden furniture not elsewhere specified or included"
  };
  
  // If we don't have a specific description, create a generic one
  return parts.map(part => ({
    code: part,
    description: mockDescriptions[part] || `Category ${part}`
  }));
};

// Determine background color based on confidence percentage
export const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return 'bg-green-600';
  if (confidence >= 80) return 'bg-green-500';
  if (confidence >= 70) return 'bg-yellow-500';
  if (confidence >= 60) return 'bg-orange-500';
  return 'bg-red-500';
};

export const getConfidenceTextColor = (confidence: number) => {
  return confidence >= 60 ? 'text-white' : 'text-white';
};
