import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useCreateNewEvent(props) {
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_configuration',
		authkey : 'post_allocation_kam_expertise_event_configuration',
	}, { manual: true });
	const formProps = useForm();

	const onSave = async (formValues, e) => {
		e.preventDefault();
		console.log('formValues', formValues);

		const {
			expertise_type, group_name, condition_name, event_state_on, description,
		} = formValues;

		try {
			const payloadAttribute = [];
			props.forEach((res) => {
				Object.keys(formValues).find((response) => {
					if (response === res?.name) {
						console.log('id:', res?.id);
						console.log('param:', formValues[response]);
						payloadAttribute.push({
							rule_id   : res?.id,
							parameter : formValues[response],
						});
					}
				});

				console.log('payloadAttribute::', payloadAttribute);

				// formValues[Object.keys(formValues).find((response) => response === res?.name)]
				// console.log('obnject', Object.keys(res?.name));
			});
			const payload = {
				version_id : '123',
				expertise_type,
				group_name,
				condition_name,
				event_state_on,
				attributes : payloadAttribute,
				status     : 'draft',
				description,

			};

			await trigger({
				data: payload,
			});

			Toast.success('It works now');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			console.log('error', error);
		}
	};

	return {
		onSave,
		formProps,
		getAddRuleControls,
		loading,
	};
}

export default useCreateNewEvent;
