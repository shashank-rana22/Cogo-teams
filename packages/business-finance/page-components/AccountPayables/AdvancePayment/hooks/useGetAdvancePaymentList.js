import { Toast, Checkbox } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css';

const useGetAdvancePaymentList = ({
	activeEntity,
	sort,
	viewSelectedInvoice,
}) => {
	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user, session_type: sessionType } = UserData;
	const { id: userId = '', name } = user || {};
	const [filters, setFilters] = useState({
		search       : undefined,
		service      : undefined,
		documentType : undefined,
		dateRange    : { startDate: undefined, endDate: undefined },
		pageIndex    : 1,
	});
	const [apiData, setApiData] = useState({ list: [] });

	const { search, service, documentType, dateRange, pageIndex } = filters || {};
	const { startDate = '', endDate = '' } = dateRange;
	const { query = '', debounceQuery } = useDebounceQuery();
	const { query: urlQuery } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const {
		entity = '',
		currency,
		payrun = '',
		selectedPayRunId = '',
	} = urlQuery || {};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/advance-document/list',
			method  : 'get',
			authKey : 'get_purchase_advance_document_list',
		},
		{ manual: true, autoCancel: false },
	);

	const [
		{ data: selectedData, loading: selectedDataLoading },
		addToSelectedTrigger,
	] = useRequestBf(
		{
			url     : 'purchase/payrun/advance-payment',
			method  : 'post',
			authKey : 'post_purchase_payrun_advance_payment',
		},
		{ manual: true, autoCancel: false },
	);

	const [
		{ data: viewSelectedData, loading: viewSelectedDataLoading },
		viewSelectedTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill/advance-payment',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_advance_payment',
		},
		{ manual: true, autoCancel: false },
	);

	const [
		{ data: deleteSelectedInvoice, loading: deleteSelecteInvoiceLoading },
		deleteSelectedInvoiceTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_bill',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		const newData = { ...data };
		const { list = [] } = newData || {};
		if (newData.list) {
			newData.list = list.map((item) => {
				const {
					payableAmount = '',
					tdsAmount = '',
					invoiceAmount = '',
				} = item || {};
				return {
					...item,
					payableValue       : payableAmount,
					tdsValue           : tdsAmount,
					inputAmount        : payableAmount,
					constPayableAmount : invoiceAmount,
				};
			});
		}
		setApiData(newData);
	}, [data]);

	const getAdvancedPayment = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex,
						pageSize            : 10,
						hasPayrun           : false,
						q                   : query !== '' ? query : undefined,
						entityCode          : activeEntity || entity,
						serviceType         : service || undefined,
						advanceDocumentType : documentType || undefined,
						startDate           : startDate && endDate
							? format(startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false) : undefined,

						endDate: endDate && startDate
							? format(endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false) : undefined,
						currency,
						...sort,
					},
				});
			} catch (err) {
				console.log(err?.response?.data?.message);
			}
		})();
	}, [
		query,
		trigger,
		activeEntity,
		service,
		pageIndex,
		sort,
		entity,
		currency,
		documentType,
		startDate,
		endDate,
	]);

	useEffect(() => {
		if (
			viewSelectedInvoice === false
            || viewSelectedInvoice === undefined
		) {
			getAdvancedPayment();
			setApiData({ list: [] });
		}
	}, [
		getAdvancedPayment,
		activeEntity,
		service,
		entity,
		query,
		sort,
		pageIndex,
		viewSelectedInvoice,
	]);

	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData || {};
		const SELECTED_INVOICES = [];

		list.forEach((addToSelectdata) => {
			const {
				checked = false,
				advanceDocumentId = '',
				jobNumber = '',
				advanceDocumentSellerBankDetail = undefined,
				invoiceNumber = ' ',
				payableAmount,
			} = addToSelectdata || {};

			if (checked) {
				if (!advanceDocumentSellerBankDetail) {
					Toast.error(
						`Select Bank for Invoice Number ${invoiceNumber}`,
					);
					return;
				}

				const {
					accountNumber = '',
					bankName = '',
					branchName = '',
					ifscCode = '',
					bankId,
					branchCode,
				} = advanceDocumentSellerBankDetail || {};

				const formattedBank = {
					bankName,
					branchName,
					branchCode,
					ifscCode,
					accountNo: accountNumber,
					bankId,
				};

				SELECTED_INVOICES.push({
					objectId   : advanceDocumentId,
					tdsAmount  : 0,
					payableAmount,
					jobNumber,
					bankDetail : formattedBank,
				});
			}
		});
		try {
			await addToSelectedTrigger({
				data: {
					list            : [...SELECTED_INVOICES],
					id              : payrun || selectedPayRunId,
					entityCode      : entity,
					currencyCode    : currency,
					performedBy     : userId,
					performedByType : sessionType,
					performedByName : name,
				},
			});
			Toast.success('Invoice added to Payrun Successfully');
			setTimeout(async () => {
				getAdvancedPayment();
			}, 1000);
		} catch (e) {
			if (e?.response?.data?.message) {
				Toast.error(e?.response?.data?.message);
			}
		}
		return null;
	};
	const getViewSelectedInvoices = useCallback(() => {
		(async () => {
			try {
				await viewSelectedTrigger({
					params: {
						pageIndex,
						pageSize    : 10,
						payrunId    : payrun || selectedPayRunId,
						q           : query !== '' ? query : undefined,
						entityCode  : activeEntity || entity,
						serviceType : service || undefined,
						...sort,
					},
				});
			} catch (error) {
				console.log(error?.response?.data?.message);
			}
		})();
	}, [
		viewSelectedTrigger,
		pageIndex,
		payrun,
		selectedPayRunId,
		query,
		activeEntity,
		entity,
		service,
		sort,
	]);

	useEffect(() => {
		if (viewSelectedInvoice) {
			getViewSelectedInvoices();
		}
	}, [
		getViewSelectedInvoices,
		service,
		query,
		sort,
		pageIndex,
		viewSelectedInvoice,
	]);

	const deleteInvoices = async (id) => {
		try {
			await deleteSelectedInvoiceTrigger({
				data: {
					id,
					objectType: 'ADVANCE_DOCUMENT',
				},
			});
			Toast.success('Invoice deleted successfully');
			getViewSelectedInvoices();
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((prevData) => {
			const { list = [] } = prevData || {};
			const newList = list.map((item) => ({
				...item,
				checked: event.target.checked,
			}));
			return { ...prevData, list: newList };
		});
	};

	function TableHeaderCheckbox() {
		const { list = [] } = apiData || {};
		const { list: dataList = [] } = data || {};
		const isCheckedLength = list.filter((value) => value?.checked).length;
		const isAllRowsChecked = isCheckedLength === dataList.length;
		return (
			<Checkbox
				checked={isAllRowsChecked && !loading}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (itemData) => {
		const { advanceDocumentId = '' } = itemData || {};
		setApiData((prevData) => {
			const index = (prevData.list || []).findIndex(
				(item) => item.advanceDocumentId === advanceDocumentId,
			);
			if (index !== -1) {
				const newList = [...prevData.list];
				newList[index] = {
					...newList[index],
					checked: !newList[index].checked,
				};
				return {
					...prevData,
					list: newList,
				};
			}
			return prevData;
		});
	};
	function TableBodyCheckbox(itemData) {
		const { advanceDocumentId = '' } = itemData || {};
		const { list = [] } = apiData || {};
		const isChecked = list.find(
			(item) => item?.advanceDocumentId === advanceDocumentId,
		)?.checked;

		return (
			<div className={styles.checkbox_style}>
				<Checkbox
					checked={isChecked}
					onChange={() => onChangeTableBodyCheckbox(itemData)}
				/>
			</div>
		);
	}

	return {
		data,
		loading,
		filters,
		setFilters,
		entity,
		submitSelectedInvoices,
		selectedData,
		selectedDataLoading,
		getTableBodyCheckbox   : TableBodyCheckbox,
		apiData,
		getTableHeaderCheckbox : TableHeaderCheckbox,
		viewSelectedData,
		viewSelectedDataLoading,
		getViewSelectedInvoices,
		selectedPayRunId,
		deleteSelectedInvoice,
		deleteSelecteInvoiceLoading,
		deleteInvoices,
		currency,
	};
};
export default useGetAdvancePaymentList;