import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf, useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

import { formatDate } from '../../commons/utils/formatDate';

const useGetDefaulters = ({ isCustomerView, globalFilters, activeTab, sort }) => {
	const {
		search, zone, dueDate, invoiceStatus, status, services, pageIndex, migrated,
		invoiceDate, currency, cogoEntity, pageLimit, ...rest
	} = globalFilters || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	const { user_profile:userProfile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const sortBy = Object.keys(sort)?.[0] || undefined;
	const sortType = Object.values(sort)?.[0] || undefined;

	const [{ data: invoiceData, loading:invoiceListLoading }, invoiceTrigger] = useRequestBf(
		{
			url     : '/sales/outstanding/invoice-list',
			method  : 'get',
			authKey : 'get_sales_outstanding_invoice_list',
		},
		{ manual: useTicketsRequest },
	);

	const [{ data: customerData, loading:customerListLoading }, customerTrigger] = useRequestBf(
		{
			url     : '/sales/outstanding/overall',
			method  : 'get',
			authKey : 'get_sales_outstanding_overall',
		},
		{ manual: true },
	);

	const trigger = isCustomerView ? customerTrigger : invoiceTrigger;

	const [apiState, downloadApi] = useRequestBf(
		{
			url     : '/sales/report/download/outstanding/list',
			method  : 'get',
			authKey : 'get_sales_report_download_outstanding_list',
		},
		{ manual: true },
	);

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const stringifiedRest = JSON.stringify(rest);
	const stringifiedQuery = JSON.stringify(query);

	const formatProvidedDate = (date:Date) => {
		if (date) {
			return formatDate(
				date,
				GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				{},
				false,
			);
		}
		return undefined;
	};

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					...(JSON.parse(stringifiedRest) || {}),
					migrated         : migrated !== '' ? migrated : undefined,
					cogoEntity       : cogoEntity.length > 0 ? cogoEntity : undefined,
					invoiceStatus    : invoiceStatus?.length > 0 ? invoiceStatus : undefined,
					status           : status?.length > 0 ? status : undefined,
					services         : services?.length > 0 ? services : undefined,
					currency         : currency?.length > 0 ? currency : undefined,
					dueDateStart     : formatProvidedDate(dueDate?.startDate),
					dueDateEnd       : formatProvidedDate(dueDate?.endDate),
					invoiceDateStart : formatProvidedDate(invoiceDate?.startDate),
					invoiceDateEnd   : formatProvidedDate(invoiceDate?.endDate),
					query            : JSON.parse(stringifiedQuery) !== '' ? JSON.parse(stringifiedQuery) : undefined,
					zone,
					role             : userProfile.partner.user_role_ids,
					flag             : 'defaulters',
					page             : pageIndex,
					pageLimit,
					sortBy,
					sortType,
				},
			});
			// if (sort.sortBy === 'grandTotal' && !currency) {
			// 	Toast.warn(
			// 		'Please apply currency filter to sort invoice amount accurately  ',
			// 	);
			// }
		} catch (e) {
			console.log('error->', e);
		}
	}, [cogoEntity, currency, dueDate?.endDate, dueDate?.startDate, invoiceDate?.endDate,
		invoiceDate?.startDate, invoiceStatus, migrated, pageIndex, services, status,
		stringifiedQuery, stringifiedRest, trigger,
		pageLimit,
		userProfile.partner.user_role_ids, zone, sortBy, sortType]);

	const sendReport = async () => {
		try {
			await downloadApi({
				params: {
					...rest,
					page             : pageIndex,
					pageLimit,
					type             : activeTab || undefined,
					migrated         : migrated || undefined,
					status           : status || undefined,
					invoiceStatus    : invoiceStatus || undefined,
					services         : services || undefined,
					dueDateStart     : formatProvidedDate(dueDate?.startDate),
					dueDateEnd       : formatProvidedDate(dueDate?.endDate),
					invoiceDateStart : formatProvidedDate(invoiceDate?.startDate),
					invoiceDateEnd   : formatProvidedDate(invoiceDate?.endDate),
					flag             : 'defaulters',
					query            : query !== '' ? query : undefined,
					role             : userProfile.partner.user_role_ids,
					performedBy      : userProfile.user.id,
					sortBy,
					sortType,
				},
			});
			Toast.success('Report Sent Successfully');
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed to Send Report'); }
		}
	};

	useEffect(() => {
		refetch();
	}, [
		isCustomerView,
		stringifiedRest,
		stringifiedQuery,
		zone,
		sortBy,
		sortType,
		invoiceDate,
		dueDate,
		currency,
		refetch,
	]);

	return {
		invoiceData,
		invoiceListLoading,
		customerData,
		refetch,
		sendReport,
		apiState,
	};
};

export default useGetDefaulters;
