import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useCreateNewEvent(props) {
	const {
		attributeList = [],
		// eventListData = {},
		listRefetch = () => {},
	} = props;
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_configuration',
		authkey : 'post_allocation_kam_expertise_event_configuration',
	}, { manual: true });

	const formProps = useForm();

	// console.log('eventListData', eventListData);

	const onSave = async (formValues, e) => {
		e.preventDefault();
		// console.log('formValues::', formValues);

		const {
			expertise_type, group_name, condition_name, event_state_on, description, attribute,
		} = formValues;

		// console.log('group_name', formValues);

		try {
			const payloadAttribute = [];
			attributeList.forEach((res) => {
				Object.keys(formValues).find((response) => {
					if (response === res?.name && formValues[response]) {
						// console.log('id:', res?.id);
						// console.log('param:', formValues[response]);
						payloadAttribute.push({
							rule_id   : res?.id,
							parameter : formValues[response],
						});
					}
				});

				console.log('payloadAttribute::', payloadAttribute);

				// formValues[Object.keys(formValues).find((response) => response === res?.name)]
				// console.log('object', Object.keys(res?.name));
			});
			const payload = {
				version_id : '123', // Todo ask for version_id logic
				expertise_type,
				group_name,
				condition_name,
				event_state_on,
				attributes : payloadAttribute,
				status     : 'draft',
				description,
				attribute,

			};

			console.log(payload);

			await trigger({
				data: payload,
			});
			listRefetch();
			Toast.success('Sucessfully Created!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			console.log('error', error);
		}
	};

	return {
		onSave,
		newEventFormProps: formProps,
		getAddRuleControls,
		loading,
	};
}

export default useCreateNewEvent;
