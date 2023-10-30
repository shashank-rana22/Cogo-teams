import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUsers = ({ stakeholderIds }) => {
	const [{ data = {}, loading }, trigger] = useRequest('/list_partner_users', { manual: true });

	const listUsers = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						user_id                                : stakeholderIds,
						only_user_service_object_data_required : true,
					},
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [stakeholderIds, trigger]);

	return { data, listUsers, loading };
};

export default useGetUsers;
