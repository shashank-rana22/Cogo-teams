import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListPartnerUsers = ({ nextViewType = '' }) => {
	const [{ loading: partnerUsersLoading, data }, trigger] = useRequest({
		url    : '/list_partner_users',
		method : 'get',
	}, { manual: true });

	const getPartnerUsers = useCallback(
		async () => {
			try {
				if (nextViewType !== 'partners') {
					return;
				}

				await trigger({
					params: {
						filters: {
							entity_types : ['cogoport'],
							status       : 'active',
						},
						page_limit          : 1000,
						roles_data_required : false,
						page                : 1,
					},

				});
			} catch (error) {
				console.error(error);
			}
		},
		[nextViewType, trigger],
	);

	useEffect(() => {
		getPartnerUsers();
	}, [getPartnerUsers]);

	const { list: partnerUsersList = [] } = partnerUsersLoading ? {} : (data || {});

	return {
		partnerUsersLoading,
		getPartnerUsers,
		partnerUsersList,
	};
};

export default useListPartnerUsers;
