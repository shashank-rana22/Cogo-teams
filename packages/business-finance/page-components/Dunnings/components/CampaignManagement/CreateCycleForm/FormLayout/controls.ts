import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SERVICE_OPTIONS } from '../../constants';

export const controls = ({ formData, setFormData }) => {
	const entityData = GLOBAL_CONSTANTS.cogoport_entities;

	const entityOptions = Object.keys(entityData).map((entity) => ({
		label : `${entity} (${entityData[entity].currency})`,
		name  : entity,
		value : entity,
	}));

	const currencyData = GLOBAL_CONSTANTS.currency_code;

	const currencyOptions = Object.keys(currencyData)?.map((currency) => (
		{
			label : currency,
			value : currency,
		}
	));

	return [
		{
			label   : '',
			span    : 6,
			groupBy : [
				{
					label       : 'Enter Cycle Name',
					name        : 'cycleName',
					type        : 'input',
					prefix      : null,
					placeholder : 'Insert Cycle Name',
					// rules       : { required: 'Required' },
					span        : 12,
				},
			],
		},
		{
			label   : 'Cycle Type',
			name    : 'cycleType',
			type    : 'radioGroup',
			span    : 12,
			options : [
				{ name: 'soa', value: 'soa', label: 'SOA' },
				{ name: 'wis', value: 'wis', label: 'WIS' },
				{ name: 'balanceConfirmation', value: 'balanceConfirmation', label: 'Balance Confirmation' },
			],
		},
		{
			label   : 'Cogo Entity',
			name    : 'cogoEntity',
			type    : 'radioGroup',
			span    : 12,
			options : entityOptions,
		},
		{
			name          : 'isAllCreditControllers',
			type          : 'checkbox',
			checkboxLabel : 'Select All Credit Contollers',
			checked       : formData?.isAllCreditControllers,
			onChange      : (e) => {
				if (e?.target?.checked) {
					setFormData({ ...formData, isAllCreditControllers: true });
				} else {
					setFormData({ ...formData, isAllCreditControllers: false });
				}
			},
			span: 12,
		},
		{
			label   : '',
			span    : 12,
			groupBy : [
				{
					label   : 'Service Type',
					name    : 'serviceType',
					type    : 'select',
					span    : 2,
					options : SERVICE_OPTIONS,
				},
				{
					label       : 'Credit Controller',
					name        : 'creditController',
					placeholder : formData?.isAllCreditControllers ? 'All Credit Controllers Selected'
						: 'Select',
					type     : 'select',
					options  : [],
					disabled : formData?.isAllCreditControllers,
					span     : 3,
					style    : { width: '270px' },
				},
				{
					label   : 'Ageing Bucket',
					name    : 'ageingBucket',
					type    : 'select',
					span    : 2,
					options : [
						{ label: '1-30 Days', value: 'AB_1_30' },
						{ label: '31-60 Days', value: 'AB_31_60' },
						{ label: '61-90 Days', value: 'AB_61_90' },
						{ label: '91-180 Days', value: 'AB_91_180' },
						{ label: '181+ Days', value: 'AB_181_PLUS' },
						{ label: 'All Days', value: 'ALL' },
					],
				},

			],
		},
		{
			name              : 'Total Due Outstanding Greater Than',
			showStyledHeading : false,
			span              : 12,
			groupBy           : [
				{
					name        : 'totalDueOutstandingGreaterThanCurrency',
					placeholder : 'Currency',
					type        : 'select',
					span        : 1,
					options     : currencyOptions,
				},
				{
					name               : 'totalDueOutstandingGreaterThanAmount',
					placeholder        : 'Insert Amount',
					type               : 'input',
					onlyNumbersAllowed : true,
					prefix             : null,
					span               : 9,
				},
			],
		},
		{
			label        : 'Trigger Type',
			name         : 'triggerType',
			type         : 'radioGroup',
			span         : 12,
			defaultValue : 'oneTime',
			options      : [
				{ name: 'oneTime', value: 'oneTime', label: 'One Time' },
				{ name: 'periodic', value: 'periodic', label: 'Periodic' },
			],
		},

	];
};
