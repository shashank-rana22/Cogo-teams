import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SERVICE_OPTIONS } from '../../constants';

import styles from './styles.module.css';

export const controls = ({ formData, setFormData, isEditMode = false }) => {
	const entityData = GLOBAL_CONSTANTS.cogoport_entities;

	const entityOptions = Object.keys(entityData).map((entity) => ({
		label    : `${entity} (${entityData[entity].currency})`,
		name     : String(entity),
		value    : entityData[entity].id,
		disabled : isEditMode,
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
			label       : 'Enter Cycle Name (5 letters minimum)',
			name        : 'cycleName',
			type        : 'input',
			prefix      : null,
			placeholder : 'Insert Cycle Name',
			disabled    : isEditMode,
			className   : styles.cycleName,
			span        : 12,
		},
		{
			label        : 'Cycle Type',
			name         : 'cycleType',
			type         : 'radioGroup',
			span         : 12,
			className    : styles.cycleType,
			radioOptions : [
				{ name: 'SOA', value: 'SOA', label: 'SOA', disabled: isEditMode },
				{ name: 'WIS', value: 'WIS', label: 'WIS', disabled: isEditMode },
				{
					name     : 'BALANCE_CONFIRMATION',
					value    : 'BALANCE_CONFIRMATION',
					label    : 'Balance Confirmation',
					disabled : isEditMode,
				},
			],
		},
		{
			label        : 'Cogo Entity',
			name         : 'cogoEntityId',
			type         : 'radioGroup',
			radioOptions : entityOptions,
			className    : styles.cogoEntityId,
			span         : 12,
		},
		{
			name          : 'isAllCreditControllers',
			type          : 'checkbox',
			checkboxLabel : 'Select All Credit Contollers',
			checked       : formData?.isAllCreditControllers,
			disabled      : isEditMode,
			onChange      : (e:{ target?:{ checked?:boolean } }) => {
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
					label    : 'Service Type',
					name     : 'serviceType',
					type     : 'multiSelect',
					prefix   : () => {},
					disabled : isEditMode,
					options  : SERVICE_OPTIONS,
					style    : { width: '288px' },
					span     : 4,
				},
				{
					name        : 'creditController',
					label       : 'Credit Controller',
					placeholder : formData?.isAllCreditControllers ? 'All Credit Controllers Selected'
						: 'Select',
					type         : 'asyncSelect',
					value        : formData?.creditController,
					authKey      : 'get_payments_dunning_organization_stakeholders',
					microService : 'business_finance',
					multiple     : true,
					asyncKey     : 'list_organization_stakeholders',
					labelKey     : 'organization_stakeholder_name',
					valueKey     : 'organization_stakeholder_id',
					initialCall  : true,
					disabled     : formData?.isAllCreditControllers || isEditMode,
					span         : 4,
					style        : { width: '288px' },
				},
				{
					label    : 'Ageing Bucket',
					name     : 'ageingBucket',
					type     : 'select',
					disabled : isEditMode,
					options  : [
						{ label: '1-30 Days', value: 'AB_1_30' },
						{ label: '31-60 Days', value: 'AB_31_60' },
						{ label: '61-90 Days', value: 'AB_61_90' },
						{ label: '91-180 Days', value: 'AB_91_180' },
						{ label: '181+ Days', value: 'AB_181_PLUS' },
						{ label: 'All Days', value: 'ALL' },
					],
					style : { width: '288px' },
					span  : 3,
				},
			],
		},
		{
			name              : 'Total Due Outstanding Greater Than',
			showStyledHeading : false,
			span              : 12,
			groupBy           : [
				{
					name        : 'dueOutstandingCurrency',
					placeholder : 'Currency',
					type        : 'select',
					options     : currencyOptions,
					disabled    : true,
					className   : styles.dueOutstandingCurrency,
					span        : 1,
				},
				{
					name               : 'totalDueOutstanding',
					placeholder        : 'Insert Amount',
					type               : 'input',
					onlyNumbersAllowed : true,
					prefix             : null,
					disabled           : isEditMode,
					span               : 9,
				},
			],
		},
		{
			label    : 'Trigger Type',
			name     : 'triggerType',
			type     : 'radioGroup',
			value    : formData?.triggerType || 'ONE_TIME',
			onChange : (value:string) => {
				setFormData({ ...formData, triggerType: value });
			},
			radioOptions: [
				{ name: 'ONE_TIME', value: 'ONE_TIME', label: 'One Time' },
				{ name: 'PERIODIC', value: 'PERIODIC', label: 'Periodic' },
			],
			className : styles.triggerType,
			span      : 12,
		},

	];
};
