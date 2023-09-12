import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useListOrganizations({ orgId = '' }) {
	const [listData, setListData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organizations',
		method : 'GET',
		params : {
			filters: {
				organization_id: orgId,
			},
		},
	}, { manual: false });

	const getListOrganizations = useCallback(
		async () => {
			try {
				const res = await trigger();

				setListData(res?.data || {});
			} catch (error) {
				toastApiError(error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		getListOrganizations();
	}, [getListOrganizations]);

	return {
		loading,
		listData,
		getListOrganizations,
	};
}

export default useListOrganizations;
