import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateAllocationKamExpertiseEventScoring(props) {
	const { onClose, refetch } = props;

	const formProps = useForm({
		defaultValues: {
			scoring_type : '', // Todo based on expertise
			milestones   : [{
				milestone : '',
				score     : '',
			}],
			tat: [{
				lower_limit : '',
				upper_limit : '',
				score       : '',
			}],
		},
	});

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_event_scoring',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_event_scoring',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			event_configuration_rule_mapping_id,
			impact,
			scoring_type,
			milestones,
			tat,
			score_on_completion,
			score_on_repetition,
		} = formValues;

		// Todo Format Values

		try {
			const payload = {
				event_configuration_rule_mapping_id,
				impact,
				scoring_type,
				scoring_criteria: (scoring_type === 'percentage' && milestones)
				|| (scoring_type === 'tat' && tat)
				|| (scoring_type === 'absolute' && [{
					score_on_completion,
					score_on_repetition,
				}]) || [],
			};

			console.log('payload', payload);

			await trigger({ data: payload });

			onClose();

			Toast.success('Condition Added Successfully');

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createConditionloading: loading,
		formProps,
		onSave,
	};
}

export default useCreateAllocationKamExpertiseEventScoring;
