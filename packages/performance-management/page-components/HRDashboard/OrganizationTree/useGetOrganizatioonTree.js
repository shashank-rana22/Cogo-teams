import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetOrganizationTree = () => {
	const [params, setParams] = useState({
		Ceos: true,
	});

	const [{ data: treeData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_employees',
		method : 'get',
		params,
	}, { manual: false });

	const refetchTreeParams = () => {
		setParams((pv) => {
			const { ManagerIDS = '' } = pv;
			const previousList = ManagerIDS.split(',').filter((i) => i);

			const newUserId = previousList[previousList.length - 1];
			const newManagerList = previousList.slice(0, -1);

			return {
				UserID     : newUserId,
				ManagerIDS : newManagerList.join(','),
			};
		});
	};

	return { treeData, loading, refetchTreeParams, params, setParams };
};

export default useGetOrganizationTree;
