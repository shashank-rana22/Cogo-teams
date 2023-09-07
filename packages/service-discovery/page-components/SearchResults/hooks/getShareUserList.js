import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetShareUserList = ({ org_id }) => {
	const [search, setSearch] = useState('');
	const [typeOfUsers, setTypeOfUsers] = useState('active');

	const { query = '', debounceQuery } = useDebounceQuery();

	const handleSearch = (val = '') => {
		setSearch(val);
	};

	const [{ loading, data: orgData }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'GET',
		params : {
			filters: {
				q               : query || undefined,
				organization_id : org_id,
				status          : typeOfUsers,
			},
		},
	}, { manual: true });

	const getUserData = useCallback(async () => {
		try {
			await trigger();
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	}, [trigger]);

	useEffect(() => {
		getUserData();
	}, [getUserData, search]);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const { list = [] } = orgData || {};

	return {
		list,
		typeOfUsers,
		setTypeOfUsers,
		loading,
		search,
		handleSearch,
	};
};

export default useGetShareUserList;
