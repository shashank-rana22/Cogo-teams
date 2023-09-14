import changeFormat from './changeTimeDateFormat';

const createPayload = ({
	query = '',
	globalFilters = {},
	sort = {},
	performedBy = '',
	performedByName = '',
	performedByType = '',
	urlQuery = '',
}) => {
	const {
		entity = '', currency: queryCurr = '', payrun = '', organizationId = '',
		services = '',
	} = urlQuery || {};

	const q = query || undefined;
	const { dueDate = '', invoiceDate = '', updatedDate = '', category = '', ...rest } = globalFilters;
	const restParse = JSON.stringify(rest);
	const sortParse = JSON.stringify(sort);
	const payload = {
		payrunId           : payrun,
		entityCode         : entity,
		currency           : queryCurr,
		performedBy,
		performedByType,
		performedByName,
		organizationId,
		services,
		category           : category || undefined,
		...(JSON.parse(restParse) || {}),
		startDate          : changeFormat({ time: dueDate?.startDate }) || undefined,
		endDate            : changeFormat({ time: dueDate?.endDate }) || undefined,
		fromBillDate       : changeFormat({ time: invoiceDate?.startDate }) || undefined,
		toBillDate         : changeFormat({ time: invoiceDate?.endDate }) || undefined,
		fromUploadBillDate : changeFormat({ time: updatedDate?.startDate }) || undefined,
		toUploadBillDate   : changeFormat({ time: updatedDate?.endDate }) || undefined,
		q,
		...(JSON.parse(sortParse) || {}),
	};

	return payload;
};

export default createPayload;
