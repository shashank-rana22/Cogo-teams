import InvoiceTable from './InvoiceTable';
import OrganizationUsers from './OrganizationUsers';
import PaymentsTable from './PaymentTable';
import SettlementTable from './SettlementTable';

const TabsOptions = [
	{
		key       : 'invoice_details',
		name      : 'Invoice Details',
		component : InvoiceTable,
	},
	{
		key       : 'payments_list',
		name      : 'Payments',
		component : PaymentsTable,
	},
	{
		key       : 'settlement_list',
		name      : 'Settlement',
		component : SettlementTable,
	},
	{
		key       : 'organization_users',
		name      : 'Users',
		component : OrganizationUsers,
	},
];

export default TabsOptions;
