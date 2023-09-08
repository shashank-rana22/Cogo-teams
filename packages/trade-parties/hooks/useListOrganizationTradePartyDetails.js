import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationTradePartyDetails = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [globalSearch, setGlobalSearch] = useState('');
	const [typeOfSearch, setTypeOfSearch] = useState('trade_party');
	const [filterParams, setFilterParams] = useState({
		registration_number : '',
		country_id          : '',
		company_type        : '',
		page                : 1,
	});
	const { query = '', debounceQuery } = useDebounceQuery();

	const setSearchFilters = () => {
		if (!globalSearch) return null;

		if (typeOfSearch === 'trade_party') {
			return {
				q: query,
			};
		}
		if (typeOfSearch === 'serial_id') {
			return {
				serial_id: query,
			};
		}
		return {
			sage_organization_id: query,
		};
	};
	useEffect(() => {
		debounceQuery(globalSearch);
	}, [globalSearch, debounceQuery]);

	const { page, ...restFilters } = filterParams;
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_party_details',
			params : {
				page,
				...defaultParams,
				filters: {
					...defaultFilters,
					...setSearchFilters(),
					...restFilters,
				},
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			setData(res?.data);
		} catch (err) {
			setData({});
			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data, loading, filterParams, setFilterParams, globalSearch, setGlobalSearch, typeOfSearch, setTypeOfSearch,
	};
};
export default useListOrganizationTradePartyDetails;
