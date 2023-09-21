import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

import getIncidentReOpenJobPayload from '../utils/getIncidentReOpenJobPayload';

const useIncidentReOpenJob = ({
	shipmentData = {},
	refetch = () => {},
}) => {
	const { user_id = '' } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [{ loading = false }, trigger] = useRequestBf({
		url     : '/incident-management/incident',
		method  : 'POST',
		authKey : 'post_incident_management_incident',
	}, { manual: true });

	const onReOpenJob = async (values) => {
		try {
			const payload = getIncidentReOpenJobPayload({ values, shipmentData, user_id });

			await trigger({
				data: payload,
			});

			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		onReOpenJob,
	};
};

export default useIncidentReOpenJob;
