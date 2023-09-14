import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useListOrganizationUsers({ consigneeShipperId = '' }) {
	const [data, setData] = useState({});
	const [defaultValues, setDefaultValues] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'GET',
		params : {
			filters: {
				organization_id : consigneeShipperId,
				status          : 'active',
			},
		},
	}, { manual: false });

	const getListOrganizations = useCallback(
		async () => {
			try {
				const res = await trigger();

				const pocData = res?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index];
				const { business_name = '' } = pocData?.organization || {};

				setData(pocData);

				setDefaultValues({
					business_name,
					name          : pocData?.name,
					email         : pocData?.email,
					mobile_number : {
						number       : pocData?.mobile_number,
						country_code : pocData?.mobile_country_code,
					},
				});
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
		data,
		defaultValues,
		getListOrganizations,
	};
}

export default useListOrganizationUsers;
