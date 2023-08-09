import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const useListConfiguration = ({
	searchValue = '',
}) => {
	const [page, setPage] = useState(CONSTANTS.START_PAGE);

	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/warehouse-management/warehouse-configurations',
			method  : 'get',
			authKey : 'get_air_coe_warehouse_management_warehouse_configurations',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			warehouseLocationId : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			status              : 'active',
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
		data,
		loading,
		listAPI,
		setPage,
		page,
	};
};

export default useListConfiguration;
