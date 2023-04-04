import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getAddRuleControls from '../configurations/get-add-rule-controls';

// Todo: send event_detail_id (id) instead of rule_mapping_id

function useUpdateEvent(props) {
	const {
		eventListData = {}, listRefetch = () => {}, attributeList = [],
		setEventListData = () => {},
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
		// rule_mapping_id : ruleMappingId,
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

	const controls = getAddRuleControls({ expertiseTypeWatch });

	const onUpdate = async (formValues, e) => {
		e.preventDefault();

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

		if (isEmpty(payloadAttribute)) {
			Toast.error('Enter Attribute Value');
		} else {
			try {
				const payload = {
					// rule_mapping_id : ruleMappingId,
					event_detail_id : eventDetailId,
					attributes      : payloadAttribute,
				};

				await trigger({
					data: payload,
				});

				setEventListData({
					data        : {},
					toggleEvent : 'eventList',
				});
				Toast.success('Sucessfully Updated Event!');
				listRefetch();
			} catch (error) {
				Toast.error(
					getApiErrorString(error?.response?.data)
						|| 'Unable to Update, Please try again!!',
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
