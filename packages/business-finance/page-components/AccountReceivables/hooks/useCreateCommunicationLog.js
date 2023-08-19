import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({
	formData, organizationId, setShowLog, reset, refetch = () => {},
}) {
	const profile = useSelector((state) => state.profile || {});
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const {
		reminder, reminderDateTime, reminderType, attendee, title: formTitle, communicationResponse,
		summary, feedback: formFeedback, primaryAttendeeFromOrg, additionalAttendeeFromOrg, startDateTime, endDateTime,
	} = formData || {};

	const payload = {
		reminder_date            : reminderDateTime,
		is_reminder              : reminder === 'reminder',
		communication_type       : reminderType,
		agent_id                 : attendee,
		title                    : formTitle,
		user_id                  : primaryAttendeeFromOrg,
		additional_user_ids      : additionalAttendeeFromOrg,
		communication_summary    : summary,
		organization_id          : organizationId,
		partner_id               : profile?.partner?.id,
		communication_response   : communicationResponse,
		communication_start_time : formatDate({
			date       : startDateTime,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'dateTime',
			separator  : 'T',
		}),
		communication_end_time: formatDate({
			date       : endDateTime,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'dateTime',
			separator  : 'T',
		}),
		feedback: formFeedback?.map((singleFeedback) => ({
			feedback_type : singleFeedback?.feedback_type,
			feedback_data : [
				{
					general_feedback   : singleFeedback?.feedback_type,
					call_feedback      : singleFeedback?.call_feedback || undefined,
					payment_commitment : singleFeedback?.payment_commitment || undefined,
					obstacle_faced     : singleFeedback?.obstacle_faced || undefined,
					reminder_date      : singleFeedback?.reminder_date || undefined,
					commitment_date    : singleFeedback?.commitment_date || undefined,
					currency           : singleFeedback?.currency || undefined,
					price              : singleFeedback?.price?.toString() || undefined,
				},
			],
		})),

	};

	const createCommunicationLog = async () => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Saved Successfully');
			setShowLog(false);
			refetch();
			reset();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		createCommunicationLog,
		loading,
	};
}

export default useCreateCommunicationLog;
