import React, { useState } from 'react';
import { AlertTriangle, Clock, DollarSign, Phone, Mail, MessageSquare, CheckCircle, X } from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { format } from 'date-fns';

const RiskAlerts: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [actionTaken, setActionTaken] = useState<Set<string>>(new Set());

  const highRiskCustomers = mockCustomers.filter(customer => customer.churnRisk === 'High');
  const mediumRiskCustomers = mockCustomers.filter(customer => customer.churnRisk === 'Medium');

  const alerts = [
    ...highRiskCustomers.map(customer => ({
      id: customer.id,
      customer,
      priority: 'High' as const,
      type: 'Churn Risk',
      message: `Customer ${customer.name} has ${(customer.churnProbability * 100).toFixed(0)}% churn probability`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      revenueAtRisk: customer.monthlyCharges * 12,
      recommendedActions: [
        'Contact customer within 24 hours',
        'Offer retention discount',
        'Schedule technical support call',
        'Review service satisfaction'
      ]
    })),
    ...mediumRiskCustomers.slice(0, 2).map(customer => ({
      id: customer.id,
      customer,
      priority: 'Medium' as const,
      type: 'Churn Risk',
      message: `Customer ${customer.name} showing early churn indicators`,
      timestamp: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
      revenueAtRisk: customer.monthlyCharges * 6,
      recommendedActions: [
        'Send satisfaction survey',
        'Offer service upgrade',
        'Schedule check-in call',
        'Monitor usage patterns'
      ]
    }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleActionTaken = (alertId: string) => {
    setActionTaken(prev => new Set([...prev, alertId]));
  };

  const handleDismissAlert = (alertId: string) => {
    setActionTaken(prev => new Set([...prev, alertId]));
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority Alerts</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{highRiskCustomers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Immediate attention required</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium Priority Alerts</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{mediumRiskCustomers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Monitor closely</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue at Risk</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${Math.round(alerts.reduce((sum, alert) => sum + alert.revenueAtRisk, 0) / 1000)}K
              </p>
              <p className="text-sm text-gray-500 mt-1">Annual revenue exposure</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Risk Alerts</h3>
          <p className="text-sm text-gray-600 mt-1">Real-time churn risk notifications</p>
        </div>

        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 transition-all duration-200 ${
                actionTaken.has(alert.id) ? 'bg-gray-50 opacity-75' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                      {alert.priority} Priority
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(alert.timestamp, 'MMM dd, yyyy HH:mm')}
                    </span>
                    {actionTaken.has(alert.id) && (
                      <span className="inline-flex items-center space-x-1 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Action Taken</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-1">{alert.message}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-600">Customer Details</p>
                      <p className="font-medium">{alert.customer.name}</p>
                      <p className="text-sm text-gray-500">{alert.customer.planType} Plan • {alert.customer.region}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Churn Probability</p>
                      <p className="font-medium text-red-600">{(alert.customer.churnProbability * 100).toFixed(0)}%</p>
                      <p className="text-sm text-gray-500">Tenure: {alert.customer.tenure} months</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Revenue at Risk</p>
                      <p className="font-medium">${alert.revenueAtRisk.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Annual value</p>
                    </div>
                  </div>

                  {/* Top Churn Factors */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Top Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {alert.customer.topChurnFactors.slice(0, 3).map((factor, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200"
                        >
                          {factor.factor} ({(factor.impact * 100).toFixed(0)}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {alert.recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                {!actionTaken.has(alert.id) && (
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleActionTaken(alert.id)}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Contact</span>
                    </button>
                    
                    <button
                      onClick={() => handleActionTaken(alert.id)}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </button>
                    
                    <button
                      onClick={() => handleDismissAlert(alert.id)}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAlerts;