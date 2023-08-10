import TIMELINE_EDITABLE from '../config/timelineEditable.json';

export function canEditSchedule({ primary_service = {}, stakeholderConfig = {} }) {
	const stateCheck = TIMELINE_EDITABLE.primary_service.state
		.includes(primary_service?.state);

	const canUserEdit = !!stakeholderConfig?.timeline?.can_edit;

	return canUserEdit && stateCheck;
}
