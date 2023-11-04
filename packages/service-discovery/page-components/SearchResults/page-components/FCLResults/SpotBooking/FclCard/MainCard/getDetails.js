import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

const getDetails = ({ item }) => {
	const {
		container_size = '',
		commodity = '',
		container_type = '',
	} = item || {};

	return [
		`${container_size} FT. ${container_type ? startCase(container_type) : ''}. 
		${commodity ? COMMODITY_NAME_MAPPING[commodity]?.name : ''}`,
	];
};

export default getDetails;
