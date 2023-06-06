import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { startCase } from '@cogoport/utils';
import converter from 'number-to-words';

export const finalAmountInWords = (grand_total = 0) => {
	let amountInWords = null;
	if (typeof grand_total !== 'number') {
		return amountInWords;
	}

	const mainAmount = grand_total?.toFixed(2)?.split('.')?.[0] || 0;
	const subAmount = grand_total?.toFixed(2)?.split('.')?.[1] || 0;

	if (grand_total) {
		try {
			const mainAmountWords = startCase(converter.toWords(+mainAmount));
			const subAmountWords = startCase(converter.toWords(+subAmount));
			amountInWords = `${mainAmountWords} Rupees`;
			amountInWords = +subAmount
				? `${amountInWords} and ${subAmountWords} Paise`
				: amountInWords;
		} catch (err) {
			getApiErrorString(err);
		}
	}
	return amountInWords;
};
