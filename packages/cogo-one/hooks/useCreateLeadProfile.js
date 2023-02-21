import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useCreateLeadProfile() {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_user_profile',
		method : 'post',
	}, { manual: true });

	const leadUserProfile = async ({ profileValue }) => {
		const { name = '', number } = profileValue || {};
		try {
			await trigger({
				data: {
					name,
					mobile_country_code : '+91',
					mobile_number       : number,
					profile_data        : [{
						channel_type         : 'platform_channel',
						channel_account_type : name,
						channel_accountid    : number,
					}],
				},
			});
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		leadUserProfile,
		loading,
	};
}
export default useCreateLeadProfile;
