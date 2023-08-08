import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const useListInventory = ({
	searchValue = '',
}) => {
	const { query = '', debounceQuery } = useDebounceQuery();
	const [page, setPage] = useState(CONSTANTS.START_PAGE);
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url      : '/air-coe/warehouse-management/inventory',
			method   : 'get',
			auth_key : 'get_air_coe_warehouse_management_inventory',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			status: 'received',
		};

		try {
			await trigger({
				params: {
					q: (query || '').trim() || undefined,
					...PAYLOAD,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [query, trigger]);

	useEffect(() => {
		if (searchValue) {
			setPage(CONSTANTS.START_PAGE);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		listAPI();
	}, [listAPI, page, query]);

	return {
		data: data?.data || {},
		loading,
		listAPI,
	};
};

export default useListInventory;
