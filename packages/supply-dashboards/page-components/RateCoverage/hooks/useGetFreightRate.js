import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

import paramsMapping from '../utilis/formatFreightRate';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	air_customs : 'get_air_customs_rate',
	fcl_customs : 'get_fcl_customs_rate',
	haulage     : 'get_haulage_freight_rate',
	lcl_freight : 'get_lcl_freight_rate',
	lcl_customs : 'get_lcl_customs_rate',
	fcl_cfs     : 'get_fcl_cfs_rate',
};

const useGetFreightRate = ({ filter, formValues, cardData }) => {
	const endPoint = API_NAME[filter?.service];

	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { id } = partner;
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const formattedParams = paramsMapping({ filter, cardData, formValues });

	const getFreightRate = useCallback(async () => {
		try {
			await trigger({
				params: {
					id             : cardData?.id,
					commodity      : formValues?.commodity || cardData?.commodity,
					container_size : formValues?.container_size || cardData?.container_size,
					container_type : formValues?.container_type || cardData?.container_type,
					cogo_entity_id : id || undefined,
					...formattedParams,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, JSON.stringify(formattedParams)]);

	useEffect(() => {
		getFreightRate();
	}, [getFreightRate]);

	return {
		data,
		loading,
	};
};

export default useGetFreightRate;
