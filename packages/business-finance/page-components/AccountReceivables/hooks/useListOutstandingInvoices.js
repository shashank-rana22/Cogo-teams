import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { subtractDays } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

import { AGEING_BUCKET_MAPPING } from '../constants/account-type';

const SUBTRACT_DAYS = 3;
const CHECK_BARGRAPH_LENGHT = 0;
const SPLIT_DATES = 1;
const useListOutstandingInvoices = ({
	registrationNumber,
	cogoEntityValue,
	ageingArr,
	selectedBarData,
	filterValues,
	filters,
	barGraphData = [],
	path,
}) => {
	const [params, setParams] = useState({
		page                     : 1,
		page_limit               : 10,
		pagination_data_required : true,
	});
	const [orderBy, setOrderBy] = useState({
		key   : '',
		order : '',
	});
	const [searchQuery, setSearchQuery] = useState();
	const [invoiceStatus, setInvoiceStatus] = useState([
		'UNPAID',
		'PARTIAL PAID',
	]);
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchQuery);
	}, [searchQuery, debounceQuery]);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_outstanding_invoices',
		method : 'GET',
	}, { manual: true });

	const getAgeingBucket = useCallback(() => {
		if (Array.isArray(ageingArr)) {
			return ageingArr.map((val) => AGEING_BUCKET_MAPPING[val.value]);
		}

		return [AGEING_BUCKET_MAPPING[ageingArr]];
	}, [ageingArr]);

	const { indexValue = '' } = selectedBarData || {};

	const { period_type } = filterValues || {};

	const getSplitDates = indexValue?.split('to');

	const getDates = useCallback(() => {
		const date = new Date();
		if (path === 'query_builder') {
			return formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
		}

		const lastObj =			barGraphData.length > CHECK_BARGRAPH_LENGHT
			? barGraphData[(barGraphData?.length || CHECK_BARGRAPH_LENGHT) - SPLIT_DATES]
			: {};

		if (barGraphData.length > CHECK_BARGRAPH_LENGHT && lastObj.duration === indexValue) {
			return formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
		}
		if (period_type === undefined) {
			return formatDate({
				date       : subtractDays(date, SUBTRACT_DAYS),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
		}
		if (period_type === 'week') {
			if (indexValue) {
				const newDate = new Date(getSplitDates?.[SPLIT_DATES]?.trim());
				return formatDate({
					date       : subtractDays(newDate, SUBTRACT_DAYS),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					formatType : 'date',
				});
			}
			if (!indexValue) {
				return formatDate({
					date       : subtractDays(date, SUBTRACT_DAYS),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					formatType : 'date',
				});
			}
		} else if (indexValue) {
			return `31 ${indexValue}`;
		} else {
			return `31-${date.getMonth() + SPLIT_DATES}-${date.getFullYear()}`;
		}

		return formatDate({
			date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});
	}, [barGraphData, getSplitDates, indexValue, path, period_type]);

	const fetchOutstandingInvoices = useCallback(async () => {
		try {
			await trigger({
				params: {
					...params,
					sort_type : orderBy.order || undefined,
					sort_by   : orderBy.key || undefined,
					filters   : {
						q             : query || undefined,
						...filters,
						is_precovid   : 'NO',
						cogo_entity   : cogoEntityValue,
						statuses      : invoiceStatus,
						ageing_bucket : getAgeingBucket(),
					},
					end_date   : getDates(),
					pan_number : registrationNumber,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [cogoEntityValue, filters, getAgeingBucket, getDates,
		invoiceStatus, orderBy.key, orderBy.order, params, registrationNumber, query, trigger]);

	useEffect(() => {
		fetchOutstandingInvoices();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.page,
		orderBy,
		query,
		invoiceStatus,
		filters]);

	return {
		loading,
		data: data || {},
		params,
		setParams,
		setOrderBy,
		orderBy,
		setSearchQuery,
		searchQuery,
		setInvoiceStatus,
		invoiceStatus,
	};
};

export default useListOutstandingInvoices;
