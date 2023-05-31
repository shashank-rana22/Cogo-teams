import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface GlobalInterface {
	page?:number
	pageLimit?:number
	accMode?:string
	search?:string
	date?:{
		startDate?:Date
		endDate?:Date
	}
	paymentDocumentStatus?:string
	docType?:string
	sortBy?: string,
	sortType?: string,
}

const MAX_FILTERS_LENGTH = 3;

const useAccountCollection = ({ entityType, currencyType }) => {
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		page     : 1,
		accMode  : 'AR',
		sortBy   : '',
		sortType : 'ASC',
	});
	const { query, debounceQuery } = useDebounceQuery();

	const {
		search, date, paymentDocumentStatus, docType, accMode, page, sortBy, sortType,
	} = globalFilters;

	const [{ data, loading }, listApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'get_payments_accounts',
			method  : 'get',
		},
		{ manual: false },
	);

	const api = listApiTrigger;

	const refetch = useCallback(async () => {
		try {
			await api({
				params: {
					docType               : docType || undefined,
					paymentDocumentStatus : paymentDocumentStatus || undefined,
					page                  : page || undefined,
					accMode               : accMode || undefined,
					pageLimit             : 10,
					startDate:
					date?.startDate
						? formatDate({
							date       : date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,
					endDate:
					date?.endDate
						? formatDate({
							date       : date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,
					query        : query || undefined,
					entityType   : entityType || undefined,
					currencyType : currencyType || undefined,
					sortBy,
					sortType,
				},
			});
		} catch (error) {
			Toast.error('Someting went wrong, we are working on it!');
		}
	}, [accMode, api, currencyType, date?.endDate,
		date?.startDate, docType, entityType, page, paymentDocumentStatus, query, sortBy,
		sortType]);
	const clearFilters = () => {
		if (Object.keys(globalFilters).length > MAX_FILTERS_LENGTH) {
			setGlobalFilters({
				page      : 1,
				pageLimit : 10,
				accMode   : 'AR',
			});
		} else {
			refetch();
		}
	};

	useEffect(() => {
		refetch();
	}, [query, date, sortBy,
		sortType, entityType, currencyType, paymentDocumentStatus, docType, refetch]);

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	return {
		data,
		refetch,
		globalFilters,
		setGlobalFilters,
		loading,
		clearFilters,
	};
};

export default useAccountCollection;
