import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetAwbList = (activeTab) => {
	const [page, setPage] = useState(1);
	const [finalList, setFinalList] = useState([]);
	const [qfilter, setQfilter] = useState('');
	const [filters, setFilters] = useState({});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest('/list_awb_inventories', { manual: true });

	const awbList = useCallback(() => {
		(async () => {
			const statusMapping = {
				awb_number        : 'available',
				awb_number_used   : 'used',
				awb_number_cancel : 'cancelled',
			};
			try {
				await trigger({
					params: {
						filters: {
							status : statusMapping[activeTab],
							...filters,
							q      : query,
						},

						page,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [activeTab, filters, page, query, trigger]);

	useEffect(() => {
		debounceQuery(qfilter);
	}, [debounceQuery, qfilter]);

	useEffect(() => {
		setFinalList([]);
		setPage(1);
		setQfilter('');
	}, [activeTab]);

	useEffect(() => {
		setFinalList([]);
		setPage(1);
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
