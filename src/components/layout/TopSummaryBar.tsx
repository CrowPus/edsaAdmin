import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopSummaryBar: React.FC = () => {
  const { activeSection } = useApp();
  const [selectedRange, setSelectedRange] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('10:24 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return {
          subtitlePrefix: 'Welcome back,',
          title: 'Dashboard',
          description: 'Overview of EDSA digital services and operations.',
        };
      case 'customers':
        return {
          subtitlePrefix: 'Management & KYC',
          title: 'Customers',
          description: 'Customer directory, verification status and connected meters.',
        };
      case 'meters':
        return {
          subtitlePrefix: 'Asset Infrastructure',
          title: 'Meters',
          description: 'STS Pre-paid and Smart AMI grid meter inventory and telemetry.',
        };
      case 'transactions':
        return {
          subtitlePrefix: 'Revenue & Vending',
          title: 'Transactions',
          description: 'Live log of token purchases, reconciliations and payment records.',
        };
      case 'payments':
        return {
          subtitlePrefix: 'Settlements & API',
          title: 'Payments',
          description: 'Orange Money, Afrimoney, Bank & Agency payment routing.',
        };
      case 'vending':
        return {
          subtitlePrefix: 'STS Engine',
          title: 'Vending',
          description: 'Standard Transfer Specification (STS) 20-digit token generator.',
        };
      case 'outages':
        return {
          subtitlePrefix: 'Grid & Dispatch',
          title: 'Outage Reports',
          description: 'Substations, transmission feeders and ongoing power interruptions.',
        };
      case 'services':
        return {
          subtitlePrefix: 'Support Tickets',
          title: 'Service Requests',
          description: 'Customer complaints, fault reports and technician tickets.',
        };
      case 'notifications':
        return {
          subtitlePrefix: 'Broadcasts',
          title: 'Notifications',
          description: 'SMS, push notifications & web alerts sent to consumers.',
        };
      case 'analytics':
        return {
          subtitlePrefix: 'Intelligence & Load',
          title: 'Analytics',
          description: 'Regional electricity consumption patterns and payment trends.',
        };
      case 'reports':
        return {
          subtitlePrefix: 'Executive Briefs',
          title: 'Reports',
          description: 'Weekly and monthly regulatory summaries and audits.',
        };
      case 'exports':
        return {
          subtitlePrefix: 'Data Extraction',
          title: 'Export Data',
          description: 'Export transaction and customer records to CSV/Excel/PDF.',
        };
      case 'users':
        return {
          subtitlePrefix: 'Administration',
          title: 'Users & Roles',
          description: 'Role-based access control and system personnel permissions.',
        };
      case 'settings':
        return {
          subtitlePrefix: 'Configuration',
          title: 'System Settings',
          description: 'Base tariff rates per kWh, GST schedules and operational limits.',
        };
      case 'audit':
        return {
          subtitlePrefix: 'Compliance',
          title: 'Audit Logs',
          description: 'Immutable security log of administrative activities and overrides.',
        };
      default:
        return {
          subtitlePrefix: 'Welcome back,',
          title: 'Dashboard',
          description: 'Overview of EDSA digital services and operations.',
        };
    }
  };

  const headerInfo = getSectionTitle();

  return (
    <div className="px-6 sm:px-8 pt-6 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Description */}
      <div>
        <div className="text-xs font-medium text-fg-muted">
          {headerInfo.subtitlePrefix}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-fg dark:text-fg-dark tracking-tight font-sans mt-0.5">
          {headerInfo.title}
        </h1>
        <p className="text-xs text-fg-muted mt-1">
          {headerInfo.description}
        </p>
      </div>

      {/* Right: Date Range Selector & GMT Clock */}
      <div className="flex items-center gap-4">
        {/* Date Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl text-xs font-semibold text-fg dark:text-fg-dark shadow-sm hover:bg-canvas dark:hover:bg-canvas-dark transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-fg-muted" />
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-fg-muted" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-40 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-lg py-1.5 z-40 text-xs animate-in fade-in">
              {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedRange(opt);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-canvas dark:hover:bg-canvas-dark cursor-pointer ${
                    selectedRange === opt
                      ? 'font-bold text-primary bg-primary/10'
                      : 'text-fg dark:text-fg-dark'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Date & Time Text */}
        <div className="text-right">
          <div className="text-xs font-bold text-fg dark:text-fg-dark">
            Mon, 14 Apr 2025
          </div>
          <div className="text-[11px] text-fg-muted font-mono">
            {currentTimeStr}
          </div>
        </div>
      </div>
    </div>
  );
};
