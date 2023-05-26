import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import toastApiError from '../utils/toastApiError';

const useGetTrackingConsent = ({ mobileNumber }) => {

    const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));


	const [{ loading },data, trigger] = useRequest({
		url    : 'get_saas_ftl_tracking_consent',
		method : 'GET',
	}, { manual: true });

	const getTrackingConsent = async () => {
		try {
			await trigger({
				params: { mobile_number: mobileNumber },
			});
		} catch (error) {
			toastApiError((error) || 'Something Went Wrong');
		}
	};

	return {
		getTrackingConsent,
		consentData: data,
		consentLoading: loading,
	};
};

export default useGetTrackingConsent;
