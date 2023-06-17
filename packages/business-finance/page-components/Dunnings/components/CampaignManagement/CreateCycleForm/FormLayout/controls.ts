import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SERVICE_OPTIONS } from '../../constants';

export const controls = ({ formData, setFormData,isEditMode =false}) => {


	const entityData = GLOBAL_CONSTANTS.cogoport_entities;

	const entityOptions = Object.keys(entityData).map((entity) => ({
		label : `${entity} (${entityData[entity].currency})`,
		name  : entity,
		value : JSON.stringify({
			id       : entityData[entity].id,
		    currency : entityData[entity].currency,
		}),
	}));

	const currencyData = GLOBAL_CONSTANTS.currency_code;

	const currencyOptions = Object.keys(currencyData)?.map((currency) => (
		{
			label : currency,
			value : currency,
		}
	));

	const TRIGGER_TYPE_MAPPING = {
		'ONE_TIME': 'oneTime',
		'PERIODIC':'periodic',
		'oneTime':'oneTime',
		'periodic':'periodic',
	}

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
					value: formData?.cycleName || formData?.name,
					disabled: isEditMode,
					span        : 12,
				},
			],
		},
		{
			label   : 'Cycle Type',
			name    : 'cycleType',
			type    : 'radioGroup',
			value: !isEditMode ? formData?.cycleType : formData?.dunningCycleType,
			span    : 12,
					options : [
				{ name: 'SOA', value: 'SOA', label: 'SOA' },
				{ name: 'WIS', value: 'WIS', label: 'WIS' },
				{ name: 'BALANCE_CONFIRMATION', value: 'BALANCE_CONFIRMATION', label: 'Balance Confirmation' },
			],
		},
		{
			label   : 'Cogo Entity',
			name    : 'cogoEntityDetails',
			placeholder: isEditMode ? 'Entity' : 'Select cogo entity',
			type    : 'select',
			options : entityOptions,
			disabled: isEditMode,
			span    : 12,
		},
		{
			name          : 'isAllCreditControllers',
			type          : 'checkbox',
			checkboxLabel : 'Select All Credit Contollers',
			checked       : formData?.isAllCreditControllers,
					disabled: isEditMode,
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
					label   : 'Service Type',
					name    : 'serviceType',
					type    : 'multiSelect',
					prefix  : () => {},
					span    : 2,
					disabled: isEditMode,
					options : SERVICE_OPTIONS,
				},
				{
					name        : 'creditController',
					label       : 'Credit Controller',
					placeholder : formData?.isAllCreditControllers ? 'All Credit Controllers Selected'
						: 'Select',
					type         : 'asyncSelect',
					value        : formData?.creditController,
					authKey      : 'get_payments_dunning_credit_controllers',
					microService : 'business_finance',
					multiple     : true,
					asyncKey     : 'list_credit_controllers',
					labelKey     : 'credit_controller_name',
					valueKey     : 'credit_controller_id',
					initialCall  : true,
					disabled     : formData?.isAllCreditControllers || isEditMode,
					span         : 3,
					style        : { width: '270px' },
				},
				{
					label   : 'Ageing Bucket',
					name    : 'ageingBucket',
					type    : 'select',
					value: !isEditMode ? formData?.ageingBucket : formData?.filters?.ageingBucket,
					disabled: isEditMode,
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
					name        : 'dueOutstandingCurrency',
					placeholder : 'Currency',
					type        : 'select',
					span        : 1,
					options     : currencyOptions,
					value       : !isEditMode ? JSON.parse(formData?.cogoEntityDetails || '{}')?.currency : formData?.filters?.dueOutstandingCurrency,
					disabled    : true,
				},
				{
					name               : 'totalDueOutstanding',
					placeholder        : 'Insert Amount',
					type               : 'input',
					value: !isEditMode ? formData?.totalDueOutstanding : formData?.filters?.totalDueOutstanding,
					onlyNumbersAllowed : true,
					prefix             : null,
					disabled: isEditMode,
					span               : 9,
				},
			],
		},
		{
			label        : 'Trigger Type',
			name         : 'triggerType',
			type         : 'radioGroup',
			value: !isEditMode ? (formData?.triggerType || 'oneTime') : TRIGGER_TYPE_MAPPING[formData?.triggerTypeData],
			onChange: (value:string)=>{
				if(isEditMode){
					console.log({value});
					
					setFormData({...formData,triggerTypeData:value})
				}else{
					setFormData({...formData,triggerType:value})
				}
			},
			span         : 12,
			options      : [
				{ name: 'oneTime', value: 'oneTime', label: 'One Time' },
				{ name: 'periodic', value: 'periodic', label: 'Periodic' },
			],
		},

	];
};
