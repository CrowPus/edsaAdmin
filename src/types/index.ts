export type NavSection =
  | 'dashboard'
  | 'customers'
  | 'meters'
  | 'transactions'
  | 'payments'
  | 'vending'
  | 'outages'
  | 'services'
  | 'notifications'
  | 'analytics'
  | 'reports'
  | 'exports'
  | 'users'
  | 'settings'
  | 'audit';

export type UserRole =
  | 'Super Admin'
  | 'System Administrator'
  | 'Management'
  | 'Executive Management'
  | 'Finance'
  | 'Finance & Settlement'
  | 'Operations'
  | 'Operations & Grid Dispatch'
  | 'Customer Service'
  | 'Auditor / Read Only'
  | 'Read Only'
  | string;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  avatarUrl?: string;
  title?: string;
  lastActive: string;
  status: 'Active' | 'Inactive';
}

export type PaymentChannel =
  | 'Orange Money'
  | 'Afrimoney'
  | 'Card Payment'
  | 'Bank Transfer'
  | 'Direct Cash / Counter'
  | 'EDSA Direct Agency'
  | 'QMoney'
  | 'Visa / Mastercard'
  | 'Commercial Bank Cards'
  | 'Commercial Bank API'
  | 'EDSA Cash Counter'
  | 'Splash'
  | string;

export type MeterType =
  | 'STS Pre-paid Single-Phase'
  | 'STS Pre-paid 3-Phase'
  | 'Smart AMI Pre-paid'
  | 'Smart AMI Post-paid'
  | 'STS Single-Phase'
  | 'STS 3-Phase'
  | 'Smart Pre-paid'
  | string;

export type TariffCategory =
  | 'Domestic Residential'
  | 'Domestic Lifeline'
  | 'Domestic Normal'
  | 'Commercial'
  | 'Commercial Small/Medium'
  | 'Industrial'
  | 'Industrial 3-Phase'
  | string;

export interface Meter {
  meterNumber: string;
  customerId: string;
  customerName?: string;
  type: MeterType;
  district: string;
  substation: string;
  feederLine?: string;
  address: string;
  installationDate: string;
  status: 'Active' | 'Faulty' | 'Tampered' | 'Disconnected' | 'Inactive' | string;
  signalStrengthDbm?: number;
  lastComm?: string;
  lastCommunication?: string;
  totalKWhConsumed?: number;
  tariffClass?: string;
  firmware?: string;
  estimatedRemainingKWh?: number;
  phaseCount?: 1 | 3 | number;
  latitude?: number;
  longitude?: number;
  tamperAlert?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  meterNumber?: string;
  phone: string;
  email?: string;
  address: string;
  district: string;
  tariffCategory?: TariffCategory;
  accountStatus?: 'Active' | 'Suspended' | 'Pending Verification' | 'Flagged' | string;
  status: 'Active' | 'Suspended' | 'Pending Verification' | 'Flagged' | string;
  registeredDate?: string;
  registrationDate?: string;
  totalSpendLe?: number;
  totalUnitsKWh?: number;
  activeTicketsCount?: number;
  meters?: Meter[];
  customerType?: 'Residential' | 'Commercial' | 'Industrial' | string;
  nin?: string;
  nationalId?: string;
  lifetimeSpend?: number;
  substation?: string;
  feederLine?: string;
  meterType?: MeterType;
  accountNumber?: string;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerId?: string;
  meterNumber: string;
  meterType?: MeterType;
  amountLe: number;
  amount?: number;
  unitsKWh: number;
  units?: number;
  token?: string;
  stsToken?: string;
  tokenGenerated?: string;
  paymentMethod: PaymentChannel;
  channel?: PaymentChannel;
  paymentProviderRef?: string;
  status: 'Success' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  timestamp: string;
  referenceId?: string;
  reference?: string;
  tariffRatePerKWh?: number;
  tariffClass?: string;
  tariffCategory?: string;
  substation?: string;
  feederLine?: string;
  district?: string;
  receiptNumber?: string;
  gstAmountLe?: number;
  serviceFeeLe?: number;
  netEnergyAmountLe?: number;
  failureReason?: string;
  reconciled?: boolean;
}

export type OutageSeverity = 'Critical' | 'Major' | 'Moderate' | 'Minor' | 'High' | 'Medium' | 'Low' | 'high' | 'medium' | 'low' | string;
export type OutageStatus = 'New' | 'Assigned' | 'In Progress' | 'Investigating' | 'Resolved' | 'Closed' | 'Open' | string;

export interface OutageNote {
  id?: string;
  author: string;
  text?: string;
  note?: string;
  timestamp: string;
}

export interface OutageReport {
  id: string;
  title?: string;
  location?: string;
  area?: string;
  affectedArea?: string;
  district?: string;
  substation: string;
  feederLine?: string;
  meterNumber?: string;
  reportedBy?: string;
  severity: OutageSeverity;
  status: OutageStatus;
  timeAgo?: string;
  reportedAt?: string;
  reportedTime?: string;
  reportedAgo?: string;
  affectedCustomers?: number;
  affectedCustomersEstimate?: number;
  crewAssigned?: string;
  assignedCrew?: string;
  cause?: string;
  reason?: string;
  issue?: string;
  description?: string;
  type?: string;
  resolvedAt?: string;
  notes?: OutageNote[] | any[];
  technicianNotes?: string[];
}

export interface ServiceRequest {
  id: string;
  ticketNumber?: string;
  customerName: string;
  customerId?: string;
  customerPhone?: string;
  phone?: string;
  meterNumber: string;
  district?: string;
  address?: string;
  type?: 'Missing Token' | 'Meter Fault' | 'Voltage Complaint' | 'Billing Dispute' | 'Tariff Adjustment' | 'New Connection' | string;
  category?: string;
  issue?: string;
  subject?: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent' | 'Normal' | string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Under Investigation' | 'Resolved' | 'Closed' | 'Open' | 'Awaiting Customer' | string;
  assignedTo?: string;
  timeAgo?: string;
  createdAt?: string;
  createdDate?: string;
  notes?: string[];
  internalNotes?: any[];
}

export interface VendingRecord {
  id: string;
  requestId?: string;
  meterNumber: string;
  customerName: string;
  amountLe: number;
  unitsKWh: number;
  token?: string;
  tokenGenerated?: string;
  stsToken?: string;
  paymentMethod?: PaymentChannel;
  channel?: PaymentChannel;
  stsClass?: string;
  tariffClass?: string;
  tariffRatePerKWh?: number;
  gstAmountLe?: number;
  netEnergyAmountLe?: number;
  vendingServerStatus?: string;
  paymentStatus?: string;
  status?: 'Success' | 'Pending' | 'Failed' | string;
  timestamp: string;
  retryCount?: number;
  referenceId?: string;
}

export type NotificationTarget =
  | 'All Customers & Districts'
  | 'Western Area Urban (Freetown)'
  | 'Western Area Rural'
  | 'Southern Region (Bo)'
  | 'Eastern Region (Kenema)'
  | 'Northern Region (Makeni)'
  | string;

export type NotificationChannel = 'SMS' | 'Mobile App Push' | 'In-App Alert' | 'Email' | 'Web Banner' | string;

export interface NotificationAnnouncement {
  id: string;
  title: string;
  type: 'Maintenance' | 'Emergency Outage' | 'Tariff Notice' | 'General Info' | 'Planned Maintenance' | 'Emergency Interruption' | 'Important Announcement' | string;
  content?: string;
  message?: string;
  targetDistrict?: string;
  target?: string;
  channels?: NotificationChannel[];
  status: 'Sent' | 'Scheduled' | 'Draft' | 'Published' | string;
  sentAt: string;
  author: string;
  audienceEstimate?: number;
}

export interface SystemServiceStatus {
  id: string;
  name: string;
  status: 'Online' | 'Degraded' | 'Offline' | string;
  latencyMs: number;
  uptimePercent: number;
  lastHeartbeat: string;
  description: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName?: string;
  user?: string;
  adminRole?: string;
  role?: string;
  action: string;
  resource: string;
  details: string;
  status?: string;
  result: 'Success' | 'Warning' | 'Failed' | string;
  ipAddress: string;
}

export interface TariffRate {
  id: string;
  category: TariffCategory;
  rangeKWh?: string;
  ratePerKWhLe: number;
  gstPercent?: number;
  standingFeeLe?: number;
  description: string;
  lastUpdated: string;
}
