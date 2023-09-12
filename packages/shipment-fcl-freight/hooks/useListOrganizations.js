import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useListOrganizations({ orgId = '' }) {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'GET',
		params : {
			filters: {
				organization_id  : orgId,
				trade_party_type : 'self',
			},
		},
	}, { manual: false });

	const getListOrganizations = useCallback(
		async () => {
			try {
				const res = await trigger();

				setData(res?.data || {});
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
		listData: data?.list?.[GLOBAL_CONSTANTS.zeroth_index],
		getListOrganizations,
	};
}

export default useListOrganizations;
