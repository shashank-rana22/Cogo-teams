import { Checkbox } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import { CREATE_PAYRUN_CONFIG } from '../CreatePayrun/Configurations/createPayrunConfig';
import { CREATE_PAYRUN_CONFIG_VN } from '../CreatePayrun/Configurations/createPayrunConfigVN';
import getKeyByValue from '../utils/getKeyByValue';

import styles from './styles.module.css';

const ELEMENT_NOT_FOUND = -1;

const MIN_AMOUNT = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

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
		payrun_type = '',
		partner_id = '',
	} = urlQuery || {};

	const country = getKeyByValue(
		GLOBAL_CONSTANTS.country_entity_ids,
		partner_id,
	);

	const createPayRunConfigMapping = {
		IN : CREATE_PAYRUN_CONFIG,
		VN : CREATE_PAYRUN_CONFIG_VN,
	};

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
		{
			invoiceView : 'coe_accepted',
			pageSize    : 10,
			pageIndex   : 1,
			currency,
			entity,
			invoiceType : payrun_type === 'OVERHEADS' ? 'expense' : undefined,
		},
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
					inputAmount  : item?.payableAmount,
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
						entity             : filterEntity || undefined,
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
			const newList = list.map((item) => {
				const {
					payableValue,
					invoiceAmount,
					tdsDeducted,
					payableAmount,
					tdsAmount,
				} = item;
				const maxValueCrossed = +payableAmount > +payableValue;
				const lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
				const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
				const maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
				const lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
				const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;
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
			<Checkbox
				checked={isAllRowsChecked && !loading}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (itemData) => {
		const { id = '' } = itemData || {};
		setApiData((prevData) => {
			const index = (prevData.list || []).findIndex(
				(item) => item.id === id,
			);

			if (index !== ELEMENT_NOT_FOUND) {
				const newList = [...prevData.list];
				const {
					payableValue,
					invoiceAmount,
					tdsDeducted,
					payableAmount,
					tdsAmount,
				} = newList[index];
				const maxValueCrossed = +payableAmount > +payableValue;
				const lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
				const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
				const maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
				const lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
				const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;
				newList[index] = {
					...newList[index],
					checked  : !newList[index].checked,
					hasError : isError,
				};
				return {
					...prevData,
					list: newList,
				};
			}
			return prevData;
		});
	};
	function GetTableBodyCheckbox(itemData) {
		const { id = '' } = itemData || {};
		const { list = [] } = apiData || {};
		const isChecked = list.find(
			(item) => item?.id === id,
		)?.checked;

		return (
			<div className={styles.checkbox_style}>
				{itemData?.invoiceType === 'CREDIT NOTE' ? null : (
					<Checkbox
						checked={isChecked}
						onChange={() => onChangeTableBodyCheckbox(itemData)}
					/>
				)}
			</div>
		);
	}

	return {
		billsLoading : loading,
		filters,
		setFilters,
		entity,
		GetTableBodyCheckbox,
		apiData,
		GetTableHeaderCheckbox,
		currency,
		setOrderBy,
		orderBy,
		getPayrunInvoices,
		config       : createPayRunConfigMapping[country],
	};
};

export default useGetPayrunInvoices;
