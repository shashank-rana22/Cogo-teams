import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useListPartnerExpertises = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_partner_user_expertises',
		method : 'GET',
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					// page                   : pagination,
					location_data_required : true,
					filters                : {
						status       : 'active',
						service_type : 'lcl_freight',
						// partner_user_id : user_id,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		data,
		loading,
	};
};

export default useListPartnerExpertises;
