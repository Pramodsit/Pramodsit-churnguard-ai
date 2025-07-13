export interface ChurnFactor {
  factor: string;
  description: string;
  impact: number;
}

export interface Customer {
  id: string;
  name: string;
  age: number;
  region: 'North' | 'South' | 'East' | 'West';
  tenure: number; // in months
  planType: string;
  internetService: string;
  onlineSecurity: boolean;
  churnRisk: 'High' | 'Medium' | 'Low' | 'None';
  churnProbability: number; // between 0 and 1
  monthlyCharges: number;
  totalCharges: number;
  topChurnFactors: ChurnFactor[];
}
