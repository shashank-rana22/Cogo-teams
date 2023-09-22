import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getFormatterValues from '../helpers/getFormattedValue';

const useGetAirData = ({ reset, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_air_milestones',
	});
	const apiTrigger = async ({ values = {}, showUpdate, setShowUpdate }) => {
		const payload = getFormatterValues(values);

		try {
			await trigger({
				data: {
					...payload,
					airway_bill_no           : showUpdate?.data?.airway_bill_no,
					saas_air_subscription_id : showUpdate?.data?.saas_air_subscription_id,
				},
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
		apiTrigger,
		loading,
	};
};

export default useGetAirData;
