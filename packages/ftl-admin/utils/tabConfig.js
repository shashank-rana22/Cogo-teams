import EditInvoice from '../page-components/EditInvoice';
import EditSellQuotation from '../page-components/EditSellQuotation';
import ReAllocation from '../page-components/ReAllocation';
import ReopenTasks from '../page-components/ReopenTasks';
import SIDBeforeDeparture from '../page-components/SIDBeforeDeparture';

export const TAB_CONFIG = {
	sid_before_departure: {
		key       : 'sid_before_departure',
		title     : 'SID Before Departure',
		component : (val) => <SIDBeforeDeparture {...val} />,
	},
	edit_invoice: {
		key       : 'edit_invoice',
		title     : 'Edit Invoice',
		component : (val) => <EditInvoice {...val} />,
	},
	reopen_task: {
		key       : 'reopen_task',
		title     : 'Reopen Tasks',
		component : (val) => <ReopenTasks {...val} />,
	},
	edit_sell_quotation: {
		key       : 'edit_sell_quotation',
		title     : 'Edit Sell Quotaion',
		component : (val) => <EditSellQuotation {...val} />,
	},
	stakeholder_reallocation: {
		key       : 'stakeholder_reallocation',
		title     : 'Reallocate Stakeholders',
		component : (val) => <ReAllocation {...val} />,
	},
};
