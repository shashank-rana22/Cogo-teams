import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

interface Global {
	search?:string,
	zone?:string,
	dueDate?:{ startDate?:Date, endDate?:Date },
	invoiceStatus?:string,
	status?:string,
	services?:string[],
	pageIndex?:number,
	migrated?:boolean | string,
	invoiceDate?:{ startDate?:Date, endDate?:Date },
	currency?:string,
	pageLimit?:string | number
}
interface Props {
	globalFilters?:Global
	activeTab?: string,
	sort?:object
	entityCode?:number | string,
}

const useGetDefaulters = ({ globalFilters, activeTab, sort, entityCode }:Props) => {
	const {
		search, zone, dueDate, invoiceStatus, status, services, pageIndex, migrated,
		invoiceDate, currency, pageLimit, ...rest
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
		{ manual: true, autoCancel: false },
	);

	const trigger = invoiceTrigger;

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

	const formatProvidedDate = (date:string | Date) => {
		if (date) {
			return formatDate(
				{
					date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					formatType : 'date',
				},
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
					cogoEntity       : entityCode || undefined,
					invoiceStatus    : invoiceStatus?.length > 0 ? invoiceStatus : undefined,
					status           : status?.length > 0 ? status : undefined,
					services         : services?.length > 0 ? services : undefined,
					currency         : currency?.length > 0 ? currency : undefined,
					dueDateStart     : formatProvidedDate(dueDate?.startDate),
					dueDateEnd       : formatProvidedDate(dueDate?.endDate),
					invoiceDateStart : formatProvidedDate(invoiceDate?.startDate),
					invoiceDateEnd   : formatProvidedDate(invoiceDate?.endDate),
					query            : JSON.parse(stringifiedQuery) !== '' ? JSON.parse(stringifiedQuery) : undefined,
					zone             : zone?.length > 0 ? zone : undefined,
					role             : userProfile.partner.user_role_ids,
					flag             : 'defaulters',
					type             : activeTab || undefined,
					page             : pageIndex,
					pageLimit,
					sortBy,
					sortType,
				},
			});
			if (sortBy === 'grandTotal' && !currency) {
				Toast.warn(
					'Please apply currency filter to sort invoice amount accurately  ',
				);
			}
		} catch (e) {
			console.log('error', e);
		}
	}, [entityCode, currency, dueDate?.endDate, dueDate?.startDate, invoiceDate?.endDate,
		invoiceDate?.startDate, invoiceStatus, migrated, pageIndex, services, status,
		stringifiedQuery, stringifiedRest, trigger,
		pageLimit,
		userProfile.partner.user_role_ids, zone, sortBy, sortType, activeTab]);

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
		stringifiedRest,
		stringifiedQuery,
		zone,
		sortBy,
		sortType,
		invoiceDate,
		dueDate,
		currency,
		refetch,
		entityCode,
	]);

	return {
		invoiceData,
		invoiceListLoading,
		refetch,
		sendReport,
		apiState,
	};
};

export default useGetDefaulters;
