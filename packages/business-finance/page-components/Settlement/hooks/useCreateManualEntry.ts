import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useMemo, useState } from 'react';

import getControls from '../configurations/on-account-collections/manualEntryControls';

import { formatPayload, powerControls } from './helper';
import useExchangeRate from './useExchangeRate';
import useVender from './useVender';

interface SelectedInterface {
	entityType?:string
	tradePartyMappingId?:string
	taggedOrganizationId?:string
	id?:string
	paymentCode?:string
	transactionDate?:Date
}

interface BankInterface {
	bankAccountNumber?:string
	bankName?:string
}
const useCreateManualEntry = ({
	setShowModal,
	isEdit = false,
	selectedItem = {},
	refetch,
	itemData,
}) => {
	const [errors, setErrors] = useState({});
	const profile = useSelector((state:{ profile?:{ user?:{ id?:string, name?:string } } }) => state.profile || {});
	const { id:profileId = '', name:profileName = '' } = profile?.user || {};
	const [editMode, setEditMode] = useState(false);
	const [showBprNumber, setShowBprNumber] = useState({ sage_organization_id: '' });
	const [ledgerCurrency, setLedgerCurrency] = useState();
	const [tpId, setTradeId] = useState();
	const {
		entityType,
		tradePartyMappingId,
		taggedOrganizationId,
		id,
		paymentCode,
		transactionDate,
	}:SelectedInterface = selectedItem;

	const [bankDetails, setBankDetails] = useState<BankInterface>();
	const [venderDataValue, setVenderDataValue] = useState({ id: '', organization_id: '' });
	const { bankAccountNumber, bankName } = bankDetails || {};
	const isVenderExists = tradePartyMappingId || venderDataValue?.id;
	const formProps = useForm();
	const {
		watch,
		control,
		setValue,
		handleSubmit,
		formState: { errors: errorVal },
	} = formProps;

	const formValues = watch();

	const {
		currency: fromCur,
		ledCurrency: toCur,
		accMode: accountMode,
		paymentDate: paymentDateValue,
		docType: docTypeValue,
	} = formValues || {};

	const controls = useMemo(() => getControls({
		isEdit,
		entityType,
		setEditMode,
		setLedgerCurrency,
		setTradeId,
		setShowBprNumber,
		itemData,
		docTypeValue,
	}), [docTypeValue, entityType, isEdit, itemData]);
	const [processedControls, setProcessedControls] = useState(controls);

	const { vender, venderLoading } = useVender({ setVenderDataValue, tpId, accountMode });

	const { exRateTrigger, exchangeApi, exchangeLoading } = useExchangeRate({
		paymentDateValue,
		fromCur,
		toCur,
		setValue,
	});

	const [{ loading:createLoading }, createEntryTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'post_payments_accounts',
			method  : 'post',
		},
		{ manual: true },
	);
	const [{ loading:updateLoading }, updateEntryTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'put_payments_accounts',
			method  : 'put',
		},
		{ manual: true },
	);
	const [{ data }, trigger] = useRequestBf(
		{
			url     : 'purchase/payable/bank/list',
			authKey : 'get_purchase_payable_bank_list',
			method  : 'get',
		},
		{ manual: true },
	);

	const onError = (errs) => {
		setErrors(errs);
	};

	const entityCode = watch('entityType');
	const bankID = watch('bankId');
	const amountReceived = watch('amount');
	const Exchange = watch('exchangeRate');
	const entryApi = isEdit ? updateEntryTrigger : createEntryTrigger;
	const successMessage = isEdit ? 'Payment has been updated successfully' : 'Payment has been created successfully';

	let docType = '';
	switch (paymentCode) {
		case 'REC':
		case 'PAY':
			docType = 'PAYMENT';
			break;
		case 'CTDSP':
		case 'CTDS':
		case 'VTDS':
			docType = 'TDS';
			break;
		default:
			break;
	}

	const createManualEntry = async (payload, e) => {
		e.preventDefault();
		try {
			const rest = await entryApi({
				data: formatPayload(
					payload,
					profileName,
					id,
					tradePartyMappingId,
					venderDataValue,
					taggedOrganizationId,
					bankAccountNumber,
					bankName,
					paymentCode,
					profileId,
					showBprNumber,
				),
			});
			setShowModal({ manual_entry: false });
			if (!rest.data.isSuccess) {
				Toast.error('Something went wrong');
			} else {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	useEffect(() => {
		if (tpId && accountMode) vender();
	}, [tpId, accountMode, vender]);

	const jsonErrorVal = JSON.stringify(errorVal);
	const jsonErr = JSON.stringify(errors);

	useEffect(() => {
		const jsonError = JSON.parse(jsonErrorVal);
		const val = JSON.parse(jsonErr);
		if (jsonError) {
			onError(jsonError);
		}

		Object.keys(val).forEach((key) => {
			if (!jsonError[key]) {
				delete val[key];
			}
		});

		setErrors({ ...val, ...jsonError });
	}, [jsonErrorVal, jsonErr]);

	useEffect(() => {
		if (isEdit) {
			controls.forEach((c) => {
				setValue(c.name, selectedItem[c.name]);
			});
			setValue('paymentDate', new Date(transactionDate));
			setValue('docType', docType);
		}
	}, [controls, docType, isEdit, selectedItem, setValue, transactionDate]);

	useEffect(() => {
		if (entityCode && !isEdit) {
			trigger({
				params: {
					entityCode,
				},
			});
		}
	}, [entityCode, isEdit, trigger]);

	useEffect(() => {
		if (Exchange > 0 || amountReceived) {
			const total = amountReceived * (Exchange || 1) || 0.00;

			setValue('ledAmount', total.toFixed(2));
		}
	}, [amountReceived, Exchange, setValue]);

	useEffect(() => {
		if (bankID && data) {
			const findBankById = data[0].bank_details.find((item) => item.id === bankID) || {};

			const {
				currency: bankCurr = '',
				beneficiary_name:bankNameData = '',
				account_number:bankAccount = '',
			} = findBankById || {};
			if (editMode) setValue('currency', bankCurr);

			setBankDetails({
				bankAccountNumber : bankAccount,
				bankName          : bankNameData,
			});
		}
	}, [bankID, data, editMode, setValue]);

	useEffect(() => {
		if (entityCode && ledgerCurrency) {
			setValue('ledCurrency', ledgerCurrency);
		}
	}, [entityCode, ledgerCurrency, setValue]);

	useEffect(() => {
		setProcessedControls(powerControls((controls || []), (data?.[0] || []), accountMode));
	}, [docTypeValue, accountMode, controls, data]);

	useEffect(() => {
		if (editMode) exchangeApi();
	}, [fromCur, toCur, paymentDateValue, editMode, exchangeApi]);

	return {
		controls : processedControls,
		createManualEntry,
		control,
		onError,
		handleSubmit,
		errors,
		loading  : createLoading || updateLoading,
		exRateTrigger,
		accountMode,
		showBprNumber,
		isVenderExists,
		exchangeLoading,
		venderLoading,
	};
};
export default useCreateManualEntry;
