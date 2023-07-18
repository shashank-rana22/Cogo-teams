import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetShareUserList = ({ org_id }) => {
	const [search, setSearch] = useState('');

	const [typeOfUsers, setTypeOfUsers] = useState('active');

	const handleSearch = (val = '') => {
		setSearch(val);
	};

	const [{ loading, data: orgData }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'GET',
		params : {
			filters: {
				organization_id : org_id,
				status          : typeOfUsers,
			},
		},
	}, { manual: true });

	const getUserData = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			// toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);
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
