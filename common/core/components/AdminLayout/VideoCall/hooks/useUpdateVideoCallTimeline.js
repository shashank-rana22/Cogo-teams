import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const THOUSAND_COUNT = 1000;
const ZERO_COUNT = 0;

const getPayload = ({
	callActivity = '',
	duration = 0,
	description = '',
	videoCallId = '',
	createdAt = '',
}) => {
	const payload = {
		call_id      : videoCallId,
		call_status  : callActivity,
		hangup_cause : description,
		end_stamp    : formatDate({
			date       : new Date(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		}),
		start_stamp: formatDate({
			date       : new Date(createdAt),
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		}),
	};

	if (duration > ZERO_COUNT) {
		payload.outbound_sec = duration / THOUSAND_COUNT;
	}

	return payload;
};

const useUpdateVideoCallTimeline = ({ callDetails }) => {
	const { created_at :createdAt = '' } = callDetails?.callingRoomDetails || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/outbound_call_hangup_missed_or_answered',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const updateVideoCallTimeline = useCallback(async ({
		callActivity = '',
		duration = 0,
		description = '',
		videoCallId = '',
	}) => {
		const payload = {
			webhook       : getPayload({ callActivity, duration, description, videoCallId, createdAt }),
			provider_name : 'web_rtc',
		};

		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	}, [createdAt, trigger]);

	return {
		updateVideoCallTimeline,
		loading,
	};
};

export default useUpdateVideoCallTimeline;
