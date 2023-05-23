import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

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
}

const MAX_FILTERS_LENGTH = 3;

const useAccountCollection = ({ sort = {}, entityType, currencyType }) => {
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		page      : 1,
		pageLimit : 10,
		accMode   : 'AR',
	});
	const { query, debounceQuery } = useDebounceQuery();

	const { search, date, ...rest } = globalFilters;

	const [{ data, loading }, listApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'get_payments_accounts',
			method  : 'get',
		},
		{ manual: false },
	);

	const api = listApiTrigger;

	const refetch = async () => {
		try {
			await api({
				params: {
					...(rest || {}),
					startDate:
						date
						&& formatDate({
							date       : date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}),
					endDate:
						date
						&& formatDate({
							date       : date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}),
					query        : query || undefined,
					entityType   : entityType || undefined,
					currencyType : currencyType || undefined,
					...sort,
				},
			});
		} catch (error) {
			Toast.error('Someting went wrong, we are working on it!');
		}
	};
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
	}, [JSON.stringify(rest), query, date, sort, entityType, currencyType]);

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
