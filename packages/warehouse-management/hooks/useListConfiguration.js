import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const useListConfiguration = ({
	searchValue = '',
	warehouseLocationId = '',
}) => {
	const [page, setPage] = useState(CONSTANTS.START_PAGE);

	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data = {}, loading = true }, trigger] = useRequestAir(
		{
			url     : '/air-coe/warehouse-management/list-configurations',
			method  : 'get',
			authKey : 'get_air_coe_warehouse_management_list_configurations',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			warehouseLocationId : warehouseLocationId || undefined,
			status              : 'active',
		};

		try {
			await trigger({
				params: {
					q: (query || '').trim() || undefined,
					...PAYLOAD,
					page,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [query, page, trigger, warehouseLocationId]);

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
		data,
		loading,
		listAPI,
		setPage,
		page,
	};
};

export default useListConfiguration;
