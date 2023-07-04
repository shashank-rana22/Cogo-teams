import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const STATUS_MAPPING = {
	awb_number        : 'available',
	awb_number_used   : 'used',
	awb_number_cancel : 'cancelled',
};

const { START_PAGE } = CONSTANTS;

const useGetAwbList = (activeTab) => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);
	const [qfilter, setQfilter] = useState('');
	const [filters, setFilters] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest('/list_awb_inventories', { manual: true });

	const awbList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							status : STATUS_MAPPING[activeTab],
							...filters,
							q      : query,
						},

						page,
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [activeTab, filters, page, query, trigger]);

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
		awbList();
	}, [page, filters, query, awbList]);

	return {
		loading,
		setPage,
		page,
		data,
		awbList,
		finalList,
		setFinalList,
		filters,
		setFilters,
		qfilter,
		setQfilter,
	};
};

export default useGetAwbList;
