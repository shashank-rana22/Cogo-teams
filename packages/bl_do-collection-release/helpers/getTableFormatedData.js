import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import shotNames from '../configs/short-disply-names.json';

export default function getTableFormatedData(list) {
	const tableData = [];

	(list || []).forEach((item) => {
		const row = {
			id         : item.id,
			invoice_no : item.invoice_no || item.invoice_number,
			utr_nos    : (item.utr_nos || []).join(',') || '',
			updated_at : formatDate({
				date       : item.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
			service_name      : (item.service_name || []).map((ele) => shotNames[ele]).join(', '),
			inr_invoice_total : formatAmount({
				amount   : item.inr_invoice_total || '',
				currency : 'inr',
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			payment_status: item.payment_status || '',
		};

		tableData.push(row);
	});

	return tableData;
}
