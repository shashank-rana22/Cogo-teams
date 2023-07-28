import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;
const AVAILABLE_RESERVED = 'available_reserved';

const useGetClearanceDateReport = ({ activeTab }) => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);
	const [qfilter, setQfilter] = useState('');
	const [filters, setFilters] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/awb-inventory/list',
			method  : 'GET',
			authKey : 'get_air_coe_awb_inventory_list',
		},
		{ manual: true },
	);

	const handleCustomClearanceDate = (singleItem) => (
		formatDate({
			date       : singleItem,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		}));

	const handleBookingDate = (singleItem) => (
		formatDate({
			date       : singleItem,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		}));

	const clearanceDateReport = useCallback(() => {
		(async () => {
			const { bookingDate, customClearanceDate, ...rest } = filters || {};
			const alteredBookingDate = handleBookingDate(bookingDate);
			const alteredCustomClearanceDate = handleCustomClearanceDate(customClearanceDate);
			try {
				await trigger({
					params: {
						...rest,
						q                   : query,
						bookingDate         : alteredBookingDate,
						customClearanceDate : alteredCustomClearanceDate,
						status              : AVAILABLE_RESERVED,
						page,
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [filters, page, query, trigger]);

	useEffect(() => {
		debounceQuery(qfilter);
	}, [debounceQuery, qfilter]);

	useEffect(() => {
		setFinalList([]);
		setPage(START_PAGE);
		setQfilter('');
	}, [activeTab]);

	useEffect(() => {
		setFinalList([]);
		setPage(START_PAGE);
	}, [filters, query]);

	useEffect(() => {
		clearanceDateReport();
	}, [page, filters, query, clearanceDateReport]);

	return {
		loading,
		setPage,
		page,
		data,
		clearanceDateReport,
		finalList,
		setFinalList,
		filters,
		setFilters,
		qfilter,
		setQfilter,
	};
};

export default useGetClearanceDateReport;
