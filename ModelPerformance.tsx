import React from 'react';
import { Target, TrendingUp, BarChart3, Brain, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { modelMetrics } from '../data/mockData';

const ModelPerformance: React.FC = () => {
  // Mock performance data over time
  const performanceOverTime = [
    { month: 'Jan', accuracy: 0.84, precision: 0.81, recall: 0.87, f1: 0.84 },
    { month: 'Feb', accuracy: 0.85, precision: 0.82, recall: 0.88, f1: 0.85 },
    { month: 'Mar', accuracy: 0.86, precision: 0.83, recall: 0.89, f1: 0.86 },
    { month: 'Apr', accuracy: 0.87, precision: 0.84, recall: 0.89, f1: 0.86 },
    { month: 'May', accuracy: 0.87, precision: 0.84, recall: 0.89, f1: 0.86 },
    { month: 'Jun', accuracy: 0.87, precision: 0.84, recall: 0.89, f1: 0.86 }
  ];

  // Feature importance data
  const featureImportance = [
    { feature: 'Contract Type', importance: 0.35, description: 'Month-to-month vs long-term contracts' },
    { feature: 'Tenure', importance: 0.28, description: 'Customer relationship duration' },
    { feature: 'Monthly Charges', importance: 0.22, description: 'Monthly service charges' },
    { feature: 'Tech Support', importance: 0.18, description: 'Technical support subscription' },
    { feature: 'Payment Method', importance: 0.15, description: 'Payment method preference' },
    { feature: 'Internet Service', importance: 0.12, description: 'Type of internet service' },
    { feature: 'Online Security', importance: 0.10, description: 'Online security add-on' },
    { feature: 'Age', importance: 0.08, description: 'Customer age demographic' }
  ];

  // Confusion matrix data
  const confusionMatrix = [
    { predicted: 'No Churn', actual: 'No Churn', count: 1847, color: '#10B981' },
    { predicted: 'No Churn', actual: 'Churn', count: 89, color: '#EF4444' },
    { predicted: 'Churn', actual: 'No Churn', count: 156, color: '#EF4444' },
    { predicted: 'Churn', actual: 'Churn', count: 421, color: '#10B981' }
  ];

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ElementType;
    description: string;
    benchmark: number;
  }> = ({ title, value, icon: Icon, description, benchmark }) => {
    const isGood = value >= benchmark;
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isGood ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <Icon className={`h-6 w-6 ${isGood ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          {isGood ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{(value * 100).toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Benchmark: {(benchmark * 100).toFixed(0)}%</p>
          </div>
          
          <div className="w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={isGood ? "#10B981" : "#F59E0B"}
                strokeWidth="3"
                strokeDasharray={`${value * 100}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Model Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Accuracy"
          value={modelMetrics.accuracy}
          icon={Target}
          description="Overall prediction accuracy"
          benchmark={0.85}
        />
        <MetricCard
          title="Precision"
          value={modelMetrics.precision}
          icon={TrendingUp}
          description="True positive rate"
          benchmark={0.80}
        />
        <MetricCard
          title="Recall"
          value={modelMetrics.recall}
          icon={BarChart3}
          description="Sensitivity to churn cases"
          benchmark={0.85}
        />
        <MetricCard
          title="ROC-AUC"
          value={modelMetrics.rocAuc}
          icon={Brain}
          description="Area under ROC curve"
          benchmark={0.90}
        />
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis domain={[0.8, 0.9]} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Accuracy"
              />
              <Line 
                type="monotone" 
                dataKey="precision" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Precision"
              />
              <Line 
                type="monotone" 
                dataKey="recall" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="Recall"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance (SHAP Values)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportance.slice(0, 6)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="feature" type="category" stroke="#6b7280" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
              />
              <Bar dataKey="importance" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Importance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance Analysis</h3>
          <div className="space-y-3">
            {featureImportance.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{feature.feature}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(feature.importance / 0.35) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {(feature.importance * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Insights & Recommendations</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Strong Performance</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Model achieves 87% accuracy with excellent ROC-AUC of 0.92, indicating strong predictive capability.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Key Insights</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Contract type is the strongest predictor (35% importance)</li>
                    <li>• Customer tenure significantly impacts churn likelihood</li>
                    <li>• Monthly charges and support services are key factors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Recommendations</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• Focus retention efforts on month-to-month customers</li>
                    <li>• Improve tech support offerings to reduce churn</li>
                    <li>• Monitor new customers closely in first 12 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Model Configuration */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Model Configuration</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Algorithm</p>
                <p className="font-medium">Random Forest</p>
              </div>
              <div>
                <p className="text-gray-600">Training Data</p>
                <p className="font-medium">2,513 samples</p>
              </div>
              <div>
                <p className="text-gray-600">Features</p>
                <p className="font-medium">18 variables</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium">Jan 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;