import { startCase } from '@cogoport/utils';

const getCompanyNameOptions = (data = []) => (data || []).map((item) => ({
	label : startCase(item?.business_name),
	value : item?.id,
}));

export default getCompanyNameOptions;
