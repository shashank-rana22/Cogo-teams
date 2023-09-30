import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

// const getPayload = ({
// 	activeTab = {},
// 	loggedInAgentId = '',
// }) => {
// 	const payloadData = getPublishRoomPayload({ activeTab, loggedInAgentId });

// 	const { data = {} } = activeTab || {};

// 	const {
// 		group_members_ids = [],
// 		search_name = 'Draft Name',
// 	} = data || {};

// 	return {
// 		name        : search_name,
// 		users       : group_members_ids,
// 		action_name : 'add_to_group',
// 		metadata    : {
// 			data: payloadData,
// 		},
// 	};
// };

function useUpdateCogooneGroup({ activeTab = {} }) {
	console.log('activeTab', activeTab);
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);
	console.log('loggedInAgentId', loggedInAgentId);

	const [, trigger] = useRequest({
		url    : '/update_cogoone_groups',
		method : 'post',
	}, { manual: true });

	const updateCogooneGroup = async () => {
		await trigger();
	};

	return {
		updateCogooneGroup,
	};
}

export default useUpdateCogooneGroup;
