import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetPartnerUser = ({ user_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_partner_users',
	}, { manual: false });

	const fetch = async () => {
		try {
			await trigger({
				params: {
					filters: {
						user_id,
					},
					rm_mappings_data_required : false,
					partner_data_required     : false,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	const partner_user = data?.list?.[0] || {};

	useEffect(() => {
		if (user_id) {
			fetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user_id]);

	return {
		fetch,
		partner_user,
		loading,
	};
};

export default useGetPartnerUser;
