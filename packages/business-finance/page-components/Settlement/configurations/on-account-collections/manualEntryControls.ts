import getGeoConstants from '@cogoport/globalization/constants/geo';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';

const geo = getGeoConstants();

const controls = () => [
	{
		label       : 'Cogo Entity',
		name        : 'entityType',
		type        : 'async-select',
		placeholder : 'Search by Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		initialCall : true,
		rules       : { required: 'Required' },
		span        : 3.9,
	},
	{
		name        : 'accMode',
		label       : 'Account Mode',
		type        : 'select',
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
		label       : 'Trade Party',
		name        : 'customerId',
		type        : 'async-select',
		asyncKey    : 'list_trade_parties',
		initialCall : true,
		valueKey    : 'legal_business_name',
		span        : 3.9,
		placeholder : 'Enter Trade Party Name',
		rules       : { required: 'Trade Party is required' },
	},
	{
		label                 : 'Transaction Date',
		name                  : 'paymentDate',
		type                  : 'date_picker',
		placeholder           : 'Transaction Date',
		isPreviousDaysAllowed : true,
		value                 : new Date(),
		span                  : 3.9,
		rules                 : { required: ' Transaction Date is Required' },
	},
	{
		name        : 'docType',
		label       : 'Doc Type',
		type        : 'select',
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
		placeholder  : 'Select Cogo Bank',
		type         : 'select',
		showOptional : false,
		span         : 3.9,
	},
	{
		label       : 'Default Currency',
		name        : 'currency',
		type        : 'select',
		value       : geo.country.currency.code,
		rules       : { required: 'Required' },
		span        : 3.9,
		options     : getCurrencyOptions(),
		placeholder : 'Select Currency',
	},
	{
		label       : 'Amount Received',
		name        : 'amount',
		type        : 'number',
		min         : 1,
		span        : 3.9,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount received is required', min: 1 },
	},

	{
		label       : 'Enter Exchange Rate',
		name        : 'exchangeRate',
		type        : 'number',
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
		disabled    : true,
		span        : 3.9,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount received is required' },
	},
	{
		label       : 'Description',
		name        : 'utr',
		type        : 'text',
		span        : 3.9,
		placeholder : 'Enter UTR',
		rules       : { required: 'UTR is required' },
	},
	{
		name        : 'paymentMode',
		label       : 'Payment Mode',
		type        : 'select',
		span        : 3.9,
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
	setShowBprNumber?: any
	itemData?:{
		bankName?:string
		transactionDate?:Date
		payMode?:string
	}
	setValue?: any
	setBankDetails?: React.Dispatch<React.SetStateAction<any>>
	docTypeValue?:string
	accountMode?:string
}

const getControls = ({
	isEdit = false,
	entityType,
	setEditMode,
	setLedgerCurrency,
	setTradeId,
	setShowBprNumber,
	itemData,
	docTypeValue,
}:ControlInterface) => {
	const controlsData = controls();
	return controlsData.map((control) => {
		const { name } = control;
		if (name === 'entityType' && isEdit) {
			return {
				...control,
				value    : entityType,
				onChange : (e) => {
					setLedgerCurrency(e?.ledger_currency);
				},
			};
		}
		if (['docType', 'bankId', 'paymentMode'].includes(name)) {
			if (docTypeValue === 'TDS') {
				if (name === 'bankId') {
					return {
						...control,
						disabled: true,
					};
				}
				if (name === 'paymentMode') {
					return {
						...control,
						disabled: true,
					};
				}
			}
		}

		if (name === 'bankId' && isEdit) {
			return {
				...control,
				value: itemData?.bankName,
			};
		}

		if (name === 'paymentDate' && isEdit) {
			return {
				...control,
				value: itemData?.transactionDate,
			};
		}
		if (name === 'paymentMode' && isEdit) {
			return {
				...control,
				value: itemData?.payMode,
			};
		}
		if (name === 'accMode' && isEdit) {
			return {
				...control,
				disabled: true,
			};
		}

		if (name === 'exchangeRate') {
			return {
				...control,
				disabled: true,
			};
		}

		if (
			isEdit
			&& (name === 'currency'
				|| name === 'exchangeRate'
				|| name === 'docType'
				|| name === 'utr')
		) {
			return {
				...control,
				disabled: true,
			};
		}
		if (name === 'entityType') {
			return {
				...control,
				onChange: (e) => {
					setLedgerCurrency(e?.ledger_currency);
					setEditMode(true);
				},
			};
		}
		if (name === 'currency' || name === 'bankId') {
			return {
				...control,
				onChange: () => setEditMode(true),
			};
		}
		if (name === 'customerId' && isEdit) {
			return {
				...control,
				disabled : true,
				onChange : (e) => {
					setTradeId(e?.id);
					setShowBprNumber(e);
				},
			};
		}
		if (name === 'customerId') {
			return {
				...control,
				onChange: (e) => {
					setTradeId(e?.id);
					setShowBprNumber(e);
				},
			};
		}
		return { ...control };
	});
};

export default getControls;
