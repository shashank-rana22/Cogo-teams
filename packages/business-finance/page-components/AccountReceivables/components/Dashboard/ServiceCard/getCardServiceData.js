import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAirport, IcMTransport, IcMShip } from '@cogoport/icons-react';

export const getCardData = ({
	t,
	oceanOpen,
	oceanCurrency,
	currency,
	oceanTradeType,
	airCurrency,
	airOpen,
	airTradeType,
	surfaceCurrency,
	surfaceOpen,
	surfaceTradeType,
}) => [
	{
		label        : t('ocean_label'),
		amount       : oceanOpen,
		currency     : oceanCurrency || currency,
		openInvoices : oceanOpen || GLOBAL_CONSTANTS.zeroth_index,
		tradeType    : oceanTradeType,
		onAccount    : 'onAccountAmount',
		icon         : <IcMShip style={{ width: '24px', height: '24px' }} />,
	},
	{
		label        : t('air_label'),
		currency     : airCurrency || currency,
		amount       : airOpen,
		openInvoices : airOpen || GLOBAL_CONSTANTS.zeroth_index,
		tradeType    : airTradeType,
		onAccount    : 'onAccountAmount',
		icon         : <IcMAirport style={{ width: '24px', height: '24px' }} />,
	},
	{
		label        : t('surface_label'),
		currency     : surfaceCurrency || currency,
		amount       : surfaceOpen,
		tradeType    : surfaceTradeType,
		openInvoices : surfaceOpen || GLOBAL_CONSTANTS.zeroth_index,
		onAccount    : 'onAccountAmount',
		icon         : <IcMTransport style={{ width: '24px', height: '24px' }} />,
	},
];
export const getServiceData = ({
	t,
	oceanOpen,
	oceanCurrency,
	currency,
	airCurrency,
	airOpen,
	surfaceCurrency,
	surfaceOpen,
}) => [
	{
		label    : t('ocean_label'),
		amount   : oceanOpen || GLOBAL_CONSTANTS.zeroth_index,
		currency : oceanCurrency || currency,
		icon     : <IcMShip style={{ width: '24px', height: '24px' }} />,
	},
	{
		label    : t('air_label'),
		currency : airCurrency || currency,
		amount   : airOpen || GLOBAL_CONSTANTS.zeroth_index,
		icon     : <IcMAirport style={{ width: '24px', height: '24px' }} />,
	},
	{
		label    : t('surface_label'),
		currency : surfaceCurrency || currency,
		amount   : surfaceOpen || GLOBAL_CONSTANTS.zeroth_index,
		icon     : <IcMTransport style={{ width: '24px', height: '24px' }} />,
	},
];
