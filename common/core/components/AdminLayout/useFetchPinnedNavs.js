import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useFetchPinnedNavs = ({ user_id, partner_id, setPinnedNavKeys = () => {} }) => {
	const [{ loading: pinListLoading = false }, trigger] = useRequest({
		url    : 'list_partner_user_settings',
		method : 'GET',
	}, { manual: true });

	const fetchPinnedNavs = async () => {
		try {
			const response = await trigger({ params: { filters: { user_id, partner_id } } });

			setPinnedNavKeys(
				(response.data?.list || [])
					.map((setting) => setting.setting_config.navigation_preferences)
					.flat(),
			);
		} catch (err) {
			console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchPinnedNavs(); }, []);

	return { pinListLoading };
};

export default useFetchPinnedNavs;
