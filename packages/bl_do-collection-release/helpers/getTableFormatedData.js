import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import shotNames from '../configs/short-disply-names.json';

const getTdsAmount = (data, item) => {
	const billObject = (data || []).find((bill) => bill?.billNumber === (item.invoice_no || item.invoice_number));

	return {
		tdsAmount : billObject?.tdsAmount,
		currency  : billObject?.billCurrency,
	};
};

export default function getTableFormatedData({ list_of_invoices, data }) {
	const TABLE_DATA = [];

	(list_of_invoices || []).forEach((item) => {
		const { currency, tdsAmount } = getTdsAmount(data, item);

		const row = {
			id         : item.id,
			invoice_no : item.invoice_no || item.invoice_number,
			utr_nos    : (item.utr_nos || []).join(',') || '',
			updated_at : formatDate({
				date       : item.updated_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
			service_name      : (item.services || []).map((ele) => shotNames[ele?.service_type]).join(', '),
			inr_invoice_total : formatAmount({
				amount   : item.inr_invoice_total || '',
				currency : 'inr',
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			payment_status : item.payment_status || '',
			tdsAmount      : formatAmount({
				amount  : tdsAmount || '',
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),

		};

		TABLE_DATA.push(row);
	});

	return TABLE_DATA;
}
