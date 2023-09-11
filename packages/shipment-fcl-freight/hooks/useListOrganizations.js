import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useListOrganizations({ shipment_data = {} }) {
	const [listData, setListData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organizations',
		method : 'GET',
		params : {
			organization_id: shipment_data?.consignee_shipper_id,
		},
	}, { manual: true });

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
