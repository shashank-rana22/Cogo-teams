import { Toast, Checkbox } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import { VIEW_SELECTED_CONFIG } from '../CreatePayrun/Configurations/viewSelectedConfig';
import { VIEW_SELECTED_CONFIG_VN } from '../CreatePayrun/Configurations/viewSelectedConfigVN';
import { CREATE_OVER_SEAS_CONFIG } from '../OverSeasAgent/Configurations/createOverSeasConfig';
import { CREATE_OVER_SEAS_CONFIG_VN } from '../OverSeasAgent/Configurations/createOverSeasConfigVN';
import getKeyByValue from '../utils/getKeyByValue';

const API_ARRAY_VARIABLE_ONE = 1;
const INCREEMENT_BY = 1;
const MIN_AMOUNT = 0;
const ELEMENT_NOT_FOUND = -1;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

const CREATE_OVERSEAS_CONFIG_MAPPING = {
	IN : CREATE_OVER_SEAS_CONFIG,
	VN : CREATE_OVER_SEAS_CONFIG_VN,
};

const VIEW_SELECTED_CONFIG_MAPPING = {
	IN : VIEW_SELECTED_CONFIG,
	VN : VIEW_SELECTED_CONFIG_VN,
};

function getConfig(country, viewSelectedInvoice) {
	const createOverSeasConfig = CREATE_OVERSEAS_CONFIG_MAPPING[country];
	const viewSelectedConfig = VIEW_SELECTED_CONFIG_MAPPING[country];
	return (viewSelectedInvoice
		? viewSelectedConfig
		: createOverSeasConfig);
}

function changeFormat(time) {
	return formatDate({
		date: time,
		dateFormat:
					GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});
}

const onClearing = (setGlobalFilters, entity, queryCurr) => {
	setGlobalFilters({
		pageIndex   : 1,
		pageSize    : 20,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});
};

const goGoingBack = (viewSelectedInvoice, setViewSelectedInvoice, push) => {
	if (!viewSelectedInvoice) {
		push(
			'/business-finance/account-payables/[active_tab]',
			'/business-finance/account-payables/invoices',
		);
	} else setViewSelectedInvoice(false);
};

const getSelectedInvoice = (list) => {
	const SELECTED_INVOICE = [];

	for (let i = 0; i < list.length; i += INCREEMENT_BY) {
		const data = list?.[i];

		const {
			tdsAmount = 0,
			checked = false,
			id = '',
			bankDetail = undefined,
			invoiceNumber = ' ',
			inputAmount = 0,
			invoiceType,
		} = data ?? {};

		if (checked) {
			if (!bankDetail) { return toastApiError(`Select Bank for Invoice Number ${invoiceNumber}`); }

			const {
				bank_account_number = '',
				accountNo = '',
				bankName = '',
				branchName = '',
				ifscCode = '',
				ifsc_number = '',
				branch_name = '',
				bank_name = '',
				imageUrl = '',
				bankId,
				beneficiaryName,
			} = bankDetail || {};

			const formattedBank = {
				bankName        : bank_name || bankName,
				branchName      : branch_name || branchName,
				ifscCode        : ifsc_number || ifscCode,
				accountNo       : bank_account_number || accountNo,
				beneficiaryName : beneficiaryName || undefined,
				imageUrl,
				bankId,
			};

			SELECTED_INVOICE.push({
				billId        : id,
				tdsAmount     : +tdsAmount,
				payableAmount : +inputAmount,
				bankDetail    : formattedBank,
				invoiceType,
			});
		}
	}

	return SELECTED_INVOICE;
};

const settingApiData = (itemData, value, key, checked, setApiData) => {
	setApiData((prevApiData) => {
		const newValue = { ...prevApiData };
		const index = newValue?.list?.findIndex(
			(item) => item?.id === itemData?.id,
		);
		const {
			payableValue,
			invoiceAmount,
			tdsDeducted,
			payableAmount,
			tdsAmount,
		} = newValue.list[index];
		const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;

		let maxValueCrossed = false;
		let lessValueCrossed = false;
		let lessTdsValueCrossed = false;
		let maxTdsValueCrossed = false;

		if (key === 'payableAmount') {
			maxValueCrossed = +value > +payableValue;
			lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
		} else if (key === 'tdsAmount') {
			maxValueCrossed = +payableAmount > +payableValue;
			lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +value + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(value, 10) < MIN_AMOUNT;

			newValue.list[index].payableAmount = payableValue - value;
			newValue.list[index].inputAmount = payableValue - value;
		} else {
			maxValueCrossed = +payableAmount > +payableValue;
			lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
		}

		const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;

		if (index !== ELEMENT_NOT_FOUND) {
			newValue.list[index] = {
				...itemData,
				hasError: isError,
				checked,
			};
			newValue.list[index][key] = value;
		}
		return newValue;
	});
};

const useGetInvoiceSelection = ({ sort }) => {
	const { push } = useRouter();

	const {
		query: urlQuery,
		performedBy,
		performedByType,
		performedByName,
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.user.id,
		performedByType : profile.session_type,
		performedByName : profile.user.name,
	}));

	const [apiData, setApiData] = useState({});
	const [apiTdsData, setApiTdsData] = useState({});
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);

	const {
		entity = '', currency: queryCurr = '', payrun = '', organizationId = '',
		services = '', payrun_type = '', partner_id = '',
	} = urlQuery || {};

	const country = getKeyByValue(GLOBAL_CONSTANTS.country_entity_ids, partner_id);
	const config = getConfig(country, viewSelectedInvoice);

	const listInvoices = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ manual: false },
	);

	const listSelectedInvoice =	useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const addInvoiceToSelectedAPI = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: false },
	);

	const delete_payrun_invoice = 	useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const api = viewSelectedInvoice ? listSelectedInvoice : listInvoices;
	const [{ data, loading }, trigger] = api || [];
	const { query = '', debounceQuery } = useDebounceQuery();
	const [globalFilters, setGlobalFilters] = useState({
		pageIndex   : 1,
		pageSize    : 10,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});
	const { search, dueDate, invoiceDate, updatedDate, category, ...rest } = globalFilters;
	const restParse = JSON.stringify(rest);

	useEffect(() => {
		const newData = { ...data };
		if (newData.list) {
			newData.list = newData?.list?.map((item) => ({
				...item,
				payableValue       : item?.payableAmount,
				tdsValue           : item?.tdsAmount,
				inputAmount        : item?.payableAmount,
				constPayableAmount : item?.invoiceAmount,
			}));
		}

		setApiData(newData);
		setApiTdsData(newData);
	}, [data]);

	useEffect(() => { debounceQuery(search); }, [search, debounceQuery]);
	const refetch = useCallback(() => {
		const q = query || undefined;

		trigger({
			params: {
				payrunId           : payrun,
				entityCode         : entity,
				currency           : queryCurr,
				performedBy,
				performedByType,
				performedByName,
				organizationId,
				services,
				category           : category || undefined,
				...(JSON.parse(restParse) || {}),
				startDate          : changeFormat(dueDate?.startDate) || undefined,
				endDate            : changeFormat(dueDate?.endDate) || undefined,
				fromBillDate       : changeFormat(invoiceDate?.startDate) || undefined,
				toBillDate         : changeFormat(invoiceDate?.endDate) || undefined,
				fromUploadBillDate : changeFormat(updatedDate?.startDate) || undefined,
				toUploadBillDate   : changeFormat(updatedDate?.endDate) || undefined,
				q,
				...sort,
			},
		});
	}, [restParse, dueDate, invoiceDate, updatedDate, query, category, sort, trigger,
		entity, organizationId, payrun, performedBy, performedByName, performedByType, queryCurr, services]);

	const deleteInvoices = async (id, handleModal) => {
		try {
			await delete_payrun_invoice.trigger({
				data: { id, performedBy, performedByType, performedByName },
			});
			handleModal();
			Toast.success('Invoice deleted successfully');
			refetch();
		} catch (e) {
			toastApiError(e);
		}
	};
	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData ?? {};
		const SELECTED_INVOICE = getSelectedInvoice(list);

		try {
			const res = await addInvoiceToSelectedAPI[API_ARRAY_VARIABLE_ONE]({
				data: {
					list       : [...SELECTED_INVOICE],
					id         : urlQuery?.payrun,
					entityCode : urlQuery?.entity,
					currency   : urlQuery?.currency,
					performedBy,
					performedByType,
					performedByName,
				},
			});
			if (res?.data?.message) {
				toastApiError(res.data.message);
			} else {
				Toast.success('Invoice added to Payrun Successfully');
				refetch();
			}
		} catch (e) {
			toastApiError(e);
		}
		return null;
	};
	useEffect(() => {
		refetch();
	}, [refetch]);

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((p) => {
			const newValue = { ...p };
			const len = newValue?.list?.length || MIN_AMOUNT;
			for (let i = 0; i < len; i += INCREEMENT_BY) newValue.list[i].checked = event;
			return newValue;
		});
	};
	function GetTableHeaderCheckbox() {
		const isCheckedLength = apiData?.list?.filter((value) => value?.checked)?.length;
		const isAllRowsChecked = isCheckedLength === api?.data?.list?.length;
		const isSemiRowsChecked = isCheckedLength > MIN_AMOUNT;

		return (
			<Checkbox
				themeType="white"
				indeterminate={!!isSemiRowsChecked && !api?.loading}
				checked={isAllRowsChecked && !api?.loading}
				onChange={(x) => onChangeTableHeaderCheckbox(x)}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (itemData) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex((item) => item?.id === itemData?.id);
			if (index !== ELEMENT_NOT_FOUND) {
				newValue.list[index] = { ...itemData, checked: !itemData?.checked };
			}
			return newValue;
		});
	};

	function GetTableBodyCheckbox(itemData) {
		const isChecked = apiData?.list?.find(
			(item) => item?.id === itemData?.id,
		).checked;

		return (
			<Checkbox
				themeType="white"
				checked={isChecked}
				onChange={() => onChangeTableBodyCheckbox(itemData)}
			/>
		);
	}

	const setEditedValue = (itemData, value, key, checked = false) => {
		settingApiData(itemData, value, key, checked, setApiData);
	};
	const onClear = () => { onClearing(setGlobalFilters, entity, queryCurr); };
	const goBack = () => { goGoingBack(viewSelectedInvoice, setViewSelectedInvoice, push); };

	return {
		config,
		refetch,
		invoiceData   : apiData,
		tdsData       : apiTdsData,
		createloading : addInvoiceToSelectedAPI?.loading,
		onClear,
		listSelectedInvoice,
		globalFilters,
		setGlobalFilters,
		viewSelectedInvoice,
		setViewSelectedInvoice,
		submitSelectedInvoices,
		goBack,
		GetTableHeaderCheckbox,
		GetTableBodyCheckbox,
		setEditedValue,
		delete_payrun_invoice,
		deleteInvoices,
		loading,
		payrun_type,
		currency      : urlQuery?.currency,
	};
};

export default useGetInvoiceSelection;
