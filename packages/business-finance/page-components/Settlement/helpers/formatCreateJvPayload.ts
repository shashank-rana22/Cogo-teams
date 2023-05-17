import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

const formatCreateJvPayload = (data) => ({
	transactionDate: formatDate({
		date       : data?.accountingDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'dateTime',
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		separator  : ' ',
	}),
	jvLineItems  : data?.line_items?.map((lineitem) => ({ ...lineitem, entityCode: data?.entityCode })),
	ledCurrency  : data?.ledCurrency || undefined,
	jvCodeNum    : data?.journal || undefined,
	jvCategory   : data?.category || undefined,
	exchangeRate : data?.exchangeRate || undefined,
	entityId     : data?.entityId || undefined,
	entityCode   : data?.entityCode || undefined,
	description  : data?.description || undefined,
	currency     : data?.currency || undefined,
});

export default formatCreateJvPayload;
