import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getCookie } from '@cogoport/utils';

const getPayload = ({
	groupId = '',
	groupMemberIds = [], userName = '', isGroup = false, searchName = '',
}) => ({
	meeting_id      : groupId,
	user_ids        : groupMemberIds,
	additional_data : {
		is_private : true,
		created_by : userName,
		team_name  : isGroup ? searchName : userName,
		is_group   : isGroup,
	},
	video_call_type   : 'live_call',
	video_call_action : 'create_meeting',
});

function useUpdateVideoConference() {
	const userName = useSelector(({ profile }) => profile?.user?.name);

	const [{ loading }, trigger] = useRequest(
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
			const res = await trigger({
				data: getPayload({
					groupId,
					groupMemberIds,
					userName,
					searchName,
					isGroup,
				}),
			});

			const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
			window.open(`${res?.data?.join}&auth=${token}`, '_blank');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		updateVideoConference,
		loading,
	};
}

export default useUpdateVideoConference;
