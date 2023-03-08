import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateKamScores() {
	// const formProps = useForm();
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_bulk_configuration',
		authkey : 'post_allocation_kam_expertise_bulk_configuration',
	});

	const onSave = async (e) => {
		e.preventDefault();

		try {
			const payload = [
				{
					transition_level     : 1,
					config_type          : 'KAM',
					expertise_type       : 'Customer Expertise',
					threshold_score      : 80,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
			];
			// const payload = [{
			// 	transition_level     : 2,
			// 	config_type          : 'KAM',
			// 	expertise_type       : 'Customer Expertise',
			// 	threshold_score      : 80,
			// 	threshold_score_type : 'score',
			// 	description          : 'Trade',
			// 	status               : 'active',
			// }, {
			// 	transition_level     : 3,
			// 	config_type          : 'KAM',
			// 	expertise_type       : 'Trade Expertise',
			// 	threshold_score      : 90,
			// 	threshold_score_type : 'Score',
			// 	description          : 'Trade',
			// 	status               : 'active',
			// }];

			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};

	return {
		loading,
		onSave,
	};
}

export default useUpdateKamScores;
