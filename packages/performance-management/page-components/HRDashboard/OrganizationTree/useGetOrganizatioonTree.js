import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationTree = ({ userId = '' }) => {
	const [params, setParams] = useState({ UserID: userId || undefined });

	const [{ data: treeData = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_get_employees',
		method : 'get',
		params,
	}, { manual: false });

	const fetchTreeData = async () => {
		try {
			await trigger({ params });
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	useEffect(() => setParams({ UserID: userId || undefined, Ceos: true }), [userId]);

	return { treeData, loading, fetchTreeData };
};

export default useGetOrganizationTree;
