import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import {
	IcCCountryIndia, IcCCountryNetherland, IcCCountrySingapore,
	IcCCountryVietnam, IcMFdollar, IcMFdong, IcMFeuro, IcMFpound, IcMFrupee, IcMFsingaporeDollar,
} from '@cogoport/icons-react';
import { ComponentType } from 'react';

type IconProps = {
	width: number;
	height: number;
};

  type IconType = ComponentType<IconProps>;

const CURRENCY_ICON_MAPPING = {
	[GLOBAL_CONSTANTS.currency_code.INR] : IcMFrupee,
	[GLOBAL_CONSTANTS.currency_code.USD] : IcMFdollar,
	[GLOBAL_CONSTANTS.currency_code.SGD] : IcMFsingaporeDollar,
	[GLOBAL_CONSTANTS.currency_code.GBP] : IcMFpound,
	[GLOBAL_CONSTANTS.currency_code.EUR] : IcMFeuro,
	[GLOBAL_CONSTANTS.currency_code.VND] : IcMFdong,
};
const getContentMapping = ({ width, height, mapping }:
{ width: number; height: number;
	mapping: Record<string, IconType | undefined> }) => Object.entries(mapping).reduce((pv, [key, Icon]) => ({
	...pv,
	...(Icon && {
		[key]: <Icon width={width} height={height} />,
	}),
}), {});

const CURRENCY_DATA_MAPPING = getContentMapping({
	width   : 35,
	height  : 35,
	mapping : CURRENCY_ICON_MAPPING,
});

export const CURRENCY_DATA = Object.keys(CURRENCY_DATA_MAPPING || []).map(
	(currency, index) => ({
		id   : index,
		icon : CURRENCY_DATA_MAPPING[currency],
		text : currency,
	}),
);

export const ENTITY_MAPPING = [
	{
		entityCode : '101',
		label      : '101 - COGO FREIGHT PVT LTD',
		icon       : <IcCCountryIndia height={20} width={20} />,
	},
	{
		entityCode : '201',
		label      : '201 - Cogoport Netherlands',
		icon       : <IcCCountryNetherland height={20} width={20} />,
	},
	{
		entityCode : '301',
		label      : '301 - COGOPORT PRIVATE LIMITED',
		icon       : <IcCCountryIndia height={20} width={20} />,
	},
	{
		entityCode : '401',
		label      : '401 - Cogo Universe Pte. Ltd',
		icon       : <IcCCountrySingapore height={20} width={20} />,
	},
	{
		entityCode : '501',
		label      : '501 - Cogoport Vietnam',
		icon       : <IcCCountryVietnam height={20} width={20} />,
	},
];
