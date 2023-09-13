import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import CONSTANTS from '../constants/constants';

const STATUS_MAP = {
	truck_in  : 'awaiting_truck_in',
	truck_out : 'trucked_in',
};

const useListSchedules = ({
	activeTab = 'schedules',
	truckStatus = 'truck_in',
	searchValue = '',
	setSearchValue = () => {},
	warehouseLocationId = '',
}) => {
	const [page, setPage] = useState(CONSTANTS.START_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading = true }, trigger] = useRequestAir(
		{
			url     : '/air-coe/warehouse-management/list-schedules',
			method  : 'get',
			authKey : 'get_air_coe_warehouse_management_list_schedules',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		try {
			await trigger({
				params: {
					q                   : (query || '').trim() || undefined,
					state               : STATUS_MAP[truckStatus] || undefined,
					warehouseLocationId : warehouseLocationId || undefined,
					page,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [query, trigger, page, truckStatus, warehouseLocationId]);

	useEffect(() => {
		if (searchValue) {
			setPage(CONSTANTS.START_PAGE);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setPage(CONSTANTS.START_PAGE);
		setSearchValue('');
	}, [activeTab, setSearchValue]);

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

export default useListSchedules;
