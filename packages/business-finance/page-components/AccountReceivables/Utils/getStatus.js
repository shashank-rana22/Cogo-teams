import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

const getStatus = ({ entityCode, invoiceStatus = '', paymentStatus = '', eventName = '' }) => {
	const irnLabel = ENTITY_FEATURE_MAPPING[entityCode]?.labels?.irn_label;

	const INVOICE_STATUS_MAPPING = {
		DRAFT            : 'DRAFT',
		POSTED           : 'POSTED',
		FINANCE_ACCEPTED : 'FINANCE_ACCEPTED',
		CONSOLIDATED     : 'CONSOLIDATED',
		IRN_GENERATED    : `${irnLabel}_GENERATED`,
		IRN_FAILED       : `${irnLabel}_FAILED`,
		FAILED           : 'FAILED',
		IRN_CANCELLED    : `${irnLabel}_CANCELLED`,
		FINANCE_REJECTED : 'FINANCE_REJECTED',
	};
	const PAYMENT_STATUS_MAPPING = {
		PAID         : 'PAID',
		UNPAID       : 'UNPAID',
		PARTIAL_PAID : 'PARTIAL_PAID',
	};
	const OTHER_STATUS_MAPPING = {
		CREATED: 'CREATED',
	};

	const EVENTS_NAME_MAPPING = {
		...INVOICE_STATUS_MAPPING,
		...PAYMENT_STATUS_MAPPING,
		...OTHER_STATUS_MAPPING,
	};

	return INVOICE_STATUS_MAPPING[invoiceStatus] || PAYMENT_STATUS_MAPPING[paymentStatus]
	|| EVENTS_NAME_MAPPING[eventName] || eventName;
};

export default getStatus;
