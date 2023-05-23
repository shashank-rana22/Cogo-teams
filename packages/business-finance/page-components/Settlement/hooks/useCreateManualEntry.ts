import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest, useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getControls from '../configurations/on-account-collections/manualEntryControls';

const useCreateManualEntry = ({
	onClose,
	isEdit = false,
	selectedItem = {},
	refetch,
	show,
}) => {
	const [errors, setErrors] = useState({});
	const { profile } = useSelector((state) => state || {});
	const [editMode, setEditMode] = useState(false);
	const [ledgerCurrency, setLedgerCurrency] = useState();
	const [tpId, setTradeId] = useState();
	const {
		orgSerialId,
		entityType,
		currency,
		exchangeRate,
		bankId,
		utr,
		amount,
		ledAmount,
		ledCurrency,
		paymentDate,
		paymentMode,
		customerId,
		tradePartyMappingId,
		taggedOrganizationId,
		id,
		accMode,
		paymentCode,
	} = selectedItem;
	const controls = getControls({
		isEdit,
		entityType,
		setEditMode,
		setLedgerCurrency,
		setTradeId,
	});
	const [processedControls, setProcessedControls] = useState(controls);
	const [fieldsData, setFieldsData] = useState({});
	const [bankDetails, setbankDetails] = useState({});
	const [vanderData, setVenderData] = useState({});
	const { bankAccountNumber, bankName } = bankDetails || {};
	const disable_controls = {
		orgSerialId  : 'orgSerialId',
		customerName : 'customerName',
	};
	const isVenderExists = tradePartyMappingId || vanderData?.id;
	const powerControls = (newControls, bankData) => newControls.map((control) => {
		if (control.name === 'bankId') {
			return {
				...control,
				options: (bankData.bank_details || []).map((item) => ({
					value : item.id,
					label : `${item.beneficiary_name} (${item.account_number})`,
				})),
			};
		}
		return { ...control };
	});

	const formatPayload = (payload) => {
		const newPayload = { ...payload };

		if (newPayload.paymentDate) {
			newPayload.paymentDate = formatDate({
				date       : newPayload.paymentDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
			newPayload.uploadedBy = profile.name || '';
			newPayload.id = id;
		}

		const { ...rest } = newPayload || {};
		return {
			...rest,
			tradePartyMappingId  : tradePartyMappingId || vanderData?.id,
			taggedOrganizationId : taggedOrganizationId || vanderData?.organization_id,
			bankAccountNumber,
			bankName,
			paymentCode,
			createdBy            : profile?.id,
			updatedBy            : profile?.id,
		};
	};
	const onError = (errs) => {
		setErrors(errs);
	};

	const formProps = useForm(processedControls);
	const {
		setValues,
		watch,
		fields,
		control,
		setValue,
		handleSubmit,
		formState: { errors: errorVal },
	} = formProps;

	const formValues = watch();

	const {
		currency: from_cur,
		ledCurrency: to_cur,
		accMode: accountMode,
		paymentDate: payment_date,
		docType: doc_type,
	} = formValues || {};

	const transactionDates = formatDate({
		date       : payment_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});
	useEffect(() => {
		const newFileds = { ...fields };
		if (newFileds.exchangeRate && from_cur === to_cur) {
			newFileds.exchangeRate.disabled = true;
		}

		setFieldsData(newFileds);
		if (editMode) exchangeApi();
	}, [from_cur, to_cur, payment_date]);

	const partyType = {
		AP : ['self', 'collection_party'],
		AR : ['self', 'paying_party'],
	};

	const [{ data:venderData }, venderApiTrigger] = useRequest(
		{
			url    : 'list_organization_trade_parties',
			method : 'get',
		},
		{ manual: true },
	);
	const vender = async () => {
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
			setVenderData(resp.data.list[0]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (tpId && accountMode) vender();
	}, [tpId, accountMode]);
	const paymentM = watch('paymentMode');

	useEffect(() => {
		const newFileds = { ...fields };
		if (newFileds.paymentDate) {
			newFileds.paymentDate.maxDate =	paymentM === 'CHQ' ? undefined : new Date();
		}
		setFieldsData(newFileds);
	}, [paymentM]);

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
	}, [JSON.stringify(errorVal)]);

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

	useEffect(() => {
		if (isEdit) {
			setValues({
				orgSerialId,
				entityType: String(entityType),
				bankId,
				currency,
				utr,
				amount,
				paymentDate,
				paymentMode,
				ledCurrency,
				customerId,
				ledAmount,
				tradePartyMappingId,
				exchangeRate,
				accMode,
				docType,
			});
		}
	}, [isEdit]);

	const entityCode = watch('entityType');

	const [{ data }, trigger] = useRequestBf(
		{
			url     : 'purchase/payable/bank/list',
			authKey : 'get_purchase_payable_bank_list',
			method  : 'get',
		},
		{ manual: true },
	);
	useEffect(() => {
		if (entityCode && !isEdit) {
			trigger({
				params: {
					entityCode,
				},
			});
		}
	}, [entityCode]);

	const bankID = watch('bankId');

	useEffect(() => {
		if (bankID && data) {
			const findBankById = data[0].bank_details.find((item) => item.id === bankID) || {};

			const {
				currency: bankCurr = '',
				beneficiary_name = '',
				account_number = '',
			} = findBankById || {};
			if (editMode) setValue('currency', bankCurr);

			setbankDetails({
				bankAccountNumber : account_number,
				bankName          : beneficiary_name,
			});
		}
	}, [bankID, data]);

	useEffect(() => {
		if (entityCode && ledgerCurrency) {
			setValue('ledCurrency', ledgerCurrency);
		}
	}, [entityCode]);

	const amountReceived = watch('amount');
	const Exchange = watch('exchangeRate');
	useEffect(() => {
		if (Exchange > 0 || amountReceived) {
			const total = amountReceived * (Exchange || 1);
			setValue('ledAmount', total.toFixed(2));
		}
	}, [amountReceived, Exchange]);

	useEffect(() => {
		setProcessedControls(powerControls(controls || [], data?.[0] || []));
		const newFileds = { ...fields };
		if (newFileds.bankId) {
			newFileds.bankId.options = (data?.[0].bank_details || []).map((item) => ({
				value : item.id,
				label : `${item.beneficiary_name} (${item.account_number})`,
			}));
		}
		if (newFileds.docType) {
			if (doc_type === 'TDS') {
				newFileds.bankId.disabled = true;
				setValue('bankId', undefined);
				setbankDetails({});
			}
			newFileds.paymentMode.disabled = doc_type === 'TDS';
		}

		// if (accountMode === 'AP') {
		// 	const currentOptions = [...newFileds.docType.options];
		// 	const mutatedOptions = currentOptions.slice(1);
		// 	newFileds.docType.options = [
		// 		{ label: 'Payment', value: 'PAYMENT' },
		// 		...mutatedOptions,
		// 	];
		// 	const [firstObj] = newFileds.docType.options;
		// 	if (isEmpty(doc_type)) {
		// 		setValue('docType', firstObj.value);
		// 	}
		// } else {
		// 	newFileds.docType.options = [...newFileds.docType.options];
		// 	const [firstObj] = newFileds.docType.options;
		// 	const prefilledValue = firstObj.value;
		// 	if (isEmpty(doc_type)) {
		// 		setValue('docType', prefilledValue);
		// 	}
		// }

		setFieldsData(newFileds);
	}, [data, doc_type, accountMode, from_cur]);

	const [{ data:createData }, createEntryTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'post_payments_accounts',
			method  : 'post',
		},
		{ manual: true },
	);

	const [{ data:updateData }, updateEntryTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'put_payments_accounts',
			method  : 'put',
		},
		{ manual: true },
	);

	const [{ data:exRateData }, exRateTrigger] = useRequestBf(
		{
			url    : 'get_exchange_rate',
			method : 'get',
		},
		{ manual: false },
	);
	const exchangeApi = async () => {
		try {
			const exData = await exRateTrigger({
				params: {
					from_currency : from_cur,
					to_currency   : to_cur,
					exchange_date : transactionDates,
				},
			});
			setValue('exchangeRate', exData.data.toFixed(4));
		} catch (error) {
			console.log(error);
		}
	};
	const entryApi = isEdit ? updateEntryTrigger : createEntryTrigger;
	const successMessage = isEdit
		? 'Payment has been updated successfully'
		: 'Payment has been created successfully';

	const createManualEntry = async (payload, e) => {
		e.preventDefault();

		try {
			const rest = await entryApi({ data: formatPayload(payload) });

			onClose();

			if (!rest.data.isSuccess) {
				Toast.error('Something went wrong');
			} else {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			if (err?.data) {
				Toast.error(flattenErrorToString(err?.data) || 'Something went wrong');
			}
		}
	};

	return {
		formProps : { fields: { ...fieldsData } },
		controls  : processedControls,
		createManualEntry,
		control,
		onError,
		handleSubmit,
		errors,
		loading   : entryApi.loading,
		disable_controls,
		exRateTrigger,
		accountMode,
		isVenderExists,
	};
};

export default useCreateManualEntry;
