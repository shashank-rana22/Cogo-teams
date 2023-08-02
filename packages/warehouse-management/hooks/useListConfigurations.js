import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const useListConfigurations = ({
	activeTab = '',
	warehouseManagerId = '',
	warehouseLocationId = '',
}) => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(CONSTANTS.START_PAGE);

	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url    : '/air-coe/warehouse-management/warehouse-configurations',
			method : 'get',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			warehouseManagerId,
			warehouseLocationId,
			status: 'string',
		};

		try {
			await trigger({
				params: {
					q         : (query || '').trim() || undefined,
					...PAYLOAD,
					pageIndex : page,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, trigger]);

	useEffect(() => {
		if (searchValue) {
			setPage(CONSTANTS.START_PAGE);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setPage(CONSTANTS.START_PAGE);
	}, [activeTab]);

	useEffect(() => {
		listAPI();
	}, [listAPI, page, query]);

	return {
		data,
		loading,
		listAPI,
		setPage,
		page,
		searchValue,
		setSearchValue,
	};
};

export default useListConfigurations;
