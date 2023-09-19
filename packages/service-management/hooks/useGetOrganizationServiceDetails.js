import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizationServiceDetails = () => {
	// const { general } = useSelector((state) => state);
	// console.log('GENERAL', general);

	const router = useRouter();
	const [data, setData] = useState({});
	const service_id = router?.asPath?.split('/')?.pop();

	const [{ loading }, trigger] = useRequest({
		url    : 'get_organization_service_details',
		params : { organization_service_id: service_id },
	}, { manual: true });
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data, loading, apiTrigger,
	};
};

export default useGetOrganizationServiceDetails;
