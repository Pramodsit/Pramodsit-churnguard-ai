import React from 'react';
import { Users, TrendingDown, AlertTriangle, DollarSign, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { dashboardStats, generateChurnTrendData, generateRegionData, generatePlanTypeData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const churnTrendData = generateChurnTrendData();
  const regionData = generateRegionData();
  const planTypeData = generatePlanTypeData();

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change: string;
    icon: React.ElementType;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={`text-sm mt-2 ${color}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${color.includes('red') ? 'bg-red-100' : color.includes('green') ? 'bg-green-100' : 'bg-blue-100'}`}>
          <Icon className={`h-6 w-6 ${color.includes('red') ? 'text-red-600' : color.includes('green') ? 'text-green-600' : 'text-blue-600'}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Total Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          change="+2.5% from last month"
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Churn Rate"
          value={`${dashboardStats.churnRate}%`}
          change="-1.2% from last month"
          icon={TrendingDown}
          color="text-green-600"
        />
        <StatCard
          title="High Risk Customers"
          value={dashboardStats.highRiskCustomers}
          change="+8 from last week"
          icon={AlertTriangle}
          color="text-red-600"
        />
        <StatCard
          title="Revenue at Risk"
          value={`$${(dashboardStats.revenueAtRisk / 1000).toFixed(0)}K`}
          change="-5.3% from last month"
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Model Accuracy"
          value="87%"
          change="ROC-AUC: 0.92"
          icon={Target}
          color="text-blue-600"
        />
        <StatCard
          title="Avg Churn Probability"
          value={`${(dashboardStats.avgChurnProbability * 100).toFixed(1)}%`}
          change="Across all customers"
          icon={Activity}
          color="text-blue-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Churn Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={churnTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Actual Churn Rate"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10B981" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Predicted Churn Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="region" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="churnRate" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Churn Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Churn by Plan Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ planType, churnRate }) => `${planType}: ${churnRate}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="churnRate"
              >
                {planTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Churn Factors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Churn Factors (SHAP Analysis)</h3>
          <div className="space-y-4">
            {[
              { factor: 'Contract Type', impact: 0.35, description: 'Month-to-month contracts' },
              { factor: 'Tenure', impact: 0.28, description: 'Short customer tenure' },
              { factor: 'Monthly Charges', impact: 0.22, description: 'High monthly charges' },
              { factor: 'Tech Support', impact: 0.18, description: 'Lack of tech support' },
              { factor: 'Payment Method', impact: 0.15, description: 'Electronic check payments' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.factor}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${item.impact * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{(item.impact * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;