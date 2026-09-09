import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TopSummaryBar } from './components/layout/TopSummaryBar';

// Views
import { DashboardView } from './components/views/DashboardView';
import { CustomersView } from './components/views/CustomersView';
import { MetersView } from './components/views/MetersView';
import { TransactionsView } from './components/views/TransactionsView';
import { PaymentsView } from './components/views/PaymentsView';
import { VendingView } from './components/views/VendingView';
import { OutagesView } from './components/views/OutagesView';
import { ServiceRequestsView } from './components/views/ServiceRequestsView';
import { NotificationsView } from './components/views/NotificationsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { ExportDataView } from './components/views/ExportDataView';
import { UsersRolesView } from './components/views/UsersRolesView';
import { SystemSettingsView } from './components/views/SystemSettingsView';
import { AuditLogsView } from './components/views/AuditLogsView';

// Modals & Drawers
import { PaymentReceiptModal } from './components/modals/PaymentReceiptModal';
import { CustomerDetailDrawer } from './components/modals/CustomerDetailDrawer';
import { IncidentDetailModal } from './components/modals/IncidentDetailModal';
import { VendingSimulatorModal } from './components/modals/VendingSimulatorModal';
import { SystemStatusModal } from './components/modals/SystemStatusModal';
import { NewNotificationModal } from './components/modals/NewNotificationModal';
import { NewOutageModal } from './components/modals/NewOutageModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { ToastContainer } from './components/modals/ToastContainer';

const MainContent: React.FC = () => {
  const { activeSection } = useApp();

  const renderActiveView = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'customers':
        return <CustomersView />;
      case 'meters':
        return <MetersView />;
      case 'transactions':
        return <TransactionsView />;
      case 'payments':
        return <PaymentsView />;
      case 'vending':
        return <VendingView />;
      case 'outages':
        return <OutagesView />;
      case 'services':
        return <ServiceRequestsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <AnalyticsView />;
      case 'exports':
        return <ExportDataView />;
      case 'users':
        return <UsersRolesView />;
      case 'settings':
        return <SystemSettingsView />;
      case 'audit':
        return <AuditLogsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-fg font-sans flex antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header />

        {/* Executive Sub-Header / Summary Bar */}
        <TopSummaryBar />

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-7 w-full max-w-[1600px] mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive Global Modals & Overlays */}
      <PaymentReceiptModal />
      <CustomerDetailDrawer />
      <IncidentDetailModal />
      <VendingSimulatorModal />
      <SystemStatusModal />
      <NewNotificationModal />
      <NewOutageModal />
      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
