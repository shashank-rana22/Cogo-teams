import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useUpdateEvent(props) {
	const {
		eventListData = {}, listRefetch = () => {}, attributeList = [],
		setEventListData = () => {},
		t = () => {},
	} = props;

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_rule_mapping',
		authkey : 'post_allocation_kam_expertise_event_rule_mapping',
	}, { manual: true });

	const { data : eventData } = eventListData;
	const {
		expertise_type : expertiseType,
		group_name : groupName,
		condition_name : conditionName,
		event_state_on : eventStateOn,
		description : eventDescription,
		id : eventDetailId,
	} = eventData;

	const formProps = useForm({
		defaultValues: {
			expertise_type : expertiseType,
			group_name     : groupName,
			condition_name : conditionName,
			event_state_on : eventStateOn,
			description    : eventDescription,
		},
	});

	const { watch } = formProps;

	const expertiseTypeWatch = watch('expertise_type');

	const controls = getAddRuleControls({ expertiseTypeWatch, t });

	const onUpdate = async (formValues, e) => {
		e.preventDefault();

		const PAYLOAD_ATTRIBUTE = [];
		attributeList.forEach((res) => {
			Object.keys(formValues).forEach((response) => {
				if (response === res?.name && formValues[response]) {
					PAYLOAD_ATTRIBUTE.push({
						rule_id   : res?.id,
						parameter : formValues[response],
					});
				}
			});
		});

		if (isEmpty(PAYLOAD_ATTRIBUTE)) {
			Toast.error(t('allocation:enter_attribute_value'));
		} else {
			try {
				const payload = {
					event_detail_id : eventDetailId,
					attributes      : PAYLOAD_ATTRIBUTE,
				};

				await trigger({
					data: payload,
				});

				setEventListData({
					data        : {},
					toggleEvent : 'eventList',
				});

				Toast.success(t('allocation:event_successfully_updated_toast'));
				listRefetch();
			} catch (error) {
				Toast.error(
					getApiErrorString(error?.response?.data)
						|| t('allocation:unable_to_update_event'),
				);
			}
		}
	};

	return {
		onUpdate,
		formProps,
		controls,
		loading,
	};
}

export default useUpdateEvent;
