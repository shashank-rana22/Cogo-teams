import getGeoConstants from '@cogoport/globalization/constants/geo';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';

import RenderTradeParty from './RenderTradeParty';

const geo = getGeoConstants();
const ALLOWABLE_ENTITY_CODES = ['101', '401', '301'];
const handleModifiedOptions = ({ options:tradeData = [] }) => {
	const opt = (tradeData || [])?.map((item) => {
		if (item?.sage_organization_id !== null) {
			return item;
		}
		return [];
	}).flat();
	return opt;
};

const controls = [
	{
		label       : 'Cogo Entity',
		name        : 'entityType',
		type        : 'async-select',
		placeholder : 'Search by Cogo Entity',
		asyncKey    : 'list_cogo_entity',
		renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
		initialCall : true,
		labelKey    : 'entity_code',
		rules       : { required: 'Required' },
		span        : 4,
	},
	{
		name        : 'accMode',
		label       : 'Account Mode',
		type        : 'select',
		placeholder : 'Select Account Mode',
		rules       : { required: true },
		value       : 'AR',
		span        : 4,
		options     : [
			{ label: 'AR', value: 'AR' },
			{ label: 'AP', value: 'AP' },
			{ label: 'CSD', value: 'CSD' },
			{ label: 'PDA', value: 'PDA' },
			{ label: 'LA', value: 'LA' },
			{ label: 'SUSA', value: 'SUSA' },
			{ label: 'SUSS', value: 'SUSS' },
			{ label: 'PC', value: 'PC' },
			{ label: 'EMD', value: 'EMD' },
			{ label: 'EMP', value: 'EMP' },
		],
	},
	{
		label       : 'Trade Party',
		name        : 'customerId',
		type        : 'async-select',
		asyncKey    : 'list_trade_parties',
		initialCall : true,
		renderLabel : (option) => <RenderTradeParty option={option} />,
		valueKey    : 'id',
		labelKey    : 'legal_business_name',
		span        : 4,
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
		maxDate               : new Date(),
		span                  : 4,
		rules                 : { required: ' Transaction Date is Required' },
	},
	{
		name        : 'docType',
		label       : 'Doc Type',
		type        : 'select',
		placeholder : 'Enter Doc Type',
		rules       : { required: true },
		span        : 4,
		options     : [{ label: 'Receipt', value: 'PAYMENT' }, { label: 'TDS', value: 'TDS' }],
	},
	{
		name         : 'bankId',
		label        : 'Cogo Bank',
		placeholder  : 'Select Cogo Bank',
		type         : 'select',
		showOptional : false,
		span         : 4,
	},
	{
		label       : 'Default Currency',
		name        : 'currency',
		type        : 'select',
		value       : geo?.country.currency.code,
		rules       : { required: 'Required' },
		span        : 4,
		options     : getCurrencyOptions(),
		placeholder : 'Select Currency',
	},
	{
		label       : 'Amount',
		name        : 'amount',
		type        : 'number',
		min         : 1,
		span        : 4,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount  is required', min: 1 },
	},

	{
		label       : 'Enter Exchange Rate',
		name        : 'exchangeRate',
		type        : 'number',
		disabled    : false,
		value       : 1,
		span        : 4,
		placeholder : 'Enter Exchange Rate',
		rules       : { required: 'Amount  is required' },
	},
	{
		name        : 'ledCurrency',
		label       : 'Ledger Currency',
		type        : 'text',
		value       : geo?.country.currency.code,
		span        : 4,
		placeholder : 'Enter Ledger Currency',
		rules       : { required: 'Ledger Currency Name is required' },
		disabled    : true,
	},
	{
		label       : 'Ledger Amount',
		name        : 'ledAmount',
		type        : 'number',
		disabled    : true,
		span        : 4,
		placeholder : 'Enter amount received',
		rules       : { required: 'Amount received is required' },
	},
	{
		label       : 'Description',
		name        : 'utr',
		type        : 'text',
		span        : 4,
		placeholder : 'Enter UTR',
		rules       : { required: 'UTR is required' },
	},
	{
		name        : 'paymentMode',
		label       : 'Payment Mode',
		type        : 'select',
		span        : 4,
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

const getControls = ({
	isEdit = false,
	entityType,
	setEditMode,
	entityValue,
	setLedgerCurrency,
	setTradeId,
	setShowBprNumber,
	itemData,
	docTypeValue,
}) => controls.map((control) => {
	const modifiedOptions = ALLOWABLE_ENTITY_CODES.includes(entityValue) ? {
		getModifiedOptions: handleModifiedOptions,
	} : {};
	const { name } = control;
	if (name === 'entityType' && isEdit) {
		return {
			...control,
			value    : entityType,
			onChange : (e, obj) => {
				setLedgerCurrency(obj?.ledger_currency);
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

	if (isEdit && ['currency', 'exchangeRate', 'docType', 'utr'].includes(name)) {
		return {
			...control,
			disabled: true,
		};
	}
	if (name === 'entityType') {
		return {
			...control,
			onChange: (e, obj) => {
				setLedgerCurrency(obj?.ledger_currency);
				setEditMode(true);
			},
		};
	}
	if (['currency', 'bankId'].includes(name)) {
		return {
			...control,
			onChange: () => setEditMode(true),
		};
	}
	if (name === 'customerId' && isEdit) {
		return {
			...control,
			disabled : true,
			...modifiedOptions,
			onChange : (e, obj) => {
				setTradeId(obj?.id);
				setShowBprNumber(obj);
			},
		};
	}
	if (name === 'customerId') {
		return {
			...control,
			...modifiedOptions,
			onChange: (e, obj) => {
				setTradeId(obj?.id);
				setShowBprNumber(obj);
			},
		};
	}
	return { ...control };
});

export default getControls;
