import UpdateDetails from '../components/UpdateDetails';
import UpdateQuoataion from '../components/UpdateQuotation';

export const STEPS_MAPPINGS = {
	update_details: {
		key       : 'update_details',
		title     : 'Details',
		component : UpdateDetails,
	},
	update_quotation: {
		key       : 'update_quotation',
		title     : 'Quotation',
		component : UpdateQuoataion,
	},
};
