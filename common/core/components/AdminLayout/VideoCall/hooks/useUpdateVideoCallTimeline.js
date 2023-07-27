import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const THOUSANT_COUNT = 1000;
const ZERO_COUNT = 0;

const useUpdateVideoCallTimeline = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/outbound_call_hangup_missed_or_answered',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const updateVideoCallTimeline = useCallback(async ({
		callActivity = '',
		time:outBoundSec = 0, description = '', videoCallId,
	}) => {
		const updateCallData = {
			call_id      : videoCallId,
			call_status  : callActivity,
			hangup_cause : description,
			end_stamp    : formatDate({
				date       : new Date(),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
		};

		if (outBoundSec > ZERO_COUNT) {
			updateCallData.outbound_sec = outBoundSec / THOUSANT_COUNT;
		}

		const payload = {
			webhook       : updateCallData,
			provider_name : 'web_rtc',
		};

		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	}, [trigger]);

	return {
		updateVideoCallTimeline,
		loading,
	};
};
export default useUpdateVideoCallTimeline;
