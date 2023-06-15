import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMFrupee,
	IcMFdollar,
	IcMFeuro,
	IcMFpound,
	IcMFsingaporeDollar,
	IcCCountryIndia,
	IcCCountrySingapore,
	IcCCountryNetherland,
	IcCCountryVietnam,
	IcMFdong,
} from '@cogoport/icons-react';

const CURRENCY_ICON_MAPPING = {
	[GLOBAL_CONSTANTS.currency_code.INR] : IcMFrupee,
	[GLOBAL_CONSTANTS.currency_code.USD] : IcMFdollar,
	[GLOBAL_CONSTANTS.currency_code.SGD] : IcMFsingaporeDollar,
	[GLOBAL_CONSTANTS.currency_code.GBP] : IcMFpound,
	[GLOBAL_CONSTANTS.currency_code.EUR] : IcMFeuro,
	[GLOBAL_CONSTANTS.currency_code.VND] : IcMFdong,
};

const ENTITY_ICON_MAPPING = {
	101 : IcCCountryIndia,
	201 : IcCCountryNetherland,
	301 : IcCCountryIndia,
	401 : IcCCountrySingapore,
	501 : IcCCountryVietnam,
};

const getContentMapping = ({ width, height, mapping }) => Object.entries(mapping).reduce((pv, [key, Icon]) => ({
	...pv,
	...(Icon && { [key]: <Icon width={width} height={height} /> }),
}), {});

const CURRENCY_DATA_MAPPING = getContentMapping({
	width   : 25,
	height  : 25,
	mapping : CURRENCY_ICON_MAPPING,
});

export const CURRENCY_DATA = Object.keys(CURRENCY_DATA_MAPPING).map(
	(currency, index) => ({
		id   : currency,
		icon : CURRENCY_DATA_MAPPING[currency],
		text : currency,
	}),
);
