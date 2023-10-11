import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getFormatterValues from '../helpers/getFormattedValue';
import toastApiError from '../utlis/toastApiError';

const useUpdateAirMileStones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_air_milestones',
	}, { manual: true });
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
			refetch();
			Toast.success('Tracking Data Added Successfully');
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		apiTrigger,
		createLoading: loading,
	};
};

export default useUpdateAirMileStones;
