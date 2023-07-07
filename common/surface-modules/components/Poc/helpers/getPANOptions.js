import { startCase } from '@cogoport/utils';

const getPANOptions = (data = []) => {
	const EXISTING_PAN = {};
	(data || []).forEach((item) => {
		const eachPAN = {
			label : startCase(item?.registration_number),
			value : item?.registration_number,
		};
		EXISTING_PAN[item?.id] = [eachPAN];
	});

	return EXISTING_PAN;
};

export default getPANOptions;
