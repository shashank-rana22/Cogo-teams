import { Toast, Checkbox } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import changeFormat from '../utils/changeFormat';
import checkboxSelectionChecks from '../utils/checkboxSelectionChecks';
import getConfig from '../utils/getConfig';
import getKeyByValue from '../utils/getKeyByValue';
import getSelectedInvoice from '../utils/getSelectedInvoice';
import onClearingFilters from '../utils/onClearingFilters';
import onGoingBack from '../utils/onGoingBack';
import settingApiData from '../utils/settingApiData';

import styles from './styles.module.css';

const API_ARRAY_VARIABLE_ONE = 1;
const ELEMENT_NOT_FOUND = -1;

const useGetInvoiceSelection = ({ sort = {} }) => {
	const { push } = useRouter();
	const { query: urlQuery, performedBy, performedByType, performedByName } = useSelector(({ general, profile }) => ({
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
			url: '/purchase/payable-bill/list', method: 'get', authKey: 'get_purchase_payable_bill_list',
		},
		{ manual: false },
	);
	const listSelectedInvoice =	useRequestBf(
		{
			url: '/purchase/payrun-bill', method: 'get', authKey: 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);
	const addInvoiceToSelectedAPI = useRequestBf(
		{
			url: '/purchase/payrun', method: 'post', authKey: 'post_purchase_payrun',
		},
		{ manual: false },
	);
	const delete_payrun_invoice = 	useRequestBf(
		{
			url: '/purchase/payrun-bill', method: 'delete', authKey: 'delete_purchase_payrun_bill',
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
	const sortParse = JSON.stringify(sort);

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
				...(JSON.parse(sortParse) || {}),
			},
		});
	}, [restParse, dueDate, invoiceDate, updatedDate, query, category, sortParse, trigger,
		entity, organizationId, payrun, performedBy, performedByName, performedByType, queryCurr, services]);

	const deleteInvoices = async (id, handleModal) => {
		try {
			await delete_payrun_invoice.trigger({ data: { id, performedBy, performedByType, performedByName } });
			handleModal();
			Toast.success('Invoice deleted successfully');
			refetch();
		} catch (e) { toastApiError(e); }
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
			} else { Toast.success('Invoice added to Payrun Successfully'); refetch(); }
		} catch (e) { toastApiError(e); }
		return null;
	};
	useEffect(() => { refetch(); }, [refetch]);

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((prevData) => {
			const { list = [] } = prevData || {};
			const newList = list.map((item) => {
				const isError = checkboxSelectionChecks(item);
				return ({
					...item,
					checked  : item?.invoiceType === 'CREDIT NOTE' ? false : event.target.checked,
					hasError : isError,
				});
			});
			return { ...prevData, list: newList };
		});
	};

	function GetTableHeaderCheckbox() {
		const { list = [] } = apiData || {};
		const { list: dataList = [] } = data || {};
		const isCheckedLength = list.filter((value) => value?.checked).length;
		const invoicesLength = dataList?.filter((val) => (val.invoiceType !== 'CREDIT NOTE'))?.length;
		const isAllRowsChecked = isCheckedLength === invoicesLength;
		return (
			<Checkbox checked={isAllRowsChecked && !loading} onChange={onChangeTableHeaderCheckbox} />
		);
	}

	const onChangeTableBodyCheckbox = (itemData) => {
		const { id = '' } = itemData || {};
		setApiData((prevData) => {
			const index = (prevData.list || []).findIndex((item) => item.id === id);
			if (index !== ELEMENT_NOT_FOUND) {
				const newList = [...prevData.list];
				const isError = checkboxSelectionChecks(newList[index]);
				newList[index] = { ...newList[index], checked: !newList[index].checked, hasError: isError };
				return { ...prevData, list: newList };
			}
			return prevData;
		});
	};

	function GetTableBodyCheckbox(itemData) {
		const { id = '' } = itemData || {};
		const { list = [] } = apiData || {};
		const isChecked = list.find((item) => item?.id === id)?.checked;
		return (
			<div className={styles.checkbox_style}>
				{itemData?.invoiceType === 'CREDIT NOTE' ? null : (
					<Checkbox checked={isChecked} onChange={() => onChangeTableBodyCheckbox(itemData)} />
				)}
			</div>
		);
	}

	const setEditedValue = (itemData, value, key, checked = false) => {
		settingApiData(itemData, value, key, checked, setApiData);
	};
	const onClear = () => { onClearingFilters(setGlobalFilters, entity, queryCurr); };
	const goBack = () => { onGoingBack(viewSelectedInvoice, setViewSelectedInvoice, push); };

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
