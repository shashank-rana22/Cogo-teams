import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const OPERATOR_TYPE_MAPPING = {
	airline       : 'airline',
	shipping_line : 'shipping_line',
	others        : ['rail', 'barge'],
};

const useGetListData = (activeTab) => {
	const [searchValue, setSearchValue] = useState('');
	const [finalList, setFinalList] = useState([]);
	const [page, setPage] = useState(CONSTANTS.START_PAGE);

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest('/list_operators', { manual: true });

	const getLocationData = useCallback(() => {
		(() => {
			try {
				trigger({
					params: {
						filters: {
							q             : query,
							operator_type : OPERATOR_TYPE_MAPPING[activeTab],
						},
						page,
						sort_type: 'desc',
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [activeTab, page, query, trigger]);

	useEffect(() => {
		if (searchValue) {
			setPage(CONSTANTS.START_PAGE);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		getLocationData();
	}, [getLocationData, page, query]);

	useEffect(() => {
		setFinalList([]);
		setPage(CONSTANTS.START_PAGE);
	}, [activeTab]);

	useEffect(() => {
		setFinalList([]);
		setPage(CONSTANTS.START_PAGE);
	}, [query]);

	return {
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
