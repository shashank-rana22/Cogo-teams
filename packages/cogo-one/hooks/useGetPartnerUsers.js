import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPartnerUsers = ({ activeMessageCard = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			const group_members = activeMessageCard.group_members || [];
			const requested_group_members = activeMessageCard.requested_group_members || [];

			await trigger({
				params: {
					filters: {
						user_id: [...group_members, ...requested_group_members, ''],
					},
					rm_mappings_data_required : false,
					partner_data_required     : false,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [activeMessageCard, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch, activeMessageCard]);

	return {
		fetch,
		partner_users: data?.list || [],
		loading,
	};
};

export default useGetPartnerUsers;
