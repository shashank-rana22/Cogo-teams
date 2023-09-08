import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';

const getDetails = ({ item = {} }) => {
	const {
		commodity,
		volume,
		weight,
	} = item || {};

	return [
		`Vol: ${volume} CBM, WT: ${weight} KG`,
		commodity ? COMMODITY_NAME_MAPPING[commodity]?.name : '',
	];
};

export default getDetails;
