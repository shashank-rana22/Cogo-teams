import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;

const useGetAwbList = ({ activeTab, value = 'available_non_reserved' }) => {
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

	const awbList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {

						status : value,
						...filters,
						q      : query,

						page,
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [filters, page, query, trigger, value]);

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
	}, [page, filters, query, awbList, value]);

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
