import { useRequest } from '@cogoport/request';

const useAddRemovePin = ({ partner_user_id, setPinnedNavKeys = () => {} }) => {
	const [{ loading: newPinUnpinLoading = false }, trigger] = useRequest({
		url    : 'create_partner_user_setting',
		method : 'POST',
	}, { manual: true });

	const pinUnpinNavs = async (action, navItem) => {
		const payload = {
			partner_user_id,
			setting_config : { navigation_preferences: [navItem.key] },
			setting_type   : 'navigation_preference',
			action_name    : action ? 'add' : 'remove',
		};

		await trigger({ data: payload });

		if (action) {
			setPinnedNavKeys((prevNavKeys) => [...prevNavKeys, navItem.key]);
		} else {
			setPinnedNavKeys((prevNavKeys) => prevNavKeys.filter((navKey) => navKey !== navItem.key));
		}
	};

	return { newPinUnpinLoading, pinUnpinNavs };
};

export default useAddRemovePin;
