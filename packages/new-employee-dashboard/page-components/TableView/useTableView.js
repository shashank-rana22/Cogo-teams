import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getColumns from './getColumns';

const useTableView = ({ search }) => {
	const router = useRouter();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_employee_details',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							q: search,
						},
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[search, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch, search]);

	const onClickNewJoinerColumn = (id) => {
		router.push(`/new-employee-dashboard/${id}`, `/new-employee-dashboard/${id}`);
	};

	const columns = getColumns({ onClickNewJoinerColumn });

	return {
		columns,
		loading,
		list: data?.list || [],
	};
};

export default useTableView;
