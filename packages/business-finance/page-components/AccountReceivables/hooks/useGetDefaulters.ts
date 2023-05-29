import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const useGetDefaulters = ({ isCustomerView, globalFilters, isClear }) => {
	const {
		search, zone, dueDate, invoiceStatus, status, services, pageIndex,
		invoiceDate, currency, cogoEntity, ...rest
	} = globalFilters;
	const { query = '', debounceQuery } = useDebounceQuery();

	const { user_profile:userProfile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [{ invoiceData, invoiceListLoading }, invoiceTrigger] = useRequestBf(
		{
			url     : '/sales/outstanding/invoice-list',
			method  : 'get',
			authKey : 'get_sales_outstanding_invoice_list',
		},
		{ manual: true, autoCancel: false },
	);

	const [{ customerData, customerListLoading }, customerTrigger] = useRequestBf(
		{
			url     : '/sales/outstanding/overall',
			method  : 'get',
			authKey : 'get_sales_outstanding_overall',
		},
		{ manual: true, autoCancel: false },
	);

	const trigger = isCustomerView ? customerTrigger : invoiceTrigger;

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const stringifiedRest = JSON.stringify(rest);
	const stringifiedQuery = JSON.stringify(query);

	const refetch = useCallback(async () => {
		if (isClear) return;
		try {
			await trigger({
				params: {
					...(JSON.parse(stringifiedRest) || {}),
					cogoEntity       : cogoEntity.length > 0 ? cogoEntity : undefined,
					invoiceStatus    : invoiceStatus?.length > 0 ? invoiceStatus : undefined,
					status           : status?.length > 0 ? status : undefined,
					services         : services?.length > 0 ? services : undefined,
					currency         : currency?.length > 0 ? currency : undefined,
					dueDateStart     : dueDate,
					dueDateEnd       : dueDate,
					invoiceDateStart : invoiceDate,
					invoiceDateEnd   : invoiceDate,
					query            : JSON.parse(stringifiedQuery) !== '' ? JSON.parse(stringifiedQuery) : undefined,
					zone,
					role             : userProfile.partner.user_role_ids,
					flag             : 'defaulters',
					page             : pageIndex,
					// ...sort,
				},
			});
			// if (sort.sortBy === 'grandTotal' && !currency) {
			// 	Toast.warn(
			// 		'Please apply currency filter to sort invoice amount accurately  ',
			// 	);
			// }
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something went wrong');
		}
	}, [isClear, trigger,
		stringifiedRest, cogoEntity, invoiceStatus, status,
		services, currency, dueDate, invoiceDate, stringifiedQuery,
		zone, userProfile.partner.user_role_ids, pageIndex]);

	useEffect(() => {
		refetch();
	}, [
		isCustomerView,
		stringifiedRest,
		stringifiedQuery,
		zone,
		// sort,
		invoiceDate,
		dueDate,
		currency,
		refetch,
	]);

	return {
		invoiceData,
		customerData,
		refetch,
	};
};

export default useGetDefaulters;
