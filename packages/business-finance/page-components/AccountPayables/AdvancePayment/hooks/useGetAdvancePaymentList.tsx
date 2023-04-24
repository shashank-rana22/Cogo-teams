import { Toast, Checkbox } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css';

interface NestedObj {
	[key: string]: string;
}
interface FilterProps {
	activeEntity?: string;
	sort: NestedObj;
}
const useGetAdvancePaymentList = ({ activeEntity, sort }:FilterProps) => {
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user, session_type:sessionType } = UserData;
	const { id:userId = '', name } = user || {};
	const [filters, setFilters] = useState({
		search    : undefined,
		service   : undefined,
		pageIndex : 1,
	});
	const [apiData, setApiData] = useState({ list: [] });

	const { search, service, pageIndex } = filters || {};
	const { query = '', debounceQuery } = useDebounceQuery();
	const {
		query: urlQuery,
		// performedBy,
		// performedByType,
		// performedByName,
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.id,
		performedByType : profile.session_type,
		performedByName : profile.name,
	}));

	const {
		entity = '',
		currency,
		payrun = '',
		// payrun_type = '',
	} = urlQuery || {};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/advance-document/list',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_list_advance_payments',
		},
		{ manual: true, autoCancel: false },
	);

	const [
		{ data:selectedData, loading:selectedDataLoading },
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
		{ data:viewSelectedData, loading:viewSelectedDataLoading },
		viewSelectedTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill/advance-payment',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_advance_payment',
		},
		{ manual: true, autoCancel: false },
	);

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
	}, [data]);

	const getAdvancedPayment = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex,
						pageSize    : 10,
						hasPayrun   : false,
						q           : query !== '' ? query : undefined,
						entityCode  : activeEntity || entity,
						serviceType : service || undefined,
						...sort,
					},
				});
			} catch (err) {
				Toast.error(err.meessage);
			}
		})();
	}, [query, trigger, activeEntity, service, pageIndex, sort, entity]);
	useEffect(() => {
		getAdvancedPayment();
	}, [getAdvancedPayment]);

	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData ?? {};
		const selectedInvoices = [];

		for (let i = 0; i < list.length; i += 1) {
			const addToSelectdata = list?.[i];

			const {
				checked = false,
				advanceDocumentId = '',
				jobNumber = '',
				advanceDocumentSellerBankDetail = undefined,
				invoiceNumber = ' ',
				payableAmount,
			} = addToSelectdata ?? {};

			if (checked) {
				if (!advanceDocumentSellerBankDetail) {
					return Toast.error(`Select Bank for Invoice Number ${invoiceNumber}`);
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

				selectedInvoices.push({
					objectId   : advanceDocumentId,
					tdsAmount  : 0,
					payableAmount,
					jobNumber,
					bankDetail : formattedBank,
				});
			}
		}
		try {
			const res = await addToSelectedTrigger({
				data: {
					list            : [...selectedInvoices],
					id              : payrun,
					entityCode      : entity,
					currencyCode    : currency,
					performedBy     : userId,
					performedByType : sessionType,
					performedByName : name,
				},
			});

			if (res?.data?.message) {
				Toast.error(res.data.message);
			} else {
				Toast.success('Invoice added to Payrun Successfully');
				getAdvancedPayment();
			}
		} catch (e) {
			Toast.error(e?.data?.message);
		}
		return null;
	};
	const getViewSelectedInvoices = async () => {
		try {
			await viewSelectedTrigger({
				params: {
					pageIndex,
					pageSize   : 10,
					payrunId   : payrun,
					// hasPayrun   : false,
					q          : query !== '' ? query : undefined,
					entityCode : activeEntity || entity,
					// serviceType : service || undefined,
					// ...sort,
				},
			});
		} catch (err) {
			Toast.error(err.meessage);
		}
	};

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((prevData) => {
			const newList = prevData?.list?.map((item) => ({
				...item,
				checked: event.target.checked,
			}));
			return { ...prevData, list: newList };
		});
	};

	const getTableHeaderCheckbox = () => {
		const isCheckedLength = apiData?.list?.filter(
			(value) => value?.checked,
		)?.length;
		const isAllRowsChecked = isCheckedLength === data?.list?.length;
		const isSemiRowsChecked = isCheckedLength > 0;
		return (
			<div className={styles.checkbox_style}>
				<Checkbox
					themeType="white"
					indeterminate={!!isSemiRowsChecked && loading}
					checked={isAllRowsChecked && !loading}
					onChange={onChangeTableHeaderCheckbox}
				/>
			</div>
		);
	};

	const onChangeTableBodyCheckbox = (itemData) => {
		setApiData((prevData) => {
			const index = prevData.list.findIndex(
				(item) => item.advanceDocumentId === itemData.advanceDocumentId,
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
	const getTableBodyCheckbox = (itemData) => {
		const isChecked = apiData?.list?.find(
			(item) => item?.advanceDocumentId === itemData?.advanceDocumentId,
		)?.checked;

		return (
			<Checkbox
				checked={isChecked}
				onChange={() => onChangeTableBodyCheckbox(itemData)}
			/>
		);
	};

	return {
		data,
		loading,
		filters,
		setFilters,
		entity,
		submitSelectedInvoices,
		selectedData,
		selectedDataLoading,
		getTableBodyCheckbox,
		apiData,
		getTableHeaderCheckbox,
		viewSelectedData,
		viewSelectedDataLoading,
		getViewSelectedInvoices,
	};
};
export default useGetAdvancePaymentList;
