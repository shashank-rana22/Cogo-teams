import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGE_VALUE = 1;

const useListOrganizationAssets = ({ id, assetIds = [] }) => {
	const [page, setPage] = useState(DEFAULT_PAGE_VALUE);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_assets',
		method : 'GET',
	});

	const getData = useCallback(async () => {
		if (!assetIds?.length) return;
		try {
			await trigger({
				params: {
					filters: {
						organization_id : id,
						status          : 'active',
						id              : assetIds,
					},
					page_limit: 20,
					page,
				},
			});
		} catch (e) {
			console.error(e);
		}
	}, [assetIds, id, page, trigger]);

	useEffect(() => {
		if (id) {
			getData();
		}
	}, [id, getData]);

	return {
		loading,
		data,
		getData,
		setPage,
	};
};

export default useListOrganizationAssets;
