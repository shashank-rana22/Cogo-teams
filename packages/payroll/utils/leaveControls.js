import {
	AsyncSelectController, InputController,
	TextAreaController, SelectController, CheckboxController,
} from '@cogoport/forms';

import styles from '../page-components/IrregularPayments/AddPayment/styles.module.css';

export const paymentTypeOptions = [
	{ label: 'Bonus', value: 'bonus' },
	{ label: 'Additional Bonus', value: 'additional_bonus' },
	{ label: 'Incentive', value: 'incentive' },
	{ label: 'Reimbursement', value: 'reimbursement' },
	{ label: 'Arrear', value: 'arrear' },
	{ label: 'Gift', value: 'gift' },
	{ label: 'Deductions', value: 'deductions' },
];

export const leaveControls = () => (
	[
		{
			name        : 'employees',
			asyncKey    : 'list_employees',
			placeholder : 'Select employees by name or COGO ID',
			label       : 'Who do you want to make the payment to?',
			controlType : 'asyncselect',
			valueKey    : 'cogoport_email',
			multiple    : true,
			isClearable : true,
			initialCall : true,
			params      : {
				filters: {
					employee_status: ['probation', 'confirmed'],
				},
			},
			rules: {
				required: {
					value   : true,
					message : 'Select at least one employee',
				},
			},
		},
		{
			name        : 'amount',
			label       : 'Total Amount to be sent for each employee',
			controlType : 'input',
			placeholder : 'Enter amount to be paid to each employee',
			size        : 'md',
			type        : 'number',
			rules       : {
				required: {
					value   : true,
					message : 'Enter the amount to be disbursed to each employee',
				},
			},
		},
		{
			name        : 'payment_type',
			label       : 'Type of Payment',
			controlType : 'select',
			placeholder : 'Select Payment Type',
			isClearable : true,
			options     : paymentTypeOptions,
			rules       : {
				required: {
					value   : true,
					message : 'Select the payment type',
				},
			},
		},
		{
			name        : 'description',
			label       : 'Description',
			controlType : 'textarea',
			placeholder : 'Describe reason for payment',
			size        : 'md',
		},
		{
			name        : 'taxation',
			label       : 'Select how to recover TDS for this payment',
			controlType : 'select',
			placeholder : 'Select Taxation Option',
			options     : [
				{ label: 'Deduct TDS from this payments itself', value: 'current' },
				{ label: 'Credit the entire amount and deduct TDS from future payroll', value: 'future' },
				{ label: 'Non Taxable', value: 'non_taxable' },
			],
			rules: {
				required: {
					value   : true,
					message : 'select taxation option',
				},
			},
		},
		{
			name        : 'is_recurring',
			controlType : 'checkbox',
			label       : 'This payment is recurring',
		},

		{
			name        : 'start_month',
			isHalf      : true,
			label       : 'Start Month',
			controlType : 'select',
			placeholder : 'Select Month',
			options     : [
				{ label: 'January', value: 1 },
				{ label: 'February', value: 2 },
				{ label: 'March', value: 3 },
				{ label: 'April', value: 4 },
				{ label: 'May', value: 5 },
				{ label: 'June', value: 6 },
				{ label: 'July', value: 7 },
				{ label: 'August', value: 8 },
				{ label: 'September', value: 9 },
				{ label: 'October', value: 10 },
				{ label: 'November', value: 11 },
				{ label: 'December', value: 12 },
			],
			rules: {
				required: {
					value   : true,
					message : 'start month is required',
				},
			},
		},
		{
			name        : 'month_count',
			isHalf      : true,
			label       : 'For how many months',
			controlType : 'input',
			type        : 'number',
			placeholder : 'Select number of months',
			rules       : {
				required: {
					value   : true,
					message : 'number of months is required',
				},
			},
		},
	]
);

export const controlMapping = {
	asyncselect : AsyncSelectController,
	input       : InputController,
	select      : SelectController,
	checkbox    : CheckboxController,
	textarea    : TextAreaController,
};

export const stylesMapping = {
	multiselect : styles.multiselect,
	input       : styles.input,
	select      : styles.select,
	checkbox    : styles.checkbox,
	textarea    : styles.textarea,
};
