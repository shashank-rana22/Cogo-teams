import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentPendingTasks = () => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = 	useRequest('http://localhost:7002/airbender/pending-tasks/list', { manual: true });

	const listAPi = async () => {
		if (searchValue) {
			setPage(1);
		}
		try {
			await trigger({
				params: {
					q       : (query || '').trim() || undefined,
					filters : {

					},
					assignedStakeholder : 'ground_ops',
					page,
					sort_type           : 'desc',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		debounceQuery(searchValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		listAPi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query]);

	// useEffect(() => {
	// 	setFinalList([]);
	// 	setPage(1);
	// 	getLocationData();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [searchValue]);

	return {
		data,
		loading,
		listAPi,
		setPage,
		page,
		searchValue,
		setSearchValue,
	};
};
export default useListShipmentPendingTasks;
