import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import CONSTANTS from '../constants/constants';

const useListSchedules = ({
	activeTab = 'schedules',
	truckStatus = 'truck_in',
	searchValue = '',
	setSearchValue = () => {},
}) => {
	const [page, setPage] = useState(CONSTANTS.START_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/warehouse-management/warehouse-schedules',
			method  : 'get',
			authKey : 'get_air_coe_warehouse_management_schedule',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = {
			truckInEta     : '2023-01-27 09:25:26',
			truckInStatus  : (truckStatus === ''),
			truckOutStatus : (truckStatus === 'truck_in'),
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, trigger, truckStatus]);

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
//
