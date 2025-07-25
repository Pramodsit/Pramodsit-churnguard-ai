import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerAnalysis from './components/CustomerAnalysis';
import RiskAlerts from './components/RiskAlerts';
import ModelPerformance from './components/ModelPerformance';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerAnalysis />;
      case 'alerts':
        return <RiskAlerts />;
      case 'model':
        return <ModelPerformance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;