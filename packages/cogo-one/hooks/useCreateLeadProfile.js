import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useCreateLeadProfile({ updateLeaduser = () => {}, setShowError = () => {}, sender = null }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_platform_chat_user_onboarding',
		method : 'post',
	}, { manual: true });

	const leadUserProfile = async ({ profileValue }) => {
		const { country_code = '', number = '', name = '' } = profileValue || {};
		try {
			const res = await trigger({
				data: {
					token               : sender,
					mobile_number       : number,
					mobile_country_code : country_code,
					name,
				},
			});
			if (res?.data?.lead_user_id) {
				const data = {
					lead_user_id : res?.data?.lead_user_id,
					mobile_no    : `${country_code?.slice(1)}${number}`,
					user_name    : name,
				};
				updateLeaduser(data);
			}
			Toast.success('Successfully Created');
			setShowError(false);
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
