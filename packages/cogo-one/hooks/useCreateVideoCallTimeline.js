import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateVideoCallTimeline = () => {
	const profile = useSelector((state) => state.profile || {});

	const { id:loggedInAgentId = '' } = profile?.user || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const createVideoCallTimeline = ({ userCallId = '', leadUserId = '' }) => {
		const payload = {
			agent_id      : loggedInAgentId,
			user_id       : userCallId,
			provider_name : 'web_rtc',
			lead_user_id  : leadUserId,
			source        : 'cogoone',
			start_stamp   : formatDate({
				date       : new Date(),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
		};

		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	};
	// console.log(data, 'data098');
	return {
		createVideoCallTimeline,
		loading,
		videoCallId: data?.data?.id,
	};
};
export default useCreateVideoCallTimeline;
