import { Customer, ModelMetrics, DashboardStats } from '../types';

// Mock customer data simulating real telecom dataset
export const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    region: 'North',
    planType: 'Premium',
    monthlyCharges: 89.99,
    totalCharges: 2159.76,
    tenure: 24,
    contractType: 'Two year',
    paymentMethod: 'Credit Card',
    internetService: 'Fiber',
    onlineSecurity: true,
    techSupport: true,
    streamingTV: true,
    streamingMovies: true,
    churnProbability: 0.23,
    churnRisk: 'Low',
    topChurnFactors: [
      { factor: 'Monthly Charges', impact: 0.15, description: 'High monthly charges increase churn risk' },
      { factor: 'Contract Type', impact: -0.12, description: 'Long-term contract reduces churn risk' },
      { factor: 'Tech Support', impact: -0.08, description: 'Having tech support reduces churn risk' },
      { factor: 'Tenure', impact: -0.06, description: 'Longer tenure reduces churn risk' },
      { factor: 'Internet Service', impact: 0.04, description: 'Fiber service slightly increases churn risk' }
    ],
    lastActivity: '2024-01-15',
    supportTickets: 2,
    avgCallDuration: 8.5,
    dataUsage: 45.2
  },
  {
    id: 'CUST002',
    name: 'Michael Chen',
    age: 28,
    gender: 'Male',
    region: 'South',
    planType: 'Basic',
    monthlyCharges: 29.99,
    totalCharges: 359.88,
    tenure: 12,
    contractType: 'Month-to-month',
    paymentMethod: 'Bank Transfer',
    internetService: 'DSL',
    onlineSecurity: false,
    techSupport: false,
    streamingTV: false,
    streamingMovies: false,
    churnProbability: 0.78,
    churnRisk: 'High',
    topChurnFactors: [
      { factor: 'Contract Type', impact: 0.35, description: 'Month-to-month contract increases churn risk' },
      { factor: 'No Tech Support', impact: 0.22, description: 'Lack of tech support increases churn risk' },
      { factor: 'Low Tenure', impact: 0.18, description: 'Short tenure increases churn risk' },
      { factor: 'Basic Plan', impact: 0.15, description: 'Basic plan customers more likely to churn' },
      { factor: 'Payment Method', impact: 0.08, description: 'Bank transfer payment increases churn risk' }
    ],
    lastActivity: '2024-01-10',
    supportTickets: 5,
    avgCallDuration: 15.2,
    dataUsage: 12.8
  },
  {
    id: 'CUST003',
    name: 'Emily Rodriguez',
    age: 45,
    gender: 'Female',
    region: 'West',
    planType: 'Enterprise',
    monthlyCharges: 119.99,
    totalCharges: 4319.64,
    tenure: 36,
    contractType: 'Two year',
    paymentMethod: 'Credit Card',
    internetService: 'Fiber',
    onlineSecurity: true,
    techSupport: true,
    streamingTV: true,
    streamingMovies: true,
    churnProbability: 0.15,
    churnRisk: 'Low',
    topChurnFactors: [
      { factor: 'Monthly Charges', impact: 0.18, description: 'High monthly charges increase churn risk' },
      { factor: 'Contract Type', impact: -0.15, description: 'Long-term contract reduces churn risk' },
      { factor: 'Tenure', impact: -0.12, description: 'Long tenure significantly reduces churn risk' },
      { factor: 'Tech Support', impact: -0.08, description: 'Having tech support reduces churn risk' },
      { factor: 'Age', impact: -0.05, description: 'Older customers less likely to churn' }
    ],
    lastActivity: '2024-01-14',
    supportTickets: 1,
    avgCallDuration: 6.3,
    dataUsage: 78.5
  },
  {
    id: 'CUST004',
    name: 'David Thompson',
    age: 22,
    gender: 'Male',
    region: 'East',
    planType: 'Basic',
    monthlyCharges: 35.99,
    totalCharges: 215.94,
    tenure: 6,
    contractType: 'Month-to-month',
    paymentMethod: 'Electronic Check',
    internetService: 'DSL',
    onlineSecurity: false,
    techSupport: false,
    streamingTV: true,
    streamingMovies: false,
    churnProbability: 0.82,
    churnRisk: 'High',
    topChurnFactors: [
      { factor: 'Contract Type', impact: 0.38, description: 'Month-to-month contract increases churn risk' },
      { factor: 'Low Tenure', impact: 0.25, description: 'Very short tenure increases churn risk' },
      { factor: 'Young Age', impact: 0.20, description: 'Younger customers more likely to churn' },
      { factor: 'Payment Method', impact: 0.12, description: 'Electronic check payment increases risk' },
      { factor: 'No Security Services', impact: 0.10, description: 'Lack of add-on services increases risk' }
    ],
    lastActivity: '2024-01-08',
    supportTickets: 3,
    avgCallDuration: 12.7,
    dataUsage: 25.1
  },
  {
    id: 'CUST005',
    name: 'Lisa Wang',
    age: 38,
    gender: 'Female',
    region: 'North',
    planType: 'Premium',
    monthlyCharges: 75.99,
    totalCharges: 1823.76,
    tenure: 24,
    contractType: 'One year',
    paymentMethod: 'Credit Card',
    internetService: 'Fiber',
    onlineSecurity: true,
    techSupport: false,
    streamingTV: true,
    streamingMovies: true,
    churnProbability: 0.45,
    churnRisk: 'Medium',
    topChurnFactors: [
      { factor: 'No Tech Support', impact: 0.18, description: 'Lack of tech support increases churn risk' },
      { factor: 'Monthly Charges', impact: 0.12, description: 'Higher charges increase churn risk' },
      { factor: 'Contract Type', impact: 0.08, description: 'One-year contract moderate risk' },
      { factor: 'Internet Service', impact: 0.05, description: 'Fiber service complexity increases risk' },
      { factor: 'Tenure', impact: -0.03, description: 'Good tenure slightly reduces risk' }
    ],
    lastActivity: '2024-01-12',
    supportTickets: 4,
    avgCallDuration: 11.8,
    dataUsage: 52.3
  },
  {
    id: 'CUST006',
    name: 'Robert Martinez',
    age: 55,
    gender: 'Male',
    region: 'South',
    planType: 'Enterprise',
    monthlyCharges: 109.99,
    totalCharges: 5939.45,
    tenure: 54,
    contractType: 'Two year',
    paymentMethod: 'Bank Transfer',
    internetService: 'Fiber',
    onlineSecurity: true,
    techSupport: true,
    streamingTV: true,
    streamingMovies: true,
    churnProbability: 0.12,
    churnRisk: 'Low',
    topChurnFactors: [
      { factor: 'Monthly Charges', impact: 0.14, description: 'High monthly charges increase churn risk' },
      { factor: 'Contract Type', impact: -0.18, description: 'Long-term contract reduces churn risk' },
      { factor: 'Tenure', impact: -0.22, description: 'Very long tenure significantly reduces risk' },
      { factor: 'Age', impact: -0.08, description: 'Older customers less likely to churn' },
      { factor: 'Full Services', impact: -0.06, description: 'Complete service package reduces risk' }
    ],
    lastActivity: '2024-01-16',
    supportTickets: 0,
    avgCallDuration: 4.2,
    dataUsage: 89.7
  }
];

export const modelMetrics: ModelMetrics = {
  accuracy: 0.87,
  precision: 0.84,
  recall: 0.89,
  f1Score: 0.86,
  rocAuc: 0.92
};

export const dashboardStats: DashboardStats = {
  totalCustomers: 2847,
  churnedCustomers: 421,
  highRiskCustomers: 156,
  churnRate: 14.8,
  avgChurnProbability: 0.34,
  revenueAtRisk: 89750
};

// Generate additional mock data for charts
export const generateChurnTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    churnRate: Math.random() * 20 + 10,
    predicted: Math.random() * 20 + 10,
    actual: Math.random() * 20 + 10
  }));
};

export const generateRegionData = () => [
  { region: 'North', customers: 712, churnRate: 12.3, revenue: 234500 },
  { region: 'South', customers: 856, churnRate: 16.8, revenue: 298700 },
  { region: 'East', customers: 634, churnRate: 14.2, revenue: 187900 },
  { region: 'West', customers: 645, churnRate: 15.7, revenue: 201200 }
];

export const generatePlanTypeData = () => [
  { planType: 'Basic', customers: 1234, churnRate: 22.1, avgRevenue: 32.50 },
  { planType: 'Premium', customers: 987, churnRate: 12.8, avgRevenue: 78.90 },
  { planType: 'Enterprise', customers: 626, churnRate: 8.4, avgRevenue: 115.20 }
];