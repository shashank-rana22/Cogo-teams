import TIMELINE_EDITABLE from '../config/timelineEditable.json';

export function canEditSchedule({ primary_service = {}, stakeholderConfig = {} }) {
	const stateCheck = TIMELINE_EDITABLE.primary_service.state
		.includes(primary_service?.state);

	const keyPresenceCheck = TIMELINE_EDITABLE.primary_service.key_present_check
		.every((key) => !!primary_service?.[key]);

	const canUserEdit = !!stakeholderConfig?.timeline?.can_edit;

	return canUserEdit && (stateCheck || keyPresenceCheck);
}
