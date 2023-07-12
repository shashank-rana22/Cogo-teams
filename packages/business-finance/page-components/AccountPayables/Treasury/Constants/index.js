import {
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
} from '@cogoport/icons-react';

export const ALL_REQUEST = [
	{
		label : 'ALL',
		value : 'all',
	},
	{
		label : 'REQUEST',
		value : 'request',
	},
];

export const VIEW_BY = [
	{
		label : 'Day',
		value : 'day',
	},
	{
		label : 'Month',
		value : 'month',
	},
];

export const ICON_MAPPING = {
	101 : <IcCCountryIndia height={20} width={20} />,
	201 : <IcCCountryNetherland height={20} width={20} />,
	301 : <IcCCountryIndia height={20} width={20} />,
	401 : <IcCCountrySingapore height={20} width={20} />,
	501 : <IcCCountryVietnam height={20} width={20} />,
};
