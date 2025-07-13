import React, { useState } from 'react';
import { Search, Filter, User, Phone, Calendar, CreditCard, Wifi, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import { Customer } from '../types';

const CustomerAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || customer.region === selectedRegion;
    const matchesRisk = selectedRisk === 'All' || customer.churnRisk === selectedRisk;
    
    return matchesSearch && matchesRegion && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return <XCircle className="h-4 w-4" />;
      case 'Medium': return <AlertTriangle className="h-4 w-4" />;
      case 'Low': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search customers by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
            
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Customer List</h3>
            <p className="text-sm text-gray-600 mt-1">{filteredCustomers.length} customers found</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  selectedCustomer?.id === customer.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(customer.churnRisk)}`}>
                      {getRiskIcon(customer.churnRisk)}
                      <span>{customer.churnRisk}</span>
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {(customer.churnProbability * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
            {selectedCustomer && (
              <p className="text-sm text-gray-600 mt-1">Detailed analysis for {selectedCustomer.name}</p>
            )}
          </div>
          
          {selectedCustomer ? (
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Age: {selectedCustomer.age}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Region: {selectedCustomer.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Tenure: {selectedCustomer.tenure} months</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Plan: {selectedCustomer.planType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Internet: {selectedCustomer.internetService}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Security: {selectedCustomer.onlineSecurity ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Churn Risk */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Churn Risk Assessment</h4>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedCustomer.churnRisk)}`}>
                    {getRiskIcon(selectedCustomer.churnRisk)}
                    <span>{selectedCustomer.churnRisk} Risk</span>
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Churn Probability</span>
                    <span className="font-medium">{(selectedCustomer.churnProbability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedCustomer.churnProbability > 0.7 ? 'bg-red-500' :
                        selectedCustomer.churnProbability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${selectedCustomer.churnProbability * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Top Churn Factors */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Top Churn Factors (SHAP)</h4>
                <div className="space-y-2">
                  {selectedCustomer.topChurnFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{factor.factor}</p>
                        <p className="text-xs text-gray-600">{factor.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${factor.impact > 0 ? 'bg-red-400' : 'bg-green-400'}`}
                            style={{ width: `${Math.abs(factor.impact) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${factor.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {factor.impact > 0 ? '+' : ''}{(factor.impact * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Monthly Charges</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedCustomer.monthlyCharges}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Charges</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedCustomer.totalCharges.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Select a customer to view detailed analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysis;