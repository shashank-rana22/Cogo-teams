import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const INIT_PAGE = 1;

const getPayload = ({
	activeTab = 'tc_status_check',
	pagination = INIT_PAGE,
	query = '',
}) => {
	const date = formatDate({
		date       : new Date(),
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	});
	const searchQuery = query ? { q: query } : {};

	return {
		cargoHandedOverAtOriginAt : date,
		originAirportId           : null,
		state                     : activeTab === 'tc_status_check' ? 'TC' : 'TD',
		page                      : pagination,
		pageSize                  : 10,
		...searchQuery,
	};
};

const useGetAmsData = ({
	activeTab = 'tc_status_check',
	searchValue = '',
}) => {
	const [pagination, setPagination] = useState(INIT_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir({
		url     : '/air-coe/air-freight/ams-data',
		method  : 'GET',
		authKey : 'get_air_coe_air_freight_ams_data',
	}, { manual: false });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ activeTab, pagination, query }),
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [activeTab, pagination, trigger, query]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, pagination]);

	useEffect(() => {
		setPagination(INIT_PAGE);
	}, [activeTab]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	return {
		data,
		loading,
		apiTrigger,
		pagination,
		setPagination,
	};
};

export default useGetAmsData;
