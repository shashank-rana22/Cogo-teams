import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useCreateLeadProfile({ setShowError }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_user_profile',
		method : 'post',
	}, { manual: true });

	const [leadId, setLeadId] = useState('');

	const leadUserProfile = async ({ profileValue }) => {
		const { country_code = '', number = '', name = '' } = profileValue || {};
		try {
			const res = await trigger({
				data: {
					name,
					mobile_country_code : country_code,
					mobile_number       : number,
					profile_data        : [{
						channel_type         : 'platform_channel',
						channel_account_type : name,
						channel_accountid    : number,
					}],
				},
			});
			setLeadId(res?.data?.lead_user_id);
			Toast.success('Successfully Created');
			setShowError(false);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		leadUserProfile,
		loading,
		leadId,
	};
}
export default useCreateLeadProfile;
