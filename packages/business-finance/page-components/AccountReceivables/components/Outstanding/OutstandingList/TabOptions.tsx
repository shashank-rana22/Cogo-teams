import InvoiceTable from '../../../commons/InvoiceTable';

import Communication from './Communication';
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
	{
		key       : 'communication',
		name      : 'Communication',
		component : Communication,
	},
];

export default TabsOptions;
