import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const getPayload = ({ groupId = '' }) => ({
	filters: {
		cogoone_group_id : groupId,
		status           : 'active',
	},
	partner_data_required : true,
	page_limit            : 100,
});

const listFormatter = ({ res = {} }) => res?.data?.list || [];

const useListCogooneGroupMembers = ({ globalGroupId = '' }) => {
	const [membersList, setMembersList] = useState([]);

	const [, trigger] = useRequest({
		url    : '/list_cogoone_group_members',
		method : 'get',
	}, { manual: true });

	const listCogooneGroupMembers = useCallback(async ({ groupId = '' }) => {
		try {
			const res = await trigger({
				params: getPayload({ groupId }),
			});
			const list = listFormatter({ res });
			setMembersList(list);
		} catch (e) {
			setMembersList([]);
		}
	}, [trigger]);

	useEffect(() => {
		if (!globalGroupId) {
			setMembersList([]);
			return;
		}

		listCogooneGroupMembers({ groupId: globalGroupId });
	}, [globalGroupId, listCogooneGroupMembers]);

	return {
		listCogooneGroupMembers,
		membersList,
	};
};
export default useListCogooneGroupMembers;
