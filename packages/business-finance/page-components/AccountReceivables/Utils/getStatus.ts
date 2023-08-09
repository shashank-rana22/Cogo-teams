import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

const getStatus = ({ entityCode, invoiceStatus }) => {
	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;
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
	return INVOICE_STATUS_MAPPING[invoiceStatus];
};

export default getStatus;
