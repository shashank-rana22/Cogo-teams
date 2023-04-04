import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

// Todo :  take just id and push with name : "event_configuration_detail_id"

function useCreateAllocationKamExpertiseEventScoring(props) {
	const { onClose, expertiseRefetch, cardRefetch } = props;

	const formProps = useForm({
		defaultValues: {
			scoring_type : '',
			milestones   : [{
				percentage : '',
				score      : '',
			}],
			tat: [{
				lower : '',
				upper : '',
				score : '',
			}],
		},
	});

	const { reset, clearErrors } = formProps;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_event_scoring',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_event_scoring',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			event_configuration_rule_mapping_id,
			event_configuration_detail_id,
			impact,
			scoring_type,
			milestones,
			tat,
			first_completion,
			second_completion,
		} = formValues;

		const SCORING_TYPE = {
			percentage : milestones,
			tat,
			absolute   : [{
				first_completion,
				second_completion,
			}],
		};

		try {
			const payload = {
				event_configuration_rule_mapping_id,
				event_configuration_detail_id,
				impact,
				scoring_type,
				scoring_criteria: SCORING_TYPE[scoring_type] || [],
			};

			await Promise.all([trigger({ data: payload }), reset()]);
			clearErrors();

			onClose();

			Toast.success('Condition Added Successfully');

			expertiseRefetch();
			cardRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createConditionloading: loading,
		formProps,
		onSave,
		onClose,
	};
}

export default useCreateAllocationKamExpertiseEventScoring;
