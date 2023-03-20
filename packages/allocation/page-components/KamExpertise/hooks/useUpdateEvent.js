import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useUpdateEvent(props) {
	const ATTRIBUTE_MAPPING = {

		account  : 'account_attribute',
		shipment : 'shipment_attribute',
		misc     : 'misc_attribute',
	};

	const {
		updateEventListData = {}, listRefetch = () => {}, attributeList = [], setToggleEvent = () => {},
	} = props;

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_event_rule_mapping',
		authkey : 'post_allocation_kam_expertise_event_rule_mapping',
	}, { manual: true });

	const {
		expertise_type : expertiseType,
		group_name : groupName,
		condition_name : conditionName,
		event_state_on : eventStateOn,
		description : eventDescription,
		rule_mapping_id : ruleMappingId,
		rules,
	} = updateEventListData;

	console.log('updateEventListData', updateEventListData);

	const formProps = useForm({
		defaultValues: {
			expertise_type : expertiseType,
			group_name     : groupName,
			condition_name : conditionName,
			event_state_on : eventStateOn,
			description    : eventDescription,
			attribute      : ATTRIBUTE_MAPPING[rules?.[0]?.rule_type],
		},
	});

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
		if (payloadAttribute.length === 0) {
			Toast.error('Enter Attribute Value');
		} else {
			try {
				const payload = {
					rule_mapping_id : ruleMappingId,
					attributes      : payloadAttribute,
				};

				await trigger({
					data: payload,
				});

				setToggleEvent('eventList');
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
		getAddRuleControls,
		loading,
	};
}

export default useUpdateEvent;
