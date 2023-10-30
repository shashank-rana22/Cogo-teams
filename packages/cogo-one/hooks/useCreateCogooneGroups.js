import { useRequest } from '@cogoport/request';

const getPayload = ({
	activeTab = {},
}) => {
	const { data = {} } = activeTab || {};

	const {
		group_members_ids = [],
		search_name = '',
		id = '',
	} = data || {};

	return {
		name           : search_name,
		users          : group_members_ids,
		action_name    : 'add_to_group',
		draft_group_id : id,
	};
};

function useCreateCogooneGroups({ activeTab = {} }) {
	const [, trigger] = useRequest({
		url    : '/update_cogoone_groups',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const createOrGetCogooneGroup = async () => {
		const { data = {} } = activeTab || {};

		const {
			group_id = '',
		} = data || {};

		if (group_id) {
			return group_id;
		}

		const res = await trigger({
			data: getPayload({ activeTab }),
		});

		return res?.data?.id;
	};

	return {
		createOrGetCogooneGroup,
	};
}

export default useCreateCogooneGroups;
