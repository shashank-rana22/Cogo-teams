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
	ledCurrency  : data?.ledCurrency,
	jvCodeNum    : data?.journal,
	jvCategory   : data?.category,
	exchangeRate : data?.exchangeRate,
	entityId     : data?.entityId,
	entityCode   : data?.entityCode,
	description  : data?.description,
	currency     : data?.currency,
});

export default formatCreateJvPayload;
