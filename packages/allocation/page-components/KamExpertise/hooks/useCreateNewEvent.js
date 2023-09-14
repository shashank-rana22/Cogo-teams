import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty, snakeCase } from '@cogoport/utils';

function useCreateNewEvent(props) {
	const {
		attributeList = [],
		listRefetch = () => {},
		setEventListData = () => {},
		t = () => {},
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

		const PAYLOAD_ATTRIBUTE = [];
		attributeList.forEach((res) => {
			Object.keys(formValues).forEach((response) => {
				if (response === res?.name && !isEmpty(formValues[response] || [])) {
					PAYLOAD_ATTRIBUTE.push({
						rule_id   : res?.id,
						parameter : Array.isArray(formValues[response]) ? formValues[response] : [formValues[response]],
					});
				}
			});
		});

		if (PAYLOAD_ATTRIBUTE.length === GLOBAL_CONSTANTS.zeroth_index) {
			Toast.default(t('allocation:enter_attribute_value'));
		} else {
			try {
				const payload = {
					expertise_type : snakeCase(expertise_type || '') || undefined,
					group_name     : group_name || undefined,
					condition_name : condition_name || undefined,
					event_state_on,
					attributes     : PAYLOAD_ATTRIBUTE,
					description,
					attribute,

				};

				await trigger({
					data: payload,
				});

				Toast.success(t('allocation:event_successfully_created_toast'));
				listRefetch();
				setEventListData({
					data        : {},
					toggleEvent : 'eventList',
				});
			} catch (error) {
				Toast.error(
					getApiErrorString(error?.response?.data)
					|| t('allocation:unable_to_create_event'),
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
