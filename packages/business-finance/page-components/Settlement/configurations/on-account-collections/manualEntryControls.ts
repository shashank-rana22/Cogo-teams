import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const controls = () => [
	{
		label          : 'Cogo Entity',
		name           : 'entityType',
		type           : 'select',
		placeholder    : 'Search by Cogo Entity',
		optionsListKey : 'cogo-entities-id',
		defaultOptions : true,
		valueKey       : 'entity_code',
		theme          : 'admin',
		className      : 'primary md',
		labelKey       : 'description',
		rules          : { required: 'Required' },
		span           : 3.9,
	},
	{
		name        : 'accMode',
		label       : 'Account Mode',
		theme       : 'admin',
		type        : 'select',
		className   : 'primary lg',
		placeholder : 'Select Account Mode',
		rules       : { required: true },
		value       : 'AR',
		span        : 3.9,
		options     : [
			{
				label : 'AP',
				value : 'AP',
			},
			{
				label : 'AR',
				value : 'AR',
			},
		],
	},
	{
		label          : 'Trade Party',
		name           : 'customerId',
		type           : 'select',
		theme          : 'admin',
		optionsListKey : 'trade_party_details',
		valueKey       : 'id',
		className      : 'primary lg',
		span           : 3.9,
		placeholder    : 'Enter Trade Party Name',
		rules          : { required: 'Trade Party is required' },
	},
	{
		label          : 'Transaction Date',
		name           : 'paymentDate',
		type           : 'date_picker',
		placeholder    : 'Transaction Date',
		maxDate        : new Date(),
		value          : new Date(),
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primarydate',
		span           : 3.9,
		rules          : { required: ' Transaction Date is Required' },
	},
	{
		name        : 'docType',
		label       : 'Doc Type',
		theme       : 'admin',
		type        : 'select',
		className   : 'primary lg',
		placeholder : 'Enter Doc Type',
		rules       : { required: true },
		span        : 3.9,
		options     : [
			{ label: 'Receipt', value: 'PAYMENT' },
			{
				label : 'TDS',
				value : 'TDS',
			},
		],
	},

	{
		name         : 'bankId',
		label        : 'Cogo Bank',
		theme        : 'admin',
		className    : 'primary md',
		placeholder  : 'Select Cogo Bank',
		type         : 'select',
		showOptional : false,
		span         : 3.9,
	},

	{
		label          : 'Default Currency',
		name           : 'currency',
		type           : 'select',
		theme          : 'admin',
		className      : 'primary md',
		value          : geo.country.currency.code,
		rules          : { required: 'Required' },
		span           : 3.9,
		optionsListKey : 'currencies',
		placeholder    : 'Select Currency',
	},
	{
		label       : 'Amount Received',
		name        : 'amount',
		type        : 'number',
		theme       : 'admin',
		className   : 'primary lg',
		min         : 1,
		span        : 3.9,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount received is required', min: 1 },
	},

	{
		label       : 'Enter Exchange Rate',
		name        : 'exchangeRate',
		type        : 'number',
		theme       : 'admin',
		className   : 'primary lg',
		disabled    : false,
		min         : 1,
		value       : 1,
		span        : 3.9,
		placeholder : 'Enter Exchange Rate',
		rules       : { required: 'Amount received is required', min: 0 },
	},
	{
		name        : 'ledCurrency',
		label       : 'Ledger Currency',
		type        : 'text',
		theme       : 'admin',
		className   : 'primary lg',
		value       : geo.country.currency.code,
		span        : 3.9,
		placeholder : 'Enter Ledger Currency',
		rules       : { required: 'Ledger Currency Name is required' },
		disabled    : true,
	},
	{
		label       : 'Ledger Amount',
		name        : 'ledAmount',
		type        : 'number',
		theme       : 'admin',
		className   : 'primary lg',
		disabled    : true,
		span        : 3.9,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount received is required' },
	},
	{
		label       : 'Description',
		name        : 'utr',
		type        : 'text',
		theme       : 'admin',
		className   : 'primary lg',
		span        : 3.9,
		placeholder : 'Enter UTR',
		rules       : { required: 'UTR is required' },
	},
	{
		name        : 'paymentMode',
		label       : 'Payment Mode',
		type        : 'select',
		span        : 3.9,
		theme       : 'admin',
		className   : 'primary md',
		placeholder : 'Select Payment Mode',
		options     : [
			{ label: 'CASH', value: 'CASH' },
			{ label: 'BANK', value: 'BANK' },
			{ label: 'RTGS', value: 'RTGS' },
			{ label: 'IMPS', value: 'IMPS' },
			{ label: 'NEFT', value: 'NEFT' },
			{ label: 'CHQ', value: 'CHQ' },
		],
		rules : { required: ' Payment Mode is Required' },
		value : 'BANK',
	},
];

interface ControlInterface {
	isEdit?:boolean
	entityType?:string
	setLedgerCurrency?: React.Dispatch<(prevState: undefined) => undefined>
	setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
	setTradeId?: React.Dispatch<(prevState: undefined) => undefined>
}

const getControls = ({
	isEdit = false,
	entityType,
	setEditMode,
	setLedgerCurrency,
	setTradeId,
}:ControlInterface) => {
	const controlsData = controls();
	return controlsData.map((control) => {
		if (control.name === 'entityType' && isEdit) {
			return {
				...control,
				value        : entityType,
				disabled     : true,
				handleChange : (e:any) => {
					setLedgerCurrency(e?.ledger_currency);
				},
			};
		}
		if (control.name === 'accMode' && isEdit) {
			return {
				...control,
				disabled: true,
			};
		}

		if (control.name === 'exchangeRate') {
			return {
				...control,
				disabled: true,
			};
		}

		if (
			isEdit
			&& (control.name === 'amount'
				|| control.name === 'currency'
				|| control.name === 'bankId'
				|| control.name === 'exchangeRate'
				|| control.name === 'paymentDate'
				|| control.name === 'paymentMode'
				|| control.name === 'docType'
				|| control.name === 'utr')
		) {
			return {
				...control,
				disabled: true,
			};
		}
		if (control.name === 'entityType') {
			return {
				...control,
				handleChange: (e) => {
					setLedgerCurrency(e?.ledger_currency);
					setEditMode(true);
				},
			};
		}
		if (control.name === 'currency' || control.name === 'bankId') {
			return {
				...control,
				handleChange: () => setEditMode(true),
			};
		}
		if (control.name === 'customerId' && isEdit) {
			return {
				...control,
				disabled     : true,
				handleChange : (e) => {
					setTradeId(e?.id);
				},
			};
		}
		if (control.name === 'customerId') {
			return {
				...control,
				handleChange: (e) => {
					setTradeId(e?.id);
				},
			};
		}
		return control;
	});
};

export default getControls;
