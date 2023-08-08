import { startCase } from '@cogoport/utils';

const getGSTINOptions = (data = []) => {
	const EXISTING_GSTIN = {};
	data.forEach((item) => {
		EXISTING_GSTIN[item?.id] = item?.billing_addresses?.map((it) => ({
			label : startCase(it?.tax_number),
			value : it?.tax_number,
		}));
	});
	return EXISTING_GSTIN;
};

export default getGSTINOptions;
