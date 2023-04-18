import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetOrganizationTree = ({ viewType = false }) => {
	const [params, setParams] = useState({
		Ceos          : viewType || undefined,
		Page          : !viewType ? 1 : undefined,
		PageLimit     : !viewType ? 50 : undefined,
		IncludingCeos : !viewType ? true : undefined,
	});

	const [{ data: treeData = {}, loading = false }, trigger] = useIrisRequest({
		url    : viewType ? 'get_iris_get_employees' : 'get_iris_list_reportees',
		method : 'get',
		params,
	}, { manual: false });

	const refetchList = () => {
		trigger({ params });
	};

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

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	return { treeData, loading, refetchTreeParams, params, setParams, setPage, refetchList };
};

export default useGetOrganizationTree;
