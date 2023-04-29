import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import { OPERATORS } from '../configurations/operators';

const useGetListData = () => {
	const [searchValue, setSearchValue] = useState('');
	const [finalList, setFinalList] = useState([]);
	const [page, setPage] = useState(1);

	const [{ data = {}, loading }, trigger] = useRequest('/list_operators', { manual: true });

	const config = OPERATORS;

	const getLocationData = useCallback(() => {
		(async () => {
			if (searchValue) {
				setPage(1);
			}
			try {
				await trigger({
					params: {
						filters: {
							q: (searchValue || '').trim() || undefined,
						},
						page,
						sort_type: 'desc',
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [page, searchValue, trigger]);

	useEffect(() => {
		getLocationData();
	}, [getLocationData, page]);

	useEffect(() => {
		setFinalList([]);
		setPage(1);
		getLocationData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return {
		config,
		listData: data,
		loading,
		getLocationData,
		setPage,
		page,
		searchValue,
		setSearchValue,
		finalList,
		setFinalList,
	};
};
export default useGetListData;
