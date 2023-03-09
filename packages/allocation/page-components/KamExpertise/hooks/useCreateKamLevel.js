import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateKamLevel() {
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration',
		authkey : 'post_allocation_kam_expertise_configuration',
	}, { manual: true });

	const onCreate = async () => {
		try {
			const payload = {
				transition_level      : 3,
				configuration_type    : 'KAM',
				configuration_details : [
					{
						expertise_type       : 'Customer Expertise',
						threshold_score      : 11,
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Trade Expertise',
						threshold_score      : 12,
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Commodity Expertise',
						threshold_score      : 13,
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Misc Expertise',
						threshold_score      : 14,
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : 15,
						threshold_score_type : 'Retained Account Count',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : 16,
						threshold_score_type : 'Retained Account Min Duration',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : 17,
						threshold_score_type : 'Minimum Transacting Accounts',
					},
				],
			};
			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};
	return {
		loading,
		onCreate,
	};
}

export default useCreateKamLevel;
