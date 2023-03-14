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

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			expertise_type, group_name, condition_name, event_state_on, description, attribute,
		} = formValues;

		try {
			const payloadAttribute = [];
			attributeList.forEach((res) => {
				Object.keys(formValues).find((response) => {
					if (response === res?.name && formValues[response]) {
						payloadAttribute.push({
							rule_id   : res?.id,
							parameter : formValues[response],
						});
					}
				});
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

			await trigger({
				data: payload,
			});
			listRefetch();
			Toast.success('Sucessfully Created!');
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data)
					|| 'Unable to Create Event, Please try again!!',
			);
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
