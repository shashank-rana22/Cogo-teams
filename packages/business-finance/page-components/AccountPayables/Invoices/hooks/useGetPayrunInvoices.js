import { Checkbox } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

import styles from './styles.module.css';

const ELEMENT_NOT_FOUND = -1;

function formatToTimeStamp(dateString) {
	const date = new Date(dateString);
	const formatedDate = formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'dateTime',
		seperator  : 'T',
	});
	return formatedDate;
}

const useGetPayrunInvoices = ({ apiData, setApiData }) => {
	const { query: urlQuery } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const {
		entity = '',
		currency,
		payrun,
	} = urlQuery || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ manual: true },
	);
	const [orderBy, setOrderBy] = useState({});

	const [filters, setFilters] = useState(
		{ invoiceView: 'coe_accepted', pageSize: 10, pageIndex: 1, currency, entity },
	);

	const {
		search = '', pageSize, pageIndex, invoiceView, category, invoiceType,
		urgencyTag, currency: filterCurrency, entity: filterEntity,
		serviceType, invoiceDate, dueDate, updatedDate,
	} = filters || {};
	const { dueDateSortType } = orderBy || {};

	const { startDate, endDate } = invoiceDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = updatedDate || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		const newData = { ...data };
		const { list = [] } = newData || {};
		if (newData.list) {
			newData.list = list.map((item) => {
				const {
					payableAmount = '',
					tdsAmount = '',
					bankDetail = {},
				} = item || {};
				return {
					...item,
					payableValue : payableAmount,
					tdsValue     : tdsAmount,
					bankValue    : bankDetail,
				};
			});
		}
		setApiData(newData);
	}, [data, setApiData]);

	const getPayrunInvoices = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						q                  : query || undefined,
						pageIndex          : pageIndex || undefined,
						pageSize           : pageSize || undefined,
						category           : category || undefined,
						invoiceView        : invoiceView || undefined,
						currency           : filterCurrency || undefined,
						invoiceType        : invoiceType || undefined,
						entityCode         : filterEntity || undefined,
						urgencyTag         : urgencyTag || undefined,
						serviceType        : serviceType || undefined,
						dueDateSortType    : dueDateSortType || undefined,
						startDate          : startDate ? formatToTimeStamp(startDate) : undefined,
						endDate            : endDate ? formatToTimeStamp(endDate) : undefined,
						fromBillDate       : fromBillDate ? formatToTimeStamp(fromBillDate) : undefined,
						toBillDate         : toBillDate ? formatToTimeStamp(toBillDate) : undefined,
						fromUploadBillDate : toBillDate ? formatToTimeStamp(fromUploadBillDate) : undefined,
						toUploadBillDate   : toUploadBillDate ? formatToTimeStamp(toUploadBillDate) : undefined,
						payrunId           : payrun,
					},
				});
			} catch (e) {
				setApiData({});
				toastApiError(e);
			}
		},
		[pageIndex, pageSize,
			query, filterCurrency, urgencyTag, filterEntity, invoiceType,
			invoiceView, category, dueDateSortType, serviceType, startDate,
			endDate, fromBillDate, setApiData,
			toBillDate, fromUploadBillDate,
			toUploadBillDate, trigger, payrun],
	);

	useEffect(() => {
		if (payrun) {
			getPayrunInvoices();
		}
	}, [getPayrunInvoices, payrun]);

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

	const getTableHeaderCheckbox = () => {
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
	};

	const onChangeTableBodyCheckbox = (itemData) => {
		const { id = '' } = itemData || {};
		setApiData((prevData) => {
			const index = (prevData.list || []).findIndex(
				(item) => item.id === id,
			);
			if (index !== ELEMENT_NOT_FOUND) {
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
	const getTableBodyCheckbox = (itemData) => {
		const { id = '' } = itemData || {};
		const { list = [] } = apiData || {};
		const isChecked = list.find(
			(item) => item?.id === id,
		)?.checked;

		return (
			<div className={styles.checkbox_style}>
				<Checkbox
					checked={isChecked}
					onChange={() => onChangeTableBodyCheckbox(itemData)}
				/>
			</div>
		);
	};

	return {
		billsLoading: loading,
		filters,
		setFilters,
		entity,
		getTableBodyCheckbox,
		apiData,
		getTableHeaderCheckbox,
		currency,
		setOrderBy,
		orderBy,
		getPayrunInvoices,
	};
};

export default useGetPayrunInvoices;
