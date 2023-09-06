import { useForm } from '@cogoport/forms';

export function useScoringPlan() {
	const { control, formState: { errors }, handleSubmit } = useForm();

	// useEffect(() => {
	// 	if (!isEmpty(data)) {
	// 		const {
	// 			agent_id,
	// 			booking_source,
	// 			cogo_entity_id,
	// 			config_type,
	// 			organization_ids,
	// 			organization_type,
	// 			segment,
	// 			preferred_role_id,
	// 		} = data || {};

	// 		setValue('cogo_entity_id', cogo_entity_id);
	// 		setValue('config_type', config_type);
	// 		setValue('organization_ids', organization_ids);
	// 		setValue('organization_type', organization_type);
	// 		setValue('segment', segment);
	// 		setValue('agent_id', agent_id);
	// 		setValue('booking_source', booking_source);
	// 		setValue('preferred_role_id', preferred_role_id);
	// 	}
	// }, [data, setValue]);

	// useEffect(() => {
	// 	if (id) fetchList();
	// }, [id, fetchList]);

	// useEffect(() => {
	// 	if (orgSubType) {
	// 		const isValuePresent = orgSubTypeOptions[orgType].some((obj) => obj.value === orgSubType);
	// 		if (!isValuePresent) setValue('segment', undefined);
	// 	}
	// }, [orgSubType, orgType, setValue]);

	// useEffect(() => {
	// 	if (isEmpty(reportingManagerIds)) setValue('organization_ids', reportingManagerIds);
	// }, [reportingManagerIds, setValue]);

	// const isInputDisabled = (name) => {
	// 	if (name === 'agent_id' && isEmpty(cogoEntityId)) {
	// 		return true;
	// 	}
	// 	if (name === 'organization_ids' && isEmpty(reportingManagerIds)) {
	// 		return true;
	// 	}
	// 	if (name === 'cogo_entity_id' && !isEmpty(cogoEntityId)) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	return {
		control,
		errors,
		handleSubmit,
	};
}
