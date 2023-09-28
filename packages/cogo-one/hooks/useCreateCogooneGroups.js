import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { getPublishRoomPayload } from '../helpers/cogooneGroupPayloadHelper';

const getPayload = ({
	activeTab = {},
	loggedInAgentId = '',
}) => {
	const payloadData = getPublishRoomPayload({ activeTab, loggedInAgentId });

	const { data = {} } = activeTab || {};

	const {
		group_members_ids = [],
		group_name = 'Draft Name',
	} = data || {};

	return {
		name        : group_name,
		users       : group_members_ids,
		action_name : 'add_to_group',
		metadata    : {
			data: payloadData,
		},
	};
};

function useCreateCogooneGroups({ activeTab = {} }) {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const [, trigger] = useRequest({
		url    : '/update_cogoone_groups',
		method : 'post',
	}, { manual: true });

	const createOrGetCogooneGroup = async () => {
		const { data = {} } = activeTab || {};

		const {
			group_id = '',
		} = data || {};

		if (group_id) {
			return group_id;
		}

		const res = await trigger({
			data: getPayload({ activeTab, loggedInAgentId }),
		});

		return res?.data?.id;
	};

	return {
		createOrGetCogooneGroup,
	};
}

export default useCreateCogooneGroups;
