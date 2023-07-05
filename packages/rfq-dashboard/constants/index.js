import { IcCFcl, IcCLcl, IcCAir } from '@cogoport/icons-react';

const SORT_OPTIONS = [
	{ label: 'Newest Arrival', value: 'newest' },
	{ label: 'Oldest Arrival', value: 'oldest' },
	{ label: 'Profitability (High to Low)', value: 'profitability_high' },
	{ label: 'Profitability (Low to High)', value: 'profitability_low' },
];

const SVG_PROPS = {
	height : '18px',
	width  : '18px',
};

const SERVICE_MAPPING = {
	fcl_freight : { icon: <IcCFcl {...SVG_PROPS} />, label: 'FCL' },
	lcl_freight : { icon: <IcCLcl {...SVG_PROPS} />, label: 'LCL' },
	air_freight : { icon: <IcCAir {...SVG_PROPS} />, label: 'AIR' },
};

export { SORT_OPTIONS, SERVICE_MAPPING };
