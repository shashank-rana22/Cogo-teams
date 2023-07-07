import { startCase } from '@cogoport/utils';

const getGSTINOptions = (data = []) => {
	const EXISTING_GSTIN = {};
	(data || []).forEach((item) => {
		const eachGSTIN = {
			label : startCase(item?.tax_number),
			value : item?.tax_number,
		};
		EXISTING_GSTIN[item?.id] = [eachGSTIN];
	});
	return EXISTING_GSTIN;
};

export default getGSTINOptions;
