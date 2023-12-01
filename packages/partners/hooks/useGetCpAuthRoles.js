import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetCpAuthRoles = () => {
	const geo = getGeoConstants();
	const [apiData, setApiData] = useState({});
	const [, trigger] = useRequest({
		url    : '/list_roles',
		method : 'GET',
		params : {
			page_limit                : 200,
			permissions_data_required : false,
			filters                   : {
				stakeholder_id : geo.uuid.parent_entity_id,
				name           : ['CP Admin', 'CP Sales Agent'],
				status         : true,
			},
		},
	}, { manual: true });
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data: apiData,
	};
};
export default useGetCpAuthRoles;
