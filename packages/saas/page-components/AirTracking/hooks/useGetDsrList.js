import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetDsrList = ({ showConfigure }) => {
	const [page, setPage] = useState(1);

	const { query } = useRouter();
	const { branch_id = '' } = query || {};
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_saas_dsr',
	}, { manual: true });

	const getDsrList = useCallback((pageNo = 1) => {
		try {
			trigger({
				params: {
					filters: {
						organization_branch_id: branch_id,
					},
					page       : pageNo,
					page_limit : 7,
				},
			});
		} catch (err) {
			console.error(err, 'err');
		}
	}, [branch_id, trigger]);

	useEffect(() => {
		if (showConfigure) {
			getDsrList(page);
		}
	}, [page, getDsrList, showConfigure]);

	return { data, loading, setPage, getDsrList };
};

export default useGetDsrList;
