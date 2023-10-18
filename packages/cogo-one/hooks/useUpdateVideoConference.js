import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	groupId = '',
	groupMemberIds = [], userName = '', isGroup = '', searchName = '',
}) => ({
	meeting_id      : groupId,
	user_ids        : groupMemberIds,
	additional_data : {
		is_private : true,
		created_by : userName,
		team_name  : isGroup ? searchName : userName,
	},
	video_call_type   : 'live_call',
	video_call_action : 'create_meeting',
});

function useUpdateVideoConference() {
	const userName = useSelector(({ profile }) => profile?.user?.name);

	const [{ loading, data }, trigger] = useRequest(
		{
			url    : 'update_video_conference',
			method : 'post',
		},
		{ manual: true },
	);

	const updateVideoConference = async ({
		groupId = '',
		groupMemberIds = [],
		searchName = '',
		isGroup = false,
	}) => {
		try {
			await trigger({
				data: getPayload({
					groupId,
					groupMemberIds,
					userName,
					searchName,
					isGroup,
				}),
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		updateVideoConference,
		loading,
		data,
	};
}

export default useUpdateVideoConference;
