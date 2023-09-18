import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetAirData = ({ reset, refetch }) => {
	const submitAPI = useRequest('post', false)('/update_air_milestones');
	const onSubmit = async (values = {}, showUpdate, setShowUpdate) => {
		const payload = {
			...values,
			airway_bill_no           : showUpdate?.data?.airway_bill_no,
			saas_air_subscription_id : showUpdate?.data?.saas_air_subscription_id,
		};
		try {
			await submitAPI.trigger({
				data: payload,
			});
			setShowUpdate({ show: false });
			reset();
			refetch();
			Toast.success('Tracking Data Added Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};
	return {
		submitAPI,
		onSubmit,
	};
};

export default useGetAirData;
