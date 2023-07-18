import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;

const useGetClearanceDateReport = ({ activeTab }) => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);
	const [qfilter, setQfilter] = useState('');
	const [filters, setFilters] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir('/air-coe/awb-inventory/list', { manual: true });

	const clearanceDateReport = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {

						...filters,
						q: query,

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
