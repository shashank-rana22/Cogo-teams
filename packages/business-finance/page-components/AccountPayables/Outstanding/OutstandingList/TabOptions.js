import History from '../ViewOrganizationDetails/History';
import Invoices from '../ViewOrganizationDetails/Invoices';

import OrganizationUsers from './OrganizationUsers';

const TabsOptions = [
	{
		key       : 'invoice_details',
		name      : 'Invoice Details',
		component : Invoices,
	},
	{
		key       : 'payments_list',
		name      : 'Payments',
		component : History,
	},
	{
		key       : 'organization_users',
		name      : 'Users',
		component : OrganizationUsers,
	},
];

export default TabsOptions;
