import { startCase } from '@cogoport/utils';

const getPANOptions = (data = []) => {
	const EXISTING_PAN = {};
	(data || []).forEach((item) => {
		EXISTING_PAN[item?.id] = item?.registration_number ? [{
			label : startCase(item?.registration_number),
			value : item?.registration_number,
		}] : [];
	});
	return EXISTING_PAN;
};

export default getPANOptions;
