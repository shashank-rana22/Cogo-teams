import { useRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setUserSettingsState } from '@cogoport/store/reducers/user-settings';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const useFetchPinnedNavs = ({ user_id, partner_id, setPinnedNavKeys = () => {}, setAnnouncements = () => {} }) => {
	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = {}, partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const dispatch = useDispatch();

	const [{ loading: pinListLoading = false }, trigger] = useRequest({
		url    : 'list_partner_user_settings',
		method : 'GET',
	}, { manual: true });

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const fetchPinnedNavs = async () => {
		try {
			const params = {
				filters              : { user_id, partner_id },
				announcement_filters : {
					status         : 'active',
					cogo_entity_id : id,
					country_id,
					...(scope === 'partner'
						? {
							auth_function     : roleFunction,
							auth_sub_function : roleSubFunction,
							persona           : 'admin_user',
						}
						: { persona: 'importer_exporter' }),
				},
			};

			const response = await trigger({ params });

			dispatch(setUserSettingsState(response.data?.list || []));

			setPinnedNavKeys(
				(response.data?.list || [])
					.map((setting) => setting.setting_config.navigation_preferences)
					.flat(),
			);
			setAnnouncements(response.data?.announcement);
		} catch (err) {
			console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchPinnedNavs(); }, []);

	return { pinListLoading };
};

export default useFetchPinnedNavs;
