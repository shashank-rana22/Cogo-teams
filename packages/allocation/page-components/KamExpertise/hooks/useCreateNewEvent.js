import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { snakeCase } from '@cogoport/utils';

function useCreateNewEvent(props) {
	const {
		attributeList = [],
		listRefetch = () => {},
		setEventListData = () => {},
	} = props;

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_configuration',
		authkey : 'post_allocation_kam_expertise_event_configuration',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			expertise_type, group_name, condition_name, event_state_on, description, attribute,
		} = formValues;

		const payloadAttribute = [];
		attributeList.forEach((res) => {
			Object.keys(formValues).forEach((response) => {
				if (response === res?.name && formValues[response]) {
					payloadAttribute.push({
						rule_id   : res?.id,
						parameter : formValues[response],
					});
				}
			});
		});

		if (payloadAttribute.length === 0) {
			Toast.default('Enter Attribute Value');
		} else {
			try {
				const payload = {
					expertise_type : snakeCase(expertise_type || '') || undefined,
					group_name     : group_name || undefined,
					condition_name : condition_name || undefined,
					event_state_on,
					attributes     : payloadAttribute,
					description,
					attribute,

				};

				await trigger({
					data: payload,
				});

				Toast.success('Event Successfully Created!');
				listRefetch();
				setEventListData({
					data        : {},
					toggleEvent : 'eventList',
				});
			} catch (error) {
				Toast.error(
					getApiErrorString(error?.response?.data)
								|| 'Unable to Create Event, Please try again!!',
				);
			}
		}
	};

	return {
		onSave,
		loading,
	};
}

export default useCreateNewEvent;
