import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCheckEnrichmentRequestEligbility = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const { user: { id: user_id = '' } } = profile;

	const [{ loading, data }] = useAllocationRequest({
		url     : '/feedback_request_enrichment_eligibility',
		method  : 'get',
		authkey : 'get_allocation_feedback_request_enrichment_eligibility',
		params  : {
			user_id,
		},
	}, { manual: false });

	return {
		loadingCheckEligibility : loading,
		enrichmentData          : data,
	};
};

export default useCheckEnrichmentRequestEligbility;
