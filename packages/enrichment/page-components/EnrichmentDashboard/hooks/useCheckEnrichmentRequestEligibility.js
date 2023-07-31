import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useCheckEnrichmentRequestEligibility = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const { user: { id: user_id = '' } } = profile;

	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : '/feedback_request_enrichment_eligibility',
		method  : 'get',
		authkey : 'get_allocation_feedback_request_enrichment_eligibility',
		params  : {
			user_id,
		},
	}, { manual: true });

	const refetchStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						user_id,
					},
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [trigger, user_id]);

	return {
		loading,
		stats: data,
		refetchStats,
	};
};

export default useCheckEnrichmentRequestEligibility;
