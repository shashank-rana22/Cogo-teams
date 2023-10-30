import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const getControls = ({ convenienceRateOptions }) => {
	const options = convenienceRateOptions.map((option) => ({
		label : startCase(option.unit),
		value : option.unit,
	}));

	const controls = {
		name             : 'convenience_fee',
		type             : 'fieldArray',
		showButtons      : false,
		showDeleteButton : false,
		showDivider      : false,
		controls         : [
			{
				name        : 'unit',
				type        : 'select',
				label       : '',
				span        : 3.8,
				options,
				className   : 'primary sm',
				placeholder : 'Value',
				rules       : { required: 'Required' },
				disabled    : true,
			},
			{
				name       : 'currency',
				type       : 'select',
				label      : '',
				span       : 3.8,
				caret      : true,
				showMargin : false,
				options    : [
					GLOBAL_CONSTANTS.currency_code.USD,
					GLOBAL_CONSTANTS.currency_code.EUR,
					GLOBAL_CONSTANTS.currency_code.INR,
					GLOBAL_CONSTANTS.currency_code.GBP,
					GLOBAL_CONSTANTS.currency_code.VND,
				].map((currencyCode) => ({
					label : currencyCode,
					value : currencyCode,
				})),
				watch       : true,
				rules       : { required: 'Required' },
				placeholder : 'Currency',
				disabled    : true,
			},
			{
				name        : 'convenience_fee',
				type        : 'number',
				label       : '',
				span        : 3.8,
				placeholder : 'Value',
				rules       : { required: 'Required' },
				disabled    : true,
			},
		],
	};

	return [
		{
			...controls,
			controls: (controls?.controls || []).map((child) => child),
		},
	];
};

export default getControls;
