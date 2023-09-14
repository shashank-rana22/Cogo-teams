import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetContactList = () => {
	const { query } = useRouter();
	const { branch_id = '' } = query || {};

	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'list_saas_subscription_poc_details',
	}, { manual: true });

	const fetchContactList = useCallback((pageNo = 1) => {
		try {
			trigger({
				params: {
					organization_branch_id: branch_id,
				},
				page       : pageNo,
				page_limit : 7,
			});
		} catch (err) {
			console.error(err);
		}
	}, [branch_id, trigger]);

	useEffect(() => {
		fetchContactList(page);
	}, [fetchContactList, page]);

	return {
		loading, data, setPage, fetchContactList,
	};
};
export default useGetContactList;
