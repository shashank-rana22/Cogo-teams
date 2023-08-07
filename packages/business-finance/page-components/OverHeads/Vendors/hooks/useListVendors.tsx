import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const formatedDate = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	formatType : 'dateTime',
	separator  : 'T',
});

const useListVendors = ({ filters, sort }) => {
	const {
		page, pageLimit, KYC_STATUS, CATEGORY, searchValue, dueDate, uploadDate, billDate,
	} = filters;
	const { paymentSortType, openInvoiceSortType, createdAtSortType } = sort;
	const { startDate, endDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = uploadDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = billDate || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/expense/list-vendors',
			method  : 'get',
			authKey : 'get_purchase_expense_list_vendors',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		try {
			trigger({
				params: {
					page_limit                 : pageLimit,
					page,
					verification_data_required : true,
					paymentSortType            : paymentSortType || undefined,
					openInvoiceSortType        : openInvoiceSortType || undefined,
					createdAtSortType          : createdAtSortType || undefined,
					kycStatus                  : KYC_STATUS || undefined,
					category                   : CATEGORY || undefined,
					q                          : searchValue || undefined,
					startDate                  : startDate ? formatedDate(startDate) : undefined,
					endDate                    : endDate ? formatedDate(endDate) : undefined,
					fromUploadBillDate         : fromUploadBillDate ? formatedDate(fromUploadBillDate) : undefined,
					toUploadBillDate           : toUploadBillDate ? formatedDate(toUploadBillDate) : undefined,
					fromBillDate               : fromBillDate ? formatedDate(fromBillDate) : undefined,
					toBillDate                 : toBillDate ? formatedDate(toBillDate) : undefined,
				},
			});
		} catch (err) {
			console.log('error-', err);
		}
	}, [
		page,
		trigger,
		pageLimit,
		paymentSortType,
		openInvoiceSortType,
		createdAtSortType,
		KYC_STATUS, CATEGORY, searchValue,
		startDate,
		endDate,
		fromUploadBillDate,
		toUploadBillDate,
		fromBillDate,
		toBillDate,
	]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
