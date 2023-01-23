import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useFetchPinnedNavs = ({ user_id, partner_id }) => {
	const [pinnedNavKeys, setPinnedNavKeys] = useState([]);

	const [{ loading: pinListLoading = false }, trigger] = useRequest({
		url    : 'list_partner_user_settings',
		method : 'GET',
	}, { manual: true });

	const fetchPinnedNavs = async () => {
		const response = await trigger({ params: { filters: { user_id, partner_id } } });

		setPinnedNavKeys(
			(response.data?.list || [])
				.map((setting) => setting.setting_config.navigation_preferences)
				.flat(),
		);
	};

	useEffect(() => { fetchPinnedNavs(); }, []);

	return { pinnedNavKeys, setPinnedNavKeys, pinListLoading };
};

export default useFetchPinnedNavs;
