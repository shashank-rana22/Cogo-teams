import { SOURCE_OPTIONS } from '../../../../../constants/rateRevertsConstants';

function getSourceTags({ sources = [] }) {
	return sources.map((itm) => ({
		key      : itm,
		disabled : false,
		children : SOURCE_OPTIONS?.[itm]?.label,
		color    : 'green',
		tooltip  : false,
		closable : true,
	}));
}

export default getSourceTags;
