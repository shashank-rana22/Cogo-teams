import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useUpdateEvent(props) {
	const { attributeList = [], eventListData = {} } = props;
	// const [{ loading }, trigger] = useAllocationRequest({
	// 	method  : 'POST',
	// 	url     : '/kam_expertise_event_configuration',
	// 	authkey : 'post_allocation_kam_expertise_event_configuration',
	// }, { manual: true });

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_rule_mapping',
		authkey : 'post_allocation_kam_expertise_event_rule_mapping',
	}, { manual: true });

	// const {
	// 	expertise_type : expertiseType,
	// 	group_name : groupName,
	// 	condition_name : conditionName,
	// 	event_state_on : eventStateOn,
	// 	description : eventDescription,
	// } = eventListData;

	const formProps = useForm({
		// defaultValues: {
		// 	expertise_type : expertiseType,
		// 	group_name     : groupName,
		// 	condition_name : conditionName,
		// 	event_state_on : eventStateOn,
		// 	description    : eventDescription,
		// },
	});

	// console.log('eventListData', eventListData);

	const onUpdate = async (formValues, e) => {
		e.preventDefault();
		console.log('formValues::', formValues);

		const {
			expertise_type, group_name, condition_name, event_state_on, description,
		} = formValues;

		try {
			const payloadAttribute = [];
			attributeList.forEach((res) => {
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

				// console.log('updateEvent', updateEvent);

				// formValues[Object.keys(formValues).find((response) => response === res?.name)]
				// console.log('obnject', Object.keys(res?.name));
			});
			const payload = {
                
			};

			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			console.log('error', error);
		}
	};

	return {
		onUpdate,
		formProps,
		getAddRuleControls,
		loading,
	};
}

export default useUpdateEvent;
