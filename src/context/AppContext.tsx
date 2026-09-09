import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavSection,
  UserRole,
  AdminUser,
  Transaction,
  Customer,
  Meter,
  OutageReport,
  ServiceRequest,
  VendingRecord,
  NotificationAnnouncement,
  SystemServiceStatus,
  AuditLog,
  TariffRate,
  OutageStatus,
  NotificationTarget,
  NotificationChannel,
} from '../types';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_CUSTOMERS,
  INITIAL_METERS,
  INITIAL_OUTAGES,
  INITIAL_SERVICE_REQUESTS,
  INITIAL_VENDING_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SYSTEM_SERVICES,
  INITIAL_STAFF_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TARIFFS,
  SALES_7DAYS_DATA,
  PAYMENT_METHODS_DATA,
} from '../mock/data';

interface AppContextType {
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  currentUser: AdminUser;
  setCurrentUser: (user: AdminUser) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Data Collections
  transactions: Transaction[];
  customers: Customer[];
  meters: Meter[];
  outages: OutageReport[];
  serviceRequests: ServiceRequest[];
  vendingRecords: VendingRecord[];
  notifications: NotificationAnnouncement[];
  systemServices: SystemServiceStatus[];
  auditLogs: AuditLog[];
  tariffs: TariffRate[];
  staffUsers: AdminUser[];

  // Formatter helpers
  formatCurrency: (amount?: number) => string;
  formatNumber: (num?: number) => string;
  formatDate: (dateStr?: string) => string;

  // KPI Computations
  kpis: {
    totalRevenueLe: number;
    totalSalesRevenueLe: number;
    totalKWhDelivered: number;
    totalActiveMeters: number;
    onlineMetersCount: number;
    totalVendingCount: number;
    todayTransactionsCount: number;
    systemUptimePct: number;
    totalCustomers: number;
    customersGrowth: number;
    activeOutagesCount: number;
    openTicketsCount: number;
  };

  // Chart data
  salesData: typeof SALES_7DAYS_DATA;
  paymentMethods: typeof PAYMENT_METHODS_DATA;

  // State actions
  addTransaction: (tx: Partial<Transaction>) => void;
  retryTransaction: (id: string) => void;
  reconcileTransaction: (id: string) => void;
  forceReconcileTransaction: (id: string) => void;
  updateOutageStatus: (id: string, status: OutageStatus) => void;
  logNewOutage: (outageData: Partial<OutageReport>) => void;
  assignOutageCrew: (id: string, crew: string) => void;
  addOutageNote: (id: string, note: string) => void;
  updateServiceRequestStatus: (id: string, status: ServiceRequest['status']) => void;
  addServiceRequestNote: (id: string, noteText: string) => void;
  simulateVending: (params: { meterNumber: string; amountLe: number; channel?: string; customerName?: string }) => VendingRecord;
  simulateSTSVending: (params: { meterNumber: string; amountLe: number; channel?: string; customerName?: string }) => VendingRecord;
  addNewOutage: (outageData: Partial<OutageReport>) => void;
  vendingPreset: { meterNumber?: string; customerName?: string; amountLe?: number } | null;
  setVendingPreset: (preset: { meterNumber?: string; customerName?: string; amountLe?: number } | null) => void;
  openVendingSimulator: (preset?: { meterNumber?: string; customerName?: string; amountLe?: number }) => void;
  toggleCustomerFlag: (customerId: string) => void;
  publishNotification: (data: { title: string; content?: string; message?: string; targetDistrict?: any; channels?: any[]; type?: string; category?: string }) => void;
  updateTariffRate: (id: string, newRate: number) => void;
  addAuditLog: (action: string, resource: string, details: string, result?: 'Success' | 'Warning' | 'Failed') => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Modals / Drawers
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (t: Transaction | null) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (c: Customer | null) => void;
  selectedOutage: OutageReport | null;
  setSelectedOutage: (o: OutageReport | null) => void;

  // Modal Visibility
  isVendingSimulatorOpen: boolean;
  setIsVendingSimulatorOpen: (open: boolean) => void;
  isSystemStatusModalOpen: boolean;
  setIsSystemStatusModalOpen: (open: boolean) => void;
  isNewNotificationModalOpen: boolean;
  setIsNewNotificationModalOpen: (open: boolean) => void;
  isNewOutageModalOpen: boolean;
  setIsNewOutageModalOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Toasts
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }[];
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [currentUser, setCurrentUser] = useState<AdminUser>(INITIAL_STAFF_USERS[0]);
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [dateFilter, setDateFilter] = useState('Today (14 Apr 2025)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core Data Lists
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [meters, setMeters] = useState<Meter[]>(INITIAL_METERS);
  const [outages, setOutages] = useState<OutageReport[]>(INITIAL_OUTAGES);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [vendingRecords, setVendingRecords] = useState<VendingRecord[]>(INITIAL_VENDING_RECORDS);
  const [notifications, setNotifications] = useState<NotificationAnnouncement[]>(INITIAL_NOTIFICATIONS);
  const [systemServices, setSystemServices] = useState<SystemServiceStatus[]>(INITIAL_SYSTEM_SERVICES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [tariffs, setTariffs] = useState<TariffRate[]>(INITIAL_TARIFFS);
  const [staffUsers] = useState<AdminUser[]>(INITIAL_STAFF_USERS);

  // Modals & Drawers
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedOutage, setSelectedOutage] = useState<OutageReport | null>(null);
  const [isVendingSimulatorOpen, setIsVendingSimulatorOpen] = useState(false);
  const [vendingPreset, setVendingPreset] = useState<{ meterNumber?: string; customerName?: string; amountLe?: number } | null>(null);
  const [isSystemStatusModalOpen, setIsSystemStatusModalOpen] = useState(false);
  const [isNewNotificationModalOpen, setIsNewNotificationModalOpen] = useState(false);
  const [isNewOutageModalOpen, setIsNewOutageModalOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }[]>([]);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Helper Formatters
  const formatCurrency = (amount?: number): string => {
    if (amount === undefined || amount === null || isNaN(amount)) return 'Le 0';
    return `Le ${amount.toLocaleString('en-US')}`;
  };

  const formatNumber = (num?: number): string => {
    if (num === undefined || num === null || isNaN(num)) return '0';
    return num.toLocaleString('en-US');
  };

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (action: string, resource: string, details: string, result: 'Success' | 'Warning' | 'Failed' = 'Success') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      adminName: currentUser.name,
      adminRole: currentRole,
      action,
      resource,
      details,
      result,
      ipAddress: '192.168.10.45',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const userForRole = staffUsers.find((u) => u.role === role) || {
      id: 'custom-role-user',
      name: `EDSA Operator (${role})`,
      email: `${role.toLowerCase().replace(/[^a-z0-9]/g, '')}@edsa.sl`,
      role,
      department: 'Sierra Leone EDSA Directorate',
      lastActive: 'Just now',
      status: 'Active',
    };
    setCurrentUser(userForRole);
    addToast(`Switched perspective to ${role}`, 'info');
    addAuditLog('Role Perspective Switched', 'RBAC Session', `Active view perspective changed to ${role}`);
  };

  // KPI Calculations
  const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.amountLe || 0), 0);
  const totalKWh = transactions.reduce((sum, tx) => sum + (tx.unitsKWh || 0), 0);
  const totalCustomers = customers.length;
  const activeOutages = outages.filter((o) => o.status !== 'Resolved').length;
  const openTickets = serviceRequests.filter((r) => r.status !== 'Resolved' && r.status !== 'Closed').length;

  const kpis = {
    totalRevenueLe: totalRevenue,
    totalSalesRevenueLe: 5427800,
    totalKWhDelivered: 452180,
    totalActiveMeters: meters.length,
    onlineMetersCount: 124500,
    totalVendingCount: 16950,
    todayTransactionsCount: transactions.length,
    systemUptimePct: 99.98,
    totalCustomers,
    customersGrowth: 8.4,
    activeOutagesCount: activeOutages,
    openTicketsCount: openTickets,
  };

  // Actions
  const addTransaction = (tx: Partial<Transaction>) => {
    const newTx: Transaction = {
      id: `TX-2025-${Date.now().toString().slice(-6)}`,
      customerName: tx.customerName || 'EDSA Customer',
      meterNumber: tx.meterNumber || '12345678901',
      amountLe: tx.amountLe || 500,
      unitsKWh: tx.unitsKWh || 38.4,
      paymentMethod: tx.paymentMethod || 'Orange Money',
      status: tx.status || 'Success',
      date: 'Today, Just now',
      timestamp: new Date().toISOString(),
      referenceId: tx.referenceId || `OM-SL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      tokenGenerated: tx.tokenGenerated || '1234-5678-9012-3456-7890',
      receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
      tariffClass: 'Domestic Normal',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const retryTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === id) {
          const newToken = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
          addToast(`Transaction ${tx.id} re-processed successfully. Token generated.`, 'success');
          addAuditLog('Transaction Re-vend', `TX:${tx.id}`, `Manual re-vending for meter ${tx.meterNumber}`);
          return {
            ...tx,
            status: 'Success',
            tokenGenerated: newToken,
          };
        }
        return tx;
      })
    );
  };

  const reconcileTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === id) {
          addToast(`Transaction ${tx.id} marked reconciled with payment switch.`, 'success');
          addAuditLog('Reconciliation Action', `TX:${tx.id}`, `Payment settlement reconciliation completed`);
          return { ...tx, status: 'Success' };
        }
        return tx;
      })
    );
  };

  const forceReconcileTransaction = (id: string) => {
    reconcileTransaction(id);
  };

  const updateOutageStatus = (id: string, status: OutageStatus) => {
    setOutages((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          addToast(`Outage at ${o.substation} updated to ${status}`, 'info');
          addAuditLog('Outage Status Update', `Incident:${o.id}`, `Status moved to ${status} for ${o.substation}`);
          return { ...o, status };
        }
        return o;
      })
    );
  };

  const logNewOutage = (outageData: Partial<OutageReport>) => {
    const newOutage: OutageReport = {
      id: `OUT-${Date.now().toString().slice(-4)}`,
      title: outageData.title || `Grid Incident - ${outageData.substation || 'Substation'}`,
      location: outageData.location || outageData.substation || 'Western Area',
      substation: outageData.substation || 'Kingtom Substation',
      feederLine: outageData.feederLine || 'Feeder 01',
      district: outageData.district || 'Western Area Urban',
      severity: outageData.severity || 'High',
      status: 'New',
      timeAgo: 'Just now',
      reportedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      affectedCustomers: outageData.affectedCustomers || 1200,
      crewAssigned: outageData.crewAssigned || 'Unassigned',
      cause: outageData.cause || '33kV Busbar Trip / Under Investigation',
    };
    setOutages((prev) => [newOutage, ...prev]);
    addToast('New grid incident reported and queued for field dispatch.', 'warning');
    addAuditLog('New Grid Outage Logged', `Incident:${newOutage.id}`, `${newOutage.substation} - ${newOutage.severity} severity`);
  };

  const assignOutageCrew = (id: string, crew: string) => {
    setOutages((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          addToast(`Crew "${crew}" assigned to ${o.substation}`, 'success');
          addAuditLog('Crew Field Dispatch', `Incident:${o.id}`, `Assigned ${crew} to restore ${o.feederLine}`);
          return { ...o, crewAssigned: crew, status: o.status === 'New' ? 'Assigned' : o.status };
        }
        return o;
      })
    );
  };

  const addOutageNote = (id: string, noteText: string) => {
    setOutages((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const newNote = {
            id: `note-${Date.now()}`,
            author: currentUser.name,
            text: noteText,
            timestamp: 'Just now',
          };
          addToast('Technician field note appended.', 'info');
          return { ...o, notes: [...(o.notes || []), newNote] };
        }
        return o;
      })
    );
  };

  const updateServiceRequestStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          addToast(`Ticket ${r.ticketNumber || r.id} updated to ${status}`, 'info');
          addAuditLog('Service Ticket Status', `Ticket:${r.id}`, `Moved ticket to ${status}`);
          return { ...r, status };
        }
        return r;
      })
    );
  };

  const addServiceRequestNote = (id: string, noteText: string) => {
    setServiceRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          addToast('Internal staff note added to ticket.', 'info');
          return {
            ...r,
            internalNotes: [...(r.internalNotes || []), `${currentUser.name} (Just now): ${noteText}`],
          };
        }
        return r;
      })
    );
  };

  const simulateVending = ({
    meterNumber,
    amountLe,
    channel = 'Orange Money',
    customerName: inputCustomerName,
  }: {
    meterNumber: string;
    amountLe: number;
    channel?: string;
    customerName?: string;
  }): VendingRecord => {
    const ratePerKwh = 14.5;
    const gstRate = 0.15;
    const netAmount = amountLe / (1 + gstRate);
    const gstAmount = amountLe - netAmount;
    const unitsKWh = parseFloat((netAmount / ratePerKwh).toFixed(1));

    const tokenPart = () => Math.floor(1000 + Math.random() * 9000).toString();
    const token = `${tokenPart()}-${tokenPart()}-${tokenPart()}-${tokenPart()}-${tokenPart()}`;
    const requestId = `REQ-STS-20250414-${Math.floor(100 + Math.random() * 900)}`;

    const foundCustomer = customers.find((c) => c.meters?.some((m) => m.meterNumber === meterNumber) || c.meterNumber === meterNumber);
    const customerName = inputCustomerName || (foundCustomer ? foundCustomer.name : 'EDSA Customer');

    const newRecord: VendingRecord = {
      id: `vnd-${Date.now()}`,
      requestId,
      meterNumber,
      customerName,
      amountLe,
      unitsKWh,
      tokenGenerated: token,
      paymentMethod: channel,
      timestamp: 'Just now',
      status: 'Success',
      retryCount: 0,
      tariffRatePerKWh: ratePerKwh,
      gstAmountLe: gstAmount,
      netEnergyAmountLe: netAmount,
    };

    setVendingRecords((prev) => [newRecord, ...prev]);

    // Also inject into general transactions table
    const newTx: Transaction = {
      id: `TX-2025-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      meterNumber,
      amountLe,
      unitsKWh,
      paymentMethod: channel,
      status: 'Success',
      date: 'Today, Just now',
      timestamp: new Date().toISOString(),
      tokenGenerated: token,
      referenceId: `${channel.slice(0, 2).toUpperCase()}-SL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
      tariffClass: 'Domestic Normal',
      gstAmountLe: gstAmount,
      netEnergyAmountLe: netAmount,
    };
    setTransactions((prev) => [newTx, ...prev]);

    addAuditLog('STS Pre-paid Token Generated', `Meter:${meterNumber}`, `Generated 20-digit STS token for Le ${amountLe} (${unitsKWh} kWh)`);

    return newRecord;
  };

  const openVendingSimulator = (preset?: { meterNumber?: string; customerName?: string; amountLe?: number }) => {
    if (preset) {
      setVendingPreset(preset);
    }
    setIsVendingSimulatorOpen(true);
  };

  const toggleCustomerFlag = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
          addToast(`Customer ${c.name} status updated to ${nextStatus}`, 'info');
          addAuditLog('Customer KYC/Flag Status', `Customer:${c.id}`, `Status changed to ${nextStatus}`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const publishNotification = (notifData: {
    title: string;
    content?: string;
    message?: string;
    targetDistrict?: any;
    channels?: any[];
  }) => {
    const newNotif: NotificationAnnouncement = {
      id: `notif-${Date.now()}`,
      title: notifData.title,
      content: notifData.content || notifData.message || '',
      message: notifData.message || notifData.content || '',
      type: 'Maintenance',
      targetDistrict: notifData.targetDistrict || 'All Districts',
      channels: notifData.channels || ['Mobile App Push', 'SMS'],
      status: 'Sent',
      sentAt: 'Just now',
      author: `${currentUser.name} (${currentRole})`,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    addToast('Notification broadcast successfully dispatched', 'success');
    addAuditLog('Broadcast Notification', notifData.targetDistrict || 'All Districts', `Dispatched: "${notifData.title}"`);
  };

  const updateTariffRate = (id: string, newRate: number) => {
    setTariffs((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          addToast(`Tariff tier ${t.category} updated to Le ${newRate}/kWh`, 'success');
          addAuditLog('Tariff Schedule Change', `Tariff:${t.category}`, `Adjusted base rate to Le ${newRate}/kWh`);
          return { ...t, ratePerKWhLe: newRate, lastUpdated: 'Today' };
        }
        return t;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeSection,
        setActiveSection,
        currentUser,
        setCurrentUser,
        currentRole,
        switchRole,
        dateFilter,
        setDateFilter,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        transactions,
        customers,
        meters,
        outages,
        serviceRequests,
        vendingRecords,
        notifications,
        systemServices,
        auditLogs,
        tariffs,
        staffUsers,
        formatCurrency,
        formatNumber,
        formatDate,
        kpis,
        salesData: SALES_7DAYS_DATA,
        paymentMethods: PAYMENT_METHODS_DATA,
        addTransaction,
        retryTransaction,
        reconcileTransaction,
        forceReconcileTransaction,
        updateOutageStatus,
        logNewOutage,
        addNewOutage: logNewOutage,
        assignOutageCrew,
        addOutageNote,
        updateServiceRequestStatus,
        addServiceRequestNote,
        simulateVending,
        simulateSTSVending: simulateVending,
        vendingPreset,
        setVendingPreset,
        openVendingSimulator,
        toggleCustomerFlag,
        publishNotification,
        updateTariffRate,
        addAuditLog,
        theme,
        toggleTheme,
        setTheme,
        selectedTransaction,
        setSelectedTransaction,
        selectedCustomer,
        setSelectedCustomer,
        selectedOutage,
        setSelectedOutage,
        isVendingSimulatorOpen,
        setIsVendingSimulatorOpen,
        isSystemStatusModalOpen,
        setIsSystemStatusModalOpen,
        isNewNotificationModalOpen,
        setIsNewNotificationModalOpen,
        isNewOutageModalOpen,
        setIsNewOutageModalOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
