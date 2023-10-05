import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const getUniqData = ({ array = [], uniqOnkey = '' }) => {
	const uniqHash = array?.reduce(
		(
			acc,
			item,
		) => (
			{ ...acc, [item?.[uniqOnkey]]: item }),
		{},
	);

	return Object.values(uniqHash || {});
};

const PAYLOAD_MAPPING = {
	ADD_TO_GROUP: ({ data = {}, userIds = [], userIdsData = [] }) => {
		const { group_members_ids, group_members_data = [] } = data || {};
		const updatedGroupMembers = [...new Set([...group_members_ids, ...userIds])];

		const uniqMembersData = getUniqData(
			{
				array     : [...(group_members_data || []), ...(userIdsData || [])],
				uniqOnkey : 'id',
			},
		);

		return {
			group_members_ids  : updatedGroupMembers,
			updated_at         : Date.now(),
			group_members_data : uniqMembersData,
		};
	},

	REMOVE_FROM_GROUP: ({ data, userIds = [] }) => {
		const {
			group_members_ids = [],
			group_members_data = [],
		} = data || {};

		const [userId = ''] = userIds;

		const updatedGroupMembers = group_members_ids?.filter((eachId) => eachId !== userId);
		const updatedGroupMembersData = group_members_data?.filter((item) => item?.id !== userId);

		return {
			group_members_ids  : updatedGroupMembers,
			updated_at         : Date.now(),
			group_members_data : updatedGroupMembersData,
		};
	},

	UPDATE_GROUP_NAME: ({ groupName = '' }) => ({
		search_name: groupName,
	}),
};

function useUpdateDraftLocalCogooneGroup({
	activeTab = {}, setAddMembers = () => {},
	firestore = {}, cleanUpFunc = () => {},
}) {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const [loading, setLoading] = useState(false);

	const { data = {} } = activeTab || {};
	const { id = '' } = data || {};

	const updateDraftLocalCogooneGroup = async ({
		actionName = '',
		userIds = [],
		userIdsData = [],
		groupName = '',
	}) => {
		try {
			setLoading(true);
			const payloadFunc = PAYLOAD_MAPPING[actionName];

			if (!payloadFunc) {
				return;
			}

			const roomDoc = doc(firestore, `users/${loggedInAgentId}/groups/${id}`);

			const payload = payloadFunc?.(
				{ data, userIds, userIdsData, groupName },
			);

			await updateDoc(roomDoc, payload);

			cleanUpFunc();
			setAddMembers(false);
		} catch (error) {
			Toast.error('Something Went Wrong');
		} finally {
			setLoading(false);
		}
	};

	return {
		updateDraftLocalCogooneGroup,
		draftUpdateLoading: loading,
		loggedInAgentId,
	};
}

export default useUpdateDraftLocalCogooneGroup;
