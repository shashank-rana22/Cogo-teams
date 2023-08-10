import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetJvList = ({ filters, entityCode }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/list',
			authKey : 'get_payments_parent_jv_list',
			method  : 'get',
		},
		{ manual: true },
	);

	const {
		category,
		status,
		query: search,
		page = 1,
		sortType,
		sortBy,
		accountingDate,
	} = filters || {};

	const { startDate, endDate } = accountingDate || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const refetch = () => {
		trigger({
			params: {
				page,
				pageLimit : 10,
				category  : category || undefined,
				status    : status || undefined,
				query     : query || undefined,
				sortBy    : sortBy || undefined,
				sortType  : sortType || undefined,
				entityCode,
				startDate : startDate ? formatDate({
					date       : startDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}) : undefined,
				endDate: endDate ? formatDate({
					date       : endDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}) : undefined,
			},
		});
	};

	useEffect(() => {
		trigger({
			params: {
				page,
				pageLimit : 10,
				category  : category || undefined,
				status    : status || undefined,
				query     : query || undefined,
				sortBy    : sortBy || undefined,
				sortType  : sortType || undefined,
				entityCode,
				startDate : startDate ? formatDate({
					date: startDate,
					dateFormat:
								GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}) : undefined,
				endDate: endDate ? formatDate({
					date: endDate,
					dateFormat:
								GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
					formatType : 'dateTime',
					separator  : ' ',
				}) : undefined,
			},
		});
	}, [
		trigger,
		status,
		category,
		query,
		page,
		sortType,
		sortBy,
		entityCode,
		startDate,
		endDate,
	]);

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetJvList;
