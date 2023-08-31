import History from '../ViewOrganizationDetails/History';
import Invoices from '../ViewOrganizationDetails/Invoices';

import OrganizationUsers from './OrganizationUsers';

const TAB_OPTIONS = [
	{
		key       : 'invoice_details',
		name      : 'Invoice Details',
		component : Invoices,
	},
	{
		key       : 'settlement',
		name      : 'Settlement',
		component : History,
	},
	{
		key       : 'organization_users',
		name      : 'Users',
		component : OrganizationUsers,
	},
];

export default TAB_OPTIONS;
