import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListPartnerUsers = ({ activeMessageCard = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
	}, { manual: true });

	const fetchPartnerUsers = useCallback(async () => {
		try {
			const { group_members, requested_group_members } = activeMessageCard || {};

			await trigger({
				params: {
					filters: {
						user_id: [...(group_members || []), ...(requested_group_members || [])],
					},
					rm_mappings_data_required : false,
					partner_data_required     : false,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [activeMessageCard, trigger]);

	useEffect(() => {
		fetchPartnerUsers();
	}, [fetchPartnerUsers, activeMessageCard]);

	return {
		partnerUsers: data?.list || [],
		loading,
	};
};

export default useListPartnerUsers;
