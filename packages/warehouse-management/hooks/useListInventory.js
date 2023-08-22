import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const useListInventory = ({
	searchValue = '',
	warehouseLocationId = '',
}) => {
	const { query = '', debounceQuery } = useDebounceQuery();
	const [page, setPage] = useState(CONSTANTS.START_PAGE);
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/warehouse-management/warehouse-inventory',
			method  : 'get',
			authKey : 'get_air_coe_warehouse_management_warehouse_inventory',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			state: ['awaiting_gate_in', 'gated_in'],
			warehouseLocationId,
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
	}, [query, trigger, warehouseLocationId]);

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
