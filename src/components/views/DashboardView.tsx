import React from 'react';
import { OverviewKpiCards } from '../dashboard/OverviewKpiCards';
import { ElectricitySalesChart } from '../dashboard/ElectricitySalesChart';
import { PaymentMethodsChart } from '../dashboard/PaymentMethodsChart';
import { SystemStatusCard } from '../dashboard/SystemStatusCard';
import { TransactionsTable } from '../dashboard/TransactionsTable';
import { RecentOutagesCard } from '../dashboard/RecentOutagesCard';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 Metric KPI Cards */}
      <OverviewKpiCards />

      {/* 3 Middle Cards: Electricity Sales (Bar chart), Payment Methods (Donut), System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 h-full">
          <ElectricitySalesChart />
        </div>
        <div className="lg:col-span-4 h-full">
          <PaymentMethodsChart />
        </div>
        <div className="lg:col-span-3 h-full">
          <SystemStatusCard />
        </div>
      </div>

      {/* 2 Bottom Cards: Recent Transactions Table & Recent Outage Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <TransactionsTable />
        </div>
        <div className="lg:col-span-4">
          <RecentOutagesCard />
        </div>
      </div>
    </div>
  );
};
