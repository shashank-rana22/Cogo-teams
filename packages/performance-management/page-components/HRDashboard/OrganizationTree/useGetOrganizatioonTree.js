import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationTree = ({ userId = '' }) => {
	const [params, setParams] = useState({ UserID: userId || undefined });

	const [{ data: treeData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_employee_data',
		method : 'GET',
		params,
	});

	useEffect(() => setParams({ UserID: userId || undefined }), [userId]);

	return { treeData, loading };
};

export default useGetOrganizationTree;
