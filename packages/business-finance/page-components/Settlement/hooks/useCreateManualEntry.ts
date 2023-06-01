/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest, useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import getControls from '../configurations/on-account-collections/manualEntryControls';

interface SelectedInterface {
	entityType?:string,
	tradePartyMappingId?:string,
	taggedOrganizationId?:string,
	id?:string,
	paymentCode?:string,
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
	const profile = useSelector((state:any) => state.profile || {});
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

	const controls = getControls({
		isEdit,
		entityType,
		setEditMode,
		setLedgerCurrency,
		setTradeId,
		setShowBprNumber,
		itemData,
		docTypeValue,
	});
	const [processedControls, setProcessedControls] = useState(controls);

	const powerControls = (newControls, bankData) => newControls.map((controlValue) => {
		const { name } = controlValue;

		if (name === 'bankId') {
			return {
				...controlValue,
				options: (bankData.bank_details || []).map((item) => ({
					value : item.id,
					label : `${item.beneficiary_name} (${item.account_number})`,
				})),
			};
		}

		if (name === 'docType') {
			if (accountMode === 'AP') {
				const currentOptions = [...controlValue.options];
				const mutatedOptions = currentOptions.slice(1);

				return {
					...controlValue,
					options: [
						{ label: 'Payment', value: 'PAYMENT' },
						...mutatedOptions,
					],
				};
			}
			return {
				...controlValue,
				options: [...controlValue.options],
			};
		}

		return { ...controlValue };
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

	const [{ loading:exchangeLoading }, exRateTrigger] = useRequest(
		{
			url    : 'get_exchange_rate',
			method : 'get',
		},
		{ manual: false, autoCancel: false },
	);

	const [{ data }, trigger] = useRequestBf(
		{
			url     : 'purchase/payable/bank/list',
			authKey : 'get_purchase_payable_bank_list',
			method  : 'get',
		},
		{ manual: true },
	);

	const formatPayload = (payload) => {
		const newPayload = { ...payload };

		if (newPayload.paymentDate) {
			newPayload.paymentDate = formatDate({
				date       : newPayload.paymentDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
			newPayload.uploadedBy = profileName || '';
			newPayload.id = id;
		}

		const { ...rest } = newPayload || {};
		return {
			...rest,
			tradePartyMappingId  : tradePartyMappingId || venderDataValue?.id,
			taggedOrganizationId : taggedOrganizationId || venderDataValue?.organization_id,
			bankAccountNumber,
			bankName,
			paymentCode,
			createdBy            : profileId,
			updatedBy            : profileId,
			sageOrganizationId   : showBprNumber?.sage_organization_id,
		};
	};
	const onError = (errs) => {
		setErrors(errs);
	};

	const transactionDates = formatDate({
		date       : paymentDateValue,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

	const [{ loading:venderLoading }, venderApiTrigger] = useRequest(
		{
			url    : 'list_organization_trade_parties',
			method : 'get',
		},
		{ manual: true },
	);
	const vender = useCallback(async () => {
		const partyType = {
			AP : ['self', 'collection_party'],
			AR : ['self', 'paying_party'],
		};
		try {
			const resp = await venderApiTrigger({
				params: {
					filters: {
						organization_trade_party_detail_id : tpId,
						trade_party_type                   : partyType[accountMode],
					},
				},
			});

			if (isEmpty(resp.data.list[0])) {
				Toast.warn('No TradeParty Exists for the Selected Organization');
			}
			setVenderDataValue(resp.data.list[0]);
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [accountMode, tpId, venderApiTrigger]);

	useEffect(() => {
		if (tpId && accountMode) vender();
	}, [tpId, accountMode, vender]);

	useEffect(() => {
		if (errorVal) {
			onError(errorVal);
		}

		Object.keys(errors).forEach((key) => {
			if (!errorVal[key]) {
				delete errors[key];
			}
		});

		setErrors({ ...errors, ...errorVal });
	}, [JSON.stringify(errorVal), JSON.stringify(errors)]);

	useEffect(() => {
		if (isEdit) {
			controls.forEach((c) => {
				setValue(c.name, selectedItem[c.name]);
			});
			setValue('paymentDate', new Date(transactionDate));
		}
	}, []);

	const entityCode = watch('entityType');

	useEffect(() => {
		if (entityCode && !isEdit) {
			trigger({
				params: {
					entityCode,
				},
			});
		}
	}, [entityCode, isEdit, trigger]);

	const bankID = watch('bankId');

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
	}, [bankID, data, editMode]);

	useEffect(() => {
		if (entityCode && ledgerCurrency) {
			setValue('ledCurrency', ledgerCurrency);
		}
	}, [entityCode, ledgerCurrency]);

	const amountReceived = watch('amount');

	const Exchange = watch('exchangeRate');

	useEffect(() => {
		if (Exchange > 0 || amountReceived) {
			const total = amountReceived * (Exchange || 1) || 0.00;

			setValue('ledAmount', total.toFixed(2));
		}
	}, [JSON.stringify(amountReceived), JSON.stringify(Exchange)]);

	useEffect(() => {
		setProcessedControls(powerControls((controls || []), (data?.[0] || [])));
	}, [JSON.stringify(data), docTypeValue, accountMode]);

	const exchangeApi = useCallback(async () => {
		try {
			const exData = await exRateTrigger({
				params: {
					from_currency : fromCur,
					to_currency   : toCur,
					exchange_date : transactionDates,
				},
			});
			setValue('exchangeRate', exData.data.toFixed(4));
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [exRateTrigger, fromCur, toCur, transactionDates]);

	useEffect(() => {
		if (editMode) exchangeApi();
	}, [fromCur, toCur, paymentDateValue, editMode, exchangeApi]);

	const entryApi = isEdit ? updateEntryTrigger : createEntryTrigger;

	const successMessage = isEdit
		? 'Payment has been updated successfully'
		: 'Payment has been created successfully';

	const createManualEntry = async (payload, e) => {
		e.preventDefault();

		try {
			const rest = await entryApi({ data: formatPayload(payload) });

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
