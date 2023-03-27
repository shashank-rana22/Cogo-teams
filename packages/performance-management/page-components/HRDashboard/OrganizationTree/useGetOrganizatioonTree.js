import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationTree = () => {
	const [params, setParams] = useState({
		Ceos: true,
	});

	const [{ data: treeData = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_get_employees',
		method : 'get',
		params,
	}, { manual: false });

	const fetchTreeData = () => {
		try {
			trigger({ params });
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	return { treeData, loading, fetchTreeData, params, setParams };
};

export default useGetOrganizationTree;
