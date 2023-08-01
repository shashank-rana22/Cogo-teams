import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

const getPayload = ({ userCallId = '', leadUserId = '' }, loggedInAgentId) => {
	const payload = {
		agent_id      : loggedInAgentId,
		user_id       : userCallId,
		provider_name : 'web_rtc',
		lead_user_id  : leadUserId,
		source        : 'cogo_one',
		start_stamp   : formatDate({
			date       : new Date(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		}),
	};

	return payload;
};

const useCreateVideoCallTimeline = ({ formattedData = {} }) => {
	const profile = useSelector((state) => state.profile || {});

	const dispatch = useDispatch();

	const { id: loggedInAgentId = '' } = profile?.user || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const { user_id, user_name } = formattedData || {};

	const createVideoCallTimeline = useCallback(async ({ userCallId = '', leadUserId = '' }) => {
		const payload = getPayload({ userCallId, leadUserId }, loggedInAgentId);

		try {
			const res = await trigger({ data: payload });

			if (res?.data?.call_record_id) {
				dispatch(
					setProfileState({
						video_call_recipient_data: {
							user_id,
							user_name,
						},
						is_in_video_call : true,
						video_call_id    : res?.data?.call_record_id,
					}),
				);
			}
		} catch (e) {
			console.error(e);
		}
	}, [dispatch, loggedInAgentId, trigger, user_id, user_name]);

	return {
		createVideoCallTimeline,
		loading,
		videoCallId: data?.call_record_id || '',
	};
};

export default useCreateVideoCallTimeline;
