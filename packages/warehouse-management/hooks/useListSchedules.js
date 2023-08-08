import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import CONSTANTS from '../constants/constants';

const getParams = (truckStatus) => {
	let req = { truckOutStatus: false };

	if (truckStatus === 'truck_in') {
		req = {
			...req,
			truckInStatus : false,
			truckInEta    : '2023-01-27 09:25:26',
		};
	}
	return req;
};

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
			authKey : 'get_air_coe_warehouse_management_warehouse_schedules',
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const PAYLOAD = getParams(truckStatus);

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
	}, [query, trigger, truckStatus]);

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
