import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetServiceWiseDetails = ({ organizationId = '', entityCode = '' }) => {
	const [{ data, loading }, trigger] = useRequestBf({
		url    : '/payments/outstanding/service-wise-outstanding',
		method : 'get',
	}, { manual: true });

	const getServiceWiseDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					organizationId,
					entityCode,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [organizationId, entityCode, trigger]);

	useEffect(() => {
		getServiceWiseDetails();
	}, [getServiceWiseDetails]);

	return {
		serviceWiseDetailsLoading : loading,
		serviceWiseData           : data,
		getServiceWiseDetails,
	};
};

export default useGetServiceWiseDetails;
