import EditInvoice from '../page-components/EditInvoice';
import EditSellQuotation from '../page-components/EditSellQuotation';
import ReAllocation from '../page-components/ReAllocation';
import ReopenTasks from '../page-components/ReopenTasks';
import SIDBeforeDeparture from '../page-components/SIDBeforeDeparture';

export const TAB_CONFIG = {
	SID_BEFORE_DEPARTURE: {
		key       : 'SID_BEFORE_DEPARTURE',
		title     : 'SID Before Departure',
		component : (val) => <SIDBeforeDeparture {...val} />,
	},
	EDIT_INVOICE: {
		key       : 'EDIT_INVOICE',
		title     : 'Edit Invoice',
		component : (val) => <EditInvoice {...val} />,
	},
	REOPEN_TASK: {
		key       : 'REOPEN_TASK',
		title     : 'Reopen Tasks',
		component : (val) => <ReopenTasks {...val} />,
	},
	EDIT_SELL_QUOTATION: {
		key       : 'EDIT_SELL_QUOTATION',
		title     : 'Edit Sell Quotaion',
		component : (val) => <EditSellQuotation {...val} />,
	},
	STAKEHOLDER_RE_ALLOCATION: {
		key       : 'STAKEHOLDER_RE_ALLOCATION',
		title     : 'Reallocate Stakeholders',
		component : (val) => <ReAllocation {...val} />,
	},
};
