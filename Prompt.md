Build the EDSA Administration & Operations Dashboard for the Electricity Distribution and Supply Authority of Sierra Leone.

Use the provided dashboard image as the visual direction, but build a complete, responsive, professional administration system rather than simply reproducing a static screen.

This dashboard is part of the same EDSA digital platform as the Web, Android, and iOS customer applications. It represents the internal system EDSA staff would use to manage and monitor the customer-facing digital service.

Important: this is currently a board-level prototype. Use realistic mock/hardcoded data only. Do not connect to real EDSA systems, meters, payment providers, customer databases, or vending infrastructure.

Main Dashboard

The first screen should closely follow the provided reference and immediately give EDSA management an overview of operations.

Show:

Total customers
Active meters
Electricity/energy sold
Revenue
Transaction success/failure rate
Electricity sales chart
Revenue trends
Payment-method distribution
System/service status
Recent transactions
Recent outage reports

Include useful date filters such as Today, 7 Days, 30 Days and custom range.

Navigation

Organize the admin system into logical sections rather than creating unnecessary pages:

Dashboard

Customers

Customers
Meters
Transactions
Payments

Operations

Vending
Outage Reports
Service Requests
Notifications

Reports

Analytics
Reports
Export Data

Administration

Users & Roles
System Settings
Audit Logs
Customers & Meters

Staff should be able to search by customer name, phone number or meter number.

A customer record can show:

Customer information
Registered meters
Account status
Purchase history
Payment history
Previous demo tokens
Outage/service requests

Keep customer details consolidated rather than creating many separate screens.

Transactions & Payments

Provide searchable/filterable transaction management showing:

Transaction ID | Customer | Meter | Amount | Units | Payment Method | Status | Date

Support demo states including:

Successful / Pending / Failed / Refunded

Clicking a transaction should open a detail drawer/modal rather than navigating unnecessarily.

Show Orange Money, Afrimoney and Visa/Mastercard as prototype payment channels.

Vending

This is especially important.

Create a Vending Operations area representing the future integration between the EDSA digital platform and EDSA's authorized electricity vending infrastructure.

Show things such as:

Vending requests
Meter number
Purchase amount
Units
Token status
Payment status
Timestamp
Failed vending requests
Retry/reconciliation state

Never implement or generate real STS electricity tokens.

Use obviously simulated tokens and mock vending responses. Structure the software so a real authorized EDSA vending API could replace the mock service later.

Outage Management

Customer outage reports from the mobile/web prototype should appear here.

Show:

Location | Area | Meter | Issue | Time | Status

Support:

Open → Assigned → In Progress → Resolved

Allow staff to open a report, view details and update its simulated status.

The dashboard should make it possible to see areas receiving unusually high numbers of outage reports.

Customer Service Requests

Provide one consolidated queue for meter problems, payment issues, missing tokens, account issues and general support requests.

Staff should be able to assign a request, change status and add internal demo notes.

Notifications

Create a simple interface allowing authorized EDSA staff to prepare announcements such as:

Planned maintenance
Service interruption
Restoration notice
Important customer announcement

For the prototype, notifications are simulated only.

Analytics & Reports

Make this particularly impressive for the board.

Allow management to visualize:

Electricity purchases over time
Revenue over time
Transactions by district/area
Transactions by payment provider
Successful vs failed payments
Vending success rate
Customer growth
Meter activity
Outage reports by location
Service-request resolution performance

Use charts only where they communicate useful information. Don't fill the interface with meaningless graphs.

Users, Roles & Security

The future production platform will contain sensitive operational and customer information, so design proper role separation now.

Prototype roles:

Super Admin
Full administrative access.

Management
Dashboard, analytics and reporting.

Finance
Payments, transactions, reconciliation and reports.

Customer Service
Customers and service requests.

Operations
Meters, vending and outages.

Read Only / Auditor
View permitted information without modification.

Build the authorization architecture so permissions are not simply hidden buttons in the UI. Prepare proper role/permission guards that can later be enforced by the backend.

Audit Trail

Prepare an audit-log interface showing actions such as:

User | Action | Resource | Timestamp | Result

In production, sensitive administrative actions must be auditable.

For now use mock events.

System Status

Include a monitoring overview for future services:

Customer Web Portal
Android App
iOS App
Payment Gateway
Mobile Money Integration
Vending Service
Notification Service
Database/API

Demo statuses can include:

Operational / Degraded / Offline

These are simulated and must not imply actual EDSA infrastructure status.

Technical Architecture

Build the dashboard as a responsive web administration application.

Use the same shared design language and, where appropriate, shared types/business logic as the EDSA customer platform.

Keep integrations behind service interfaces:

Admin Dashboard → EDSA API Layer → Customer / Meter / Payment / Vending / Outage / Notification Services

For this prototype:

UI → Mock Service Layer → Demo Data

This separation is important because later we should be able to replace:

MockVendingService

with:

EDSAVendingService

without rewriting the dashboard.

Design

Follow the provided image.

The dashboard should feel like serious national utility infrastructure, not a generic SaaS template.

Use the supplied official EDSA logo.

Maintain:

White/light background
EDSA navy/blue as primary UI color
Restrained red accents
Green for healthy/success states
Amber for warnings
Red for failures/critical conditions
Excellent typography
Clear information hierarchy
Professional data tables
Consistent icons
Responsive layouts
Accessible contrast
Subtle transitions

Avoid excessive gradients, glassmorphism, giant cards, unnecessary animations and generic AI-dashboard styling.

Prototype behavior

Even though data is mocked, the dashboard should feel functional.

Searching should work.

Filters should work.

Tables should sort/filter.

Pagination should work.

Modals/drawers should work.

Date ranges should change demo analytics.

Status updates should update local/mock state.

Navigation should work.

Charts should respond to filters.

Role permissions should affect available actions.

Create realistic loading, empty, error and success states.

Critical rule

Do not overbuild this into a real electricity infrastructure system.

No real customer data.
No live EDSA credentials.
No real payment transactions.
No real meter commands.
No real STS generation.
No connection to production infrastructure.

The objective is to produce a convincing interactive prototype that we can safely demonstrate to EDSA's IT leadership and board.

When someone sees the customer app and then this dashboard, the story should be immediately clear:

Customer: “I can manage and purchase my electricity digitally.”

EDSA: “We can see, support and manage the entire digital customer journey from one operational platform.”

Before coding, inspect the existing EDSA customer application project and reuse its design tokens, types, terminology and architecture where appropriate. Do not create a visually or technically disconnected admin product.
